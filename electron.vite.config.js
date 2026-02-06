import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url';

// export default defineConfig({
//   main: {
//     entry: path.join(__dirname, 'src/main/index.js'),
//   },
//   preload: {
//     input: {
//       preload: path.join(__dirname, 'src/preload/index.js'),
//     },
//   },
//   renderer: {
//     root: path.join(__dirname, 'src/renderer'),
//     plugins: [react()],
//   },
// })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rendererRoot = path.join(__dirname, 'src', 'renderer');

export default defineConfig({
  main: {
    entry: path.join(__dirname, 'src/main/index.js'),
  },
  preload: {
    input: {
      preload: path.join(__dirname, 'src/preload/index.js'),
    },
  },
  renderer: {
    root: path.join(__dirname, 'src/renderer'),
    plugins: [react()],
  },
  build: {
    outDir: 'out',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      // asegúrate de que Rollup use el index.html correcto
      input: path.join(rendererRoot, 'index.html'),
    },
  },
})
