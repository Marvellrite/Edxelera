import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

interface ManifestEntry {
   localPath: string;
   cloudinaryUrl: string;
   publicId: string;
   bytes: number;
   uploadedAt: string;
}

interface Manifest {
   version: 1;
   generatedAt: string;
   cloudName: string;
   folder: string;
   entries: Record<string, ManifestEntry>;
}

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const MANIFEST_PATH = path.join(ROOT, 'scripts', 'cloudinary-image-manifest.json');
const SCAN_IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
const TEXT_FILE_EXTENSIONS = new Set([
   '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.mdx', '.css', '.scss', '.html',
]);
const EXCLUDED_DIRS = new Set(['.git', 'node_modules', '.next', 'dist', 'build', 'coverage', '.turbo']);

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');
const replaceOnly = args.has('--replace-only');

async function loadDotEnvFiles() {
   const envFiles = ['.env.local', '.env'];
   for (const file of envFiles) {
      const fullPath = path.join(ROOT, file);
      if (!(await exists(fullPath))) {
         continue;
      }
      const content = await fs.readFile(fullPath, 'utf8');
      for (const line of content.split(/\r?\n/)) {
         const trimmed = line.trim();
         if (!trimmed || trimmed.startsWith('#')) {
            continue;
         }
         const equalsIndex = trimmed.indexOf('=');
         if (equalsIndex <= 0) {
            continue;
         }
         const key = trimmed.slice(0, equalsIndex).trim();
         const value = trimmed.slice(equalsIndex + 1).trim().replace(/^['"]|['"]$/g, '');
         if (key && !(key in process.env)) {
            process.env[key] = value;
         }
      }
   }
}

const env = {
   cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
   apiKey: process.env.CLOUDINARY_API_KEY || '',
   apiSecret: process.env.CLOUDINARY_API_SECRET || '',
   folder: process.env.CLOUDINARY_MIGRATION_FOLDER || 'edxelera',
};

async function exists(filePath: string) {
   try {
      await fs.access(filePath);
      return true;
   } catch {
      return false;
   }
}

async function readManifest(): Promise<Manifest> {
   if (!(await exists(MANIFEST_PATH))) {
      return {
         version: 1,
         generatedAt: new Date().toISOString(),
         cloudName: env.cloudName,
         folder: env.folder,
         entries: {},
      };
   }

   const raw = await fs.readFile(MANIFEST_PATH, 'utf8');
   const parsed = JSON.parse(raw) as Manifest;
   return {
      ...parsed,
      cloudName: env.cloudName || parsed.cloudName,
      folder: env.folder || parsed.folder,
      entries: parsed.entries || {},
   };
}

async function writeManifest(manifest: Manifest) {
   manifest.generatedAt = new Date().toISOString();
   await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function walk(dir: string, onFile: (filePath: string) => Promise<void>) {
   const entries = await fs.readdir(dir, { withFileTypes: true });
   for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
         if (!EXCLUDED_DIRS.has(entry.name)) {
            await walk(full, onFile);
         }
         continue;
      }
      if (entry.isFile()) {
         await onFile(full);
      }
   }
}

async function collectImages() {
   const files: string[] = [];
   await walk(PUBLIC_DIR, async (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      if (SCAN_IMAGE_EXTENSIONS.has(ext)) {
         files.push(filePath);
      }
   });
   return files.sort();
}

function toLocalRef(filePath: string) {
   const relativeToPublic = path.relative(PUBLIC_DIR, filePath).split(path.sep).join('/');
   return `/${relativeToPublic}`;
}

function buildPublicId(localRef: string) {
   const noLeadingSlash = localRef.replace(/^\//, '');
   const noExt = noLeadingSlash.replace(/\.[^.]+$/, '');
   return `${env.folder}/${noExt}`.replace(/\/+/g, '/');
}

function signUpload(params: Record<string, string>) {
   const sorted = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('&');
   return crypto.createHash('sha1').update(`${sorted}${env.apiSecret}`).digest('hex');
}

async function uploadImage(filePath: string, localRef: string) {
   const imageBuffer = await fs.readFile(filePath);
   const publicId = buildPublicId(localRef);
   const timestamp = Math.floor(Date.now() / 1000).toString();
   const payload = {
      public_id: publicId,
      timestamp,
      overwrite: 'false',
   };
   const signature = signUpload(payload);

   const formData = new FormData();
   formData.append('file', new Blob([imageBuffer]), path.basename(filePath));
   formData.append('api_key', env.apiKey);
   formData.append('timestamp', timestamp);
   formData.append('public_id', publicId);
   formData.append('overwrite', 'false');
   formData.append('signature', signature);

   const response = await fetch(`https://api.cloudinary.com/v1_1/${env.cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
   });

   if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed for ${localRef}: ${response.status} ${errorText}`);
   }

   const json = (await response.json()) as { secure_url: string; public_id: string; bytes: number };
   return {
      secureUrl: json.secure_url,
      publicId: json.public_id,
      bytes: json.bytes,
   };
}

function replacementCandidates(localRef: string): string[] {
   const noLeadingSlash = localRef.replace(/^\//, '');
   return [
      `public/${noLeadingSlash}`,
      `/public/${noLeadingSlash}`,
      localRef,
   ].sort((a, b) => b.length - a.length);
}

async function collectTextFiles() {
   const textFiles: string[] = [];
   await walk(ROOT, async (filePath) => {
      const rel = path.relative(ROOT, filePath);
      const firstSegment = rel.split(path.sep)[0];
      if (EXCLUDED_DIRS.has(firstSegment) || firstSegment === 'public') {
         return;
      }
      const ext = path.extname(filePath).toLowerCase();
      if (TEXT_FILE_EXTENSIONS.has(ext) || path.basename(filePath) === 'next.config.ts') {
         textFiles.push(filePath);
      }
   });
   return textFiles;
}

function escapeRegExp(value: string) {
   return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceExactPathValues(content: string, candidate: string, cloudinaryUrl: string) {
   const escapedCandidate = escapeRegExp(candidate);
   const patterns = [
      new RegExp('(["\'`])' + escapedCandidate + '(["\'`])', 'g'),
      new RegExp('(url\\(\\s*["\'`]?)' + escapedCandidate + '(["\'`]?\\s*\\))', 'g'),
   ];

   let updated = content;
   let count = 0;

   for (const pattern of patterns) {
      updated = updated.replace(pattern, (_match, start, end) => {
         count += 1;
         return `${start}${cloudinaryUrl}${end}`;
      });
   }

   return { updated, count };
}


async function replaceReferences(urlMap: Record<string, string>) {
   const textFiles = await collectTextFiles();
   let modifiedFiles = 0;
   let totalReplacements = 0;
   const touchedFiles: string[] = [];

   for (const filePath of textFiles) {
      const original = await fs.readFile(filePath, 'utf8');
      let updated = original;
      let fileReplacements = 0;

      for (const [localRef, cloudinaryUrl] of Object.entries(urlMap)) {
         for (const candidate of replacementCandidates(localRef)) {
            if (!updated.includes(candidate)) {
               continue;
            }
            const result = replaceExactPathValues(updated, candidate, cloudinaryUrl);
            updated = result.updated;
            fileReplacements += result.count;
         }
      }

      if (updated !== original) {
         modifiedFiles += 1;
         totalReplacements += fileReplacements;
         touchedFiles.push(path.relative(ROOT, filePath));
         if (!isDryRun) {
            await fs.writeFile(filePath, updated, 'utf8');
         }
      }
   }

   return { modifiedFiles, totalReplacements, touchedFiles };
}

async function main() {
   await loadDotEnvFiles();
   env.cloudName = process.env.CLOUDINARY_CLOUD_NAME || env.cloudName;
   env.apiKey = process.env.CLOUDINARY_API_KEY || env.apiKey;
   env.apiSecret = process.env.CLOUDINARY_API_SECRET || env.apiSecret;
   env.folder = process.env.CLOUDINARY_MIGRATION_FOLDER || env.folder;

   if (!isDryRun && !replaceOnly && (!env.cloudName || !env.apiKey || !env.apiSecret)) {
      throw new Error('Missing Cloudinary env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
   }

   const images = await collectImages();
   const manifest = await readManifest();
   const urlMap: Record<string, string> = {};

   let uploadedCount = 0;
   let skippedAlreadyUploaded = 0;

   for (const imagePath of images) {
      const localRef = toLocalRef(imagePath);
      const cached = manifest.entries[localRef];

      if (cached) {
         urlMap[localRef] = cached.cloudinaryUrl;
         skippedAlreadyUploaded += 1;
         continue;
      }

      if (replaceOnly || isDryRun) {
         if (isDryRun) {
            urlMap[localRef] = `https://res.cloudinary.com/${env.cloudName}/image/upload/${buildPublicId(localRef)}`;
         }
         continue;
      }

      const uploaded = await uploadImage(imagePath, localRef);
      manifest.entries[localRef] = {
         localPath: localRef,
         cloudinaryUrl: uploaded.secureUrl,
         publicId: uploaded.publicId,
         bytes: uploaded.bytes,
         uploadedAt: new Date().toISOString(),
      };
      urlMap[localRef] = uploaded.secureUrl;
      uploadedCount += 1;
      console.log(`Uploaded ${localRef} -> ${uploaded.secureUrl}`);
   }

   if (!isDryRun && !replaceOnly) {
      await writeManifest(manifest);
   }

   if (replaceOnly) {
      for (const [localRef, entry] of Object.entries(manifest.entries)) {
         urlMap[localRef] = entry.cloudinaryUrl;
      }
   }

   const { modifiedFiles, totalReplacements, touchedFiles } = await replaceReferences(urlMap);

   console.log('\nMigration summary:');
   console.log(`- Mode: ${isDryRun ? 'dry-run' : replaceOnly ? 'replace-only' : 'full'}`);
   console.log(`- Images found: ${images.length}`);
   console.log(`- Uploaded: ${uploadedCount}`);
   console.log(`- Already in manifest: ${skippedAlreadyUploaded}`);
   console.log(`- Files modified${isDryRun ? ' (would modify)' : ''}: ${modifiedFiles}`);
   console.log(`- Replacements${isDryRun ? ' (would make)' : ''}: ${totalReplacements}`);
   console.log(`- Manifest path: ${path.relative(ROOT, MANIFEST_PATH)}`);
   if (touchedFiles.length > 0) {
      console.log('- Modified files:');
      for (const file of touchedFiles.slice(0, 50)) {
         console.log(`  - ${file}`);
      }
      if (touchedFiles.length > 50) {
         console.log(`  - ...and ${touchedFiles.length - 50} more`);
      }
   }
}

main().catch((error) => {
   console.error(error);
   process.exit(1);
});
