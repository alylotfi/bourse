let fs = require('fs')
let path = require('path')

/**
 *
 * @param app
 * @returns void
 */
module.exports = (app) => {
  importRouters(app, path.join(__dirname))
  let moduleFolder = path.join(__dirname, '../modules')
  fs.readdirSync(moduleFolder).forEach((file) => {
    if (fs.statSync(path.join(moduleFolder, file)).isDirectory()) {
      if (fs.existsSync(path.join(moduleFolder, file, 'routers'))) {
        importRouters(app, path.join(moduleFolder, file, 'routers'))
      }
    }
  })
}

/**
 *
 * @param app
 * @param address
 * @returns void
 */
function importRouters (app, address) {
  fs.readdirSync(address).forEach(function (file) {
    if (file !== 'index.js') {
      require(path.join(address, file))(app)
    }
  })
}