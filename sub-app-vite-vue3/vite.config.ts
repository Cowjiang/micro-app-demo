import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve, join} from 'path'
import {writeFileSync} from 'fs'

export default defineConfig({
  base: `${process.env.NODE_ENV === 'production' ? 'http://127.0.0.1' : ''}/subapp/`,
  build: {
    minify: false,
  },
  server: {
    port: 4001
  },
  plugins: [
    vue(),
    (function () {
      let basePath = ''
      return {
        name: 'sub-app-vite-vue3',
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle(options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName] as any
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        }
      }
    })() as any
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
