import path, { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['lib'],
      insertTypesEntry: true,
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './lib')
    }
  }
})
