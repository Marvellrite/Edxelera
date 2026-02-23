#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function printUsage() {
  console.log(
    [
      "Usage:",
      "  node scripts/svg-viewbox-from-path.mjs --d \"M...\" [--pad 0.5]",
      "  node scripts/svg-viewbox-from-path.mjs --file src/components/icons/modified/Star.tsx [--pad 0.5]",
      "",
      "Notes:",
      "  - Requires package: svg-path-bbox",
      "  - If missing: pnpm add -D svg-path-bbox",
    ].join("\n")
  );
}

function parseArgs(argv) {
  const args = { pad: 0, d: null, file: null };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--pad") {
      args.pad = Number(argv[++i]);
    } else if (token === "--d") {
      args.d = argv[++i];
    } else if (token === "--file") {
      args.file = argv[++i];
    } else if (token === "--help" || token === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }

  return args;
}

function extractPathData(filePath) {
  const source = fs.readFileSync(filePath, "utf8");

  const quoted = source.match(/\bd\s*=\s*["']([^"']+)["']/);
  if (quoted) return quoted[1];

  const braced = source.match(/\bd\s*=\s*\{\s*["']([^"']+)["']\s*\}/);
  if (braced) return braced[1];

  throw new Error(`Could not find a path d attribute in ${filePath}`);
}

function fmt(n) {
  const rounded = Math.round(n * 1000) / 1000;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || (!args.d && !args.file)) {
    printUsage();
    process.exit(args.help ? 0 : 1);
  }

  if (!Number.isFinite(args.pad) || args.pad < 0) {
    throw new Error("--pad must be a non-negative number");
  }

  let d = args.d;
  if (args.file) {
    const fullPath = path.resolve(process.cwd(), args.file);
    d = extractPathData(fullPath);
    console.log(`Path source: ${fullPath}`);
  }

  let svgPathBbox;
  try {
    ({ svgPathBbox } = await import("svg-path-bbox"));
  } catch {
    console.error("Missing dependency: svg-path-bbox");
    console.error("Install with: pnpm add -D svg-path-bbox");
    process.exit(1);
  }

  const [minX, minY, maxX, maxY] = svgPathBbox(d);
  const width = maxX - minX;
  const height = maxY - minY;

  const pad = args.pad;
  const paddedMinX = minX - pad;
  const paddedMinY = minY - pad;
  const paddedWidth = width + pad * 2;
  const paddedHeight = height + pad * 2;

  console.log("");
  console.log(`Exact bbox: [${fmt(minX)}, ${fmt(minY)}, ${fmt(maxX)}, ${fmt(maxY)}]`);
  console.log(`Exact viewBox: \"${fmt(minX)} ${fmt(minY)} ${fmt(width)} ${fmt(height)}\"`);
  console.log(`Padded viewBox (${fmt(pad)}): \"${fmt(paddedMinX)} ${fmt(paddedMinY)} ${fmt(paddedWidth)} ${fmt(paddedHeight)}\"`);
}

main().catch((error) => {
  console.error(error.message);
  printUsage();
  process.exit(1);
});
