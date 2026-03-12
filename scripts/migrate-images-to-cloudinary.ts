import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

const REPO_ROOT = process.cwd();
const DEFAULT_MANIFEST_PATH = path.join(REPO_ROOT, 'image-migration-manifest.json');
const SCAN_DIRECTORIES = ['public', 'public/images', 'assets', 'src/assets'];
const CODE_FILE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.mdx', '.md']);
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
const SKIP_DIRECTORIES = new Set(['.git', '.next', 'node_modules', 'dist', 'build', 'coverage']);
const CLOUDINARY_BASE_FOLDER = 'repo-images';

type UploadStatus = 'uploaded' | 'skipped' | 'error' | 'pending';

interface ManifestEntry {
  repoRelativePath: string;
  absolutePath: string;
  publicReferencePath: string | null;
  cloudinarySecureUrl: string | null;
  cloudinaryPublicId: string | null;
  uploadStatus: UploadStatus;
  updatedAt: string;
  error?: string;
}

interface ManifestFile {
  generatedAt: string;
  cloudinaryCloudName?: string;
  entries: Record<string, ManifestEntry>;
}

interface CliOptions {
  dryRun: boolean;
  uploadOnly: boolean;
  replaceOnly: boolean;
  forceUpload: boolean;
  manifestPath: string;
}

interface ReplacementRecord {
  filePath: string;
  replacements: Array<{ from: string; to: string; count: number }>;
}

function parseArgs(args: string[]): CliOptions {
  const dryRun = args.includes('--dry-run');
  const uploadOnly = args.includes('--upload-only');
  const replaceOnly = args.includes('--replace-only');
  const forceUpload = args.includes('--force-upload');
  const manifestIndex = args.findIndex((arg) => arg === '--manifest');
  const manifestPath =
    manifestIndex >= 0 && args[manifestIndex + 1]
      ? path.resolve(REPO_ROOT, args[manifestIndex + 1])
      : DEFAULT_MANIFEST_PATH;

  if (uploadOnly && replaceOnly) {
    throw new Error('Choose either --upload-only or --replace-only, not both.');
  }

  return {
    dryRun,
    uploadOnly,
    replaceOnly,
    forceUpload,
    manifestPath,
  };
}

