const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // devServer: {
  //   port: 8071,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000/'

  //       // pathRewrite: {
  //       //   '^/api': ''
  //       // }
  //     }
  //   }
  // },
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
