// const { build } = require('esbuild');
// const path = require('path');
import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bundle() {
  const outdir = path.resolve(__dirname, '..', 'dist-electron');

  // bundle main process
  await build({
    entryPoints: [path.resolve(__dirname, '..', 'src', 'main.js')],
    bundle: true,
    platform: 'node',
    external: ['electron'],
    outfile: path.join(outdir, 'main.js'),
    target: ['node16'],
  });

  // bundle preload
  await build({
    entryPoints: [path.resolve(__dirname, '..', 'src', 'preload.js')],
    bundle: true,
    platform: 'node',
    external: ['electron'],
    outfile: path.join(outdir, 'preload.js'),
    target: ['node16'],
  });

  console.log('Electron main + preload bundled to', outdir);
}

bundle().catch(err => { console.error(err); process.exit(1); });