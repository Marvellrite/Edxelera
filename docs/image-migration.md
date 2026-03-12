# Image migration to Cloudinary

This project includes a TypeScript migration script that uploads local static images to Cloudinary and safely rewrites known public image references in code.

## Required environment variables

Set the following before running non-dry migration commands:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## What the script scans

The migration script scans these folders (if they exist):

- `public/`
- `public/images/`
- `assets/`
- `src/assets/`

Supported image extensions:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.gif`
- `.svg`

## Manifest behavior

Manifest file: `image-migration-manifest.json`

Per image, it stores:

- repo-relative path
- absolute path
- public reference path (`/path/from/public`) when applicable
- Cloudinary secure URL
- Cloudinary public ID
- upload status (`uploaded`, `skipped`, `pending`, `error`)
- timestamp and optional error details

The script is idempotent by default:

- If an image is already marked uploaded and has a `cloudinarySecureUrl`, upload is skipped.
- Use `--force-upload` to re-upload and refresh URL metadata.

## Safe replacement strategy

The script only auto-rewrites references for files that originated in `public/`, because those map directly to runtime URL paths in Next.js.

It scans these file types for replacement:

- `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.mdx`, `.md`

It only replaces known manifest paths with known Cloudinary URLs in conservative patterns:

- quoted string paths, e.g. `"/images/example.jpg"` or `'/hero/banner.png'`
- CSS URL wrappers, e.g. `url('/images/example.jpg')`

Dynamic string construction is **not** force-rewritten.

## Commands

Dry run (no uploads, no file writes):

```bash
pnpm migrate:images:dry
```

Real migration (upload + replacement + manifest write):

```bash
pnpm migrate:images
```

Only run replacement based on current manifest:

```bash
pnpm migrate:images:replace
```

Optional cleanup reminder:

```bash
pnpm migrate:images:cleanup
```

## Verification checklist

1. Run dry mode and review planned uploads/replacements.
2. Run real migration.
3. Inspect `image-migration-manifest.json` for successful uploads.
4. Review git diff for replacement correctness.
5. Run lint/type checks.
6. Validate key pages in the app.

## Optional cleanup (manual)

Local image files are **not** deleted automatically. After validating production behavior, perform cleanup in a separate manual PR to reduce risk.