function toPosixPath(inputPath: string): string {
  return inputPath.split(path.sep).join('/');
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectImageFiles(rootDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string): Promise<void> {
    const dirEntries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const dirEntry of dirEntries) {
      if (dirEntry.name.startsWith('.')) {
        continue;
      }

      const fullPath = path.join(currentDir, dirEntry.name);

      if (dirEntry.isDirectory()) {
        if (SKIP_DIRECTORIES.has(dirEntry.name)) {
          continue;
        }
        await walk(fullPath);
        continue;
      }

      const extension = path.extname(dirEntry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(extension)) {
        results.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return results;
}

function toRepoRelativePath(absolutePath: string): string {
  return toPosixPath(path.relative(REPO_ROOT, absolutePath));
}

function getPublicReferencePath(repoRelativePath: string): string | null {
  if (!repoRelativePath.startsWith('public/')) {
    return null;
  }

  const rest = repoRelativePath.slice('public'.length);
  return rest.startsWith('/') ? rest : `/${rest}`;
}

function buildCloudinaryPublicId(repoRelativePath: string): string {
  const extension = path.posix.extname(repoRelativePath);
  const withoutExt = repoRelativePath.slice(0, -extension.length);
  return `${CLOUDINARY_BASE_FOLDER}/${withoutExt}`;
}

function buildProjectedCloudinaryUrl(repoRelativePath: string): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? '<cloud-name>';
  const publicId = buildCloudinaryPublicId(repoRelativePath);
  return `https://res.cloudinary.com/${cloudName}/image/upload/<version>/${publicId}.<ext>`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function loadManifest(manifestPath: string): Promise<ManifestFile> {
  if (!(await pathExists(manifestPath))) {
    return {
      generatedAt: new Date().toISOString(),
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      entries: {},
    };
  }

  const content = await fs.readFile(manifestPath, 'utf8');
  const parsed = JSON.parse(content) as ManifestFile;
  return {
    generatedAt: parsed.generatedAt ?? new Date().toISOString(),
    cloudinaryCloudName: parsed.cloudinaryCloudName,
    entries: parsed.entries ?? {},
  };
}

async function saveManifest(manifestPath: string, manifest: ManifestFile): Promise<void> {
  manifest.generatedAt = new Date().toISOString();
  manifest.cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const sortedEntries = Object.fromEntries(
    Object.entries(manifest.entries).sort(([a], [b]) => a.localeCompare(b)),
  );

  await fs.writeFile(
    manifestPath,
    `${JSON.stringify({ ...manifest, entries: sortedEntries }, null, 2)}\n`,
    'utf8',
  );
}

function ensureCloudinaryEnv(): void {
  const missing = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required Cloudinary environment variables: ${missing.join(', ')}`);
  }
}

function configureCloudinary(): void {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

function formatUploadError(error: unknown): string {
  const fromError = (value: Error & { code?: unknown }): string => {
    const message = value.message?.trim();
    const code = typeof value.code === 'string' ? value.code : null;

    if (message && code) {
      return `${code}: ${message}`;
    }
    if (message) {
      return message;
    }
    if (code) {
      return code;
    }
    return value.name;
  };

  if (error instanceof Error) {
    return fromError(error as Error & { code?: unknown });
  }

  if (typeof error === 'object' && error !== null && 'error' in error) {
    const nested = (error as { error?: unknown }).error;
    if (nested instanceof Error) {
      return fromError(nested as Error & { code?: unknown });
    }
    if (typeof nested === 'string') {
      return nested;
    }
    if (nested && typeof nested === 'object' && 'message' in nested) {
      const nestedMessage = (nested as { message?: unknown }).message;
      if (typeof nestedMessage === 'string') {
        return nestedMessage;
      }
    }
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

async function uploadImages(
  imagePaths: string[],
  manifest: ManifestFile,
  options: CliOptions,
): Promise<{ uploaded: number; skipped: number; failed: number; planned: number }> {
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  let planned = 0;

  for (const absolutePath of imagePaths) {
    const repoRelativePath = toRepoRelativePath(absolutePath);
    const publicReferencePath = getPublicReferencePath(repoRelativePath);

    const existing = manifest.entries[repoRelativePath];
    const alreadyUploaded =
      existing?.uploadStatus === 'uploaded' && Boolean(existing.cloudinarySecureUrl);

    if (alreadyUploaded && !options.forceUpload) {
      manifest.entries[repoRelativePath] = {
        ...existing,
        absolutePath,
        repoRelativePath,
        publicReferencePath,
        uploadStatus: 'skipped',
        updatedAt: new Date().toISOString(),
      } as ManifestEntry;
      skipped += 1;
      continue;
    }

    planned += 1;

    if (options.dryRun) {
      console.log(`Dry run: would upload ${repoRelativePath}`);
      manifest.entries[repoRelativePath] = {
        repoRelativePath,
        absolutePath,
        publicReferencePath,
        cloudinarySecureUrl: existing?.cloudinarySecureUrl ?? null,
        cloudinaryPublicId: existing?.cloudinaryPublicId ?? null,
        uploadStatus: 'pending',
        updatedAt: new Date().toISOString(),
      };
      continue;
    }

    try {
      const cloudinaryPublicId = buildCloudinaryPublicId(repoRelativePath);
      const result = await cloudinary.uploader.upload(absolutePath, {
        public_id: cloudinaryPublicId,
        overwrite: true,
        resource_type: 'image',
      });

      manifest.entries[repoRelativePath] = {
        repoRelativePath,
        absolutePath,
        publicReferencePath,
        cloudinarySecureUrl: result.secure_url,
        cloudinaryPublicId: result.public_id,
        uploadStatus: 'uploaded',
        updatedAt: new Date().toISOString(),
      };
      uploaded += 1;
      console.log(`Uploaded ${repoRelativePath} -> ${result.secure_url}`);
    } catch (error) {
      failed += 1;
      manifest.entries[repoRelativePath] = {
        repoRelativePath,
        absolutePath,
        publicReferencePath,
        cloudinarySecureUrl: existing?.cloudinarySecureUrl ?? null,
        cloudinaryPublicId: existing?.cloudinaryPublicId ?? null,
        uploadStatus: 'error',
        updatedAt: new Date().toISOString(),
        error: formatUploadError(error),
      };
      console.error(`Failed to upload ${repoRelativePath}:`, error);
    }
  }

  return { uploaded, skipped, failed, planned };
}

async function collectCodeFiles(rootDir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(currentDir: string): Promise<void> {
    const dirEntries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const dirEntry of dirEntries) {
      const fullPath = path.join(currentDir, dirEntry.name);

      if (dirEntry.isDirectory()) {
        if (SKIP_DIRECTORIES.has(dirEntry.name) || dirEntry.name.startsWith('.')) {
          continue;
        }
        await walk(fullPath);
        continue;
      }

      const extension = path.extname(dirEntry.name).toLowerCase();
      if (CODE_FILE_EXTENSIONS.has(extension)) {
        files.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return files;
}

function replaceKnownPaths(content: string, fromPath: string, toUrl: string): { content: string; count: number } {
  const patterns = [
    new RegExp('([\"\'`])' + escapeRegExp(fromPath) + '\\1', 'g'),
    new RegExp('url\\(([\'\"`])' + escapeRegExp(fromPath) + '\\1\\)', 'g'),
  ];

  let updated = content;
  let count = 0;

  updated = updated.replace(patterns[0], (match, quote: string) => {
    count += 1;
    return `${quote}${toUrl}${quote}`;
  });

  updated = updated.replace(patterns[1], (match, quote: string) => {
    count += 1;
    return `url(${quote}${toUrl}${quote})`;
  });

  return { content: updated, count };
}


