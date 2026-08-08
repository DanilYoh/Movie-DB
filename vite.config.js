import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'
import { defineConfig } from 'vitest/config'

const treatSourceJsAsJsx = () => ({
  name: 'treat-source-js-as-jsx',
  enforce: 'pre',
  async transform(code, id) {
    if (!/src\/.*\.js$/.test(id)) {
      return null
    }

    return transformWithEsbuild(code, id, {
      jsx: 'automatic',
      loader: 'jsx'
    })
  }
})

export default defineConfig({
  plugins: [treatSourceJsAsJsx(), react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  test: {
    environment: 'node'
  }
})
