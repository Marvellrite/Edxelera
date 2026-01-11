import fs from 'fs';
import path from 'path';
import { transformFileSync } from '@svgr/core';

const svgDir = '../public/icons';
const outDir = '../components/icons';

// ensure output folder exists
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

files.forEach(file => {
  const name = path.basename(file, '.svg');
  const outFile = path.join(outDir, name + '.tsx');

  if (!fs.existsSync(outFile)) { // skip if exists
    const svgPath = path.join(svgDir, file);
    const svgCode = fs.readFileSync(svgPath, 'utf-8');

    const tsxCode = transformFileSync(svgPath, { typescript: true });
    fs.writeFileSync(outFile, tsxCode);
    console.log('Created', outFile);
  } else {
    console.log('Skipped', outFile);
  }
});