async function replaceReferences(
  manifest: ManifestFile,
  options: CliOptions,
): Promise<{ filesUpdated: number; totalReplacements: number; details: ReplacementRecord[] }> {
  const replacements = Object.values(manifest.entries)
    .filter((entry) => entry.publicReferencePath)
    .map((entry) => {
      const resolvedUrl =
        entry.cloudinarySecureUrl ??
        (options.dryRun ? buildProjectedCloudinaryUrl(entry.repoRelativePath) : null);

      if (!resolvedUrl) {
        return null;
      }

      return { from: entry.publicReferencePath as string, to: resolvedUrl };
    })
    .filter((value): value is { from: string; to: string } => Boolean(value));

  if (replacements.length === 0) {
    return { filesUpdated: 0, totalReplacements: 0, details: [] };
  }

  const codeFiles = await collectCodeFiles(REPO_ROOT);
  const details: ReplacementRecord[] = [];
  let filesUpdated = 0;
  let totalReplacements = 0;

  for (const filePath of codeFiles) {
    const original = await fs.readFile(filePath, 'utf8');
    let updated = original;
    const replacementDetails: ReplacementRecord['replacements'] = [];

    for (const replacement of replacements) {
      const result = replaceKnownPaths(updated, replacement.from, replacement.to);
      if (result.count > 0) {
        updated = result.content;
        replacementDetails.push({ ...replacement, count: result.count });
        totalReplacements += result.count;
      }
    }

    if (replacementDetails.length > 0) {
      filesUpdated += 1;
      details.push({ filePath: toRepoRelativePath(filePath), replacements: replacementDetails });
      if (!options.dryRun) {
        await fs.writeFile(filePath, updated, 'utf8');
      } else {
        console.log(`Dry run: would update ${toRepoRelativePath(filePath)}`);
      }
    }
  }

  return { filesUpdated, totalReplacements, details };
}

function printReplacementSummary(details: ReplacementRecord[]): void {
  if (details.length === 0) {
    console.log('No code references matched known manifest entries.');
    return;
  }

  console.log('Replacement summary:');
  for (const detail of details) {
    const summary = detail.replacements
      .map((item) => `${item.from} -> ${item.to} (${item.count})`)
      .join('; ');
    console.log(`- ${detail.filePath}: ${summary}`);
  }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const manifest = await loadManifest(options.manifestPath);

  const scanRoots = (
    await Promise.all(
      SCAN_DIRECTORIES.map(async (directory) => {
        const absolutePath = path.join(REPO_ROOT, directory);
        return (await pathExists(absolutePath)) ? absolutePath : null;
      }),
    )
  ).filter((value): value is string => Boolean(value));

  if (scanRoots.length === 0) {
    console.log('No configured image directories were found.');
  }

  const imageFileSet = new Set<string>();
  for (const scanRoot of scanRoots) {
    const images = await collectImageFiles(scanRoot);
    for (const imagePath of images) {
      imageFileSet.add(path.resolve(imagePath));
    }
  }

  const imagePaths = Array.from(imageFileSet).sort((a, b) => a.localeCompare(b));

  console.log(`Found ${imagePaths.length} images across ${scanRoots.length} scan roots.`);

  let uploadStats = { uploaded: 0, skipped: 0, failed: 0, planned: 0 };

  if (!options.replaceOnly) {
    if (!options.dryRun) {
      ensureCloudinaryEnv();
      configureCloudinary();
    }
    uploadStats = await uploadImages(imagePaths, manifest, options);
  }

  let replacementStats = { filesUpdated: 0, totalReplacements: 0, details: [] as ReplacementRecord[] };
  if (!options.uploadOnly) {
    replacementStats = await replaceReferences(manifest, options);
    printReplacementSummary(replacementStats.details);
  }

  if (!options.dryRun) {
    await saveManifest(options.manifestPath, manifest);
  }

  console.log('--- Migration summary ---');
  console.log(
    `Upload: planned=${uploadStats.planned}, uploaded=${uploadStats.uploaded}, skipped=${uploadStats.skipped}, failed=${uploadStats.failed}`,
  );
  console.log(
    `Replacement: filesUpdated=${replacementStats.filesUpdated}, replacements=${replacementStats.totalReplacements}`,
  );
  console.log(`Manifest: ${toRepoRelativePath(options.manifestPath)}`);
  if (options.dryRun) {
    console.log('Dry run enabled: no uploads and no file writes were performed.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
