// vite.config.js
const path = require('path')

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NanoDebug'
    },
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
    //   // into your library
    //   external: ['vue'],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }
  }
}