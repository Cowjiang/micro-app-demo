import microApp from '@micro-zoe/micro-app'

microApp.start({
  plugins: {
    modules: {
      'sub-app-vite-vue3': [{
        loader(code) {
          if (process.env.NODE_ENV === 'development') {
            code = code.replace(/(from|import)(\s*['"])(\/subapp\/)/g, all => {
              return all.replace('/subapp/', 'http://localhost:4001/subapp/')
            })
          }
          return code
        }
      }]
    }
  }
})
