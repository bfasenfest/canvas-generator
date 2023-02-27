import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue
import { createVuePlugin as vue } from 'vite-plugin-vue2'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

const path = require("path")
export default defineConfig({
  plugins: [
    vue({ jsx: true }),
    viteCommonjs()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildCommonjs(['vue-quill-editor'])
      ]
    }
  }
})