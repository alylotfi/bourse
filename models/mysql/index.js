'use strict'

const fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  basename = path.basename(__filename),
  env = process.env.NODE_ENV || 'development',
  config = require('./../../config/default')[env].sequelize
let db = {},
  relations = require('./relations'),
  sequelize

sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== 'relations.js') && (file !== basename) && (file.slice(-3) === '.js')
}).forEach(file => {
  const model = sequelize['import'](path.join(__dirname, file))
  db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
db = relations(db)
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db