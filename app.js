const express = require('express')
const cluster = require('cluster')
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routers = require('./routers')

// TODO read env
global.CONFIG = require('./config/default')['development']
global.DB = {}
global.DB.mysql = require('./models/mysql')
global.DB.mongo = require('./models/mongo')

/**
 *
 */
async function run () {
  if (cluster.isMaster)
    await runMaster()
  else if (cluster.isWorker)
    await runWorker()
}

/**
 *
 */
async function runMaster () {
  let app = express()
  app.use(express.json())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  if (CONFIG.workers.active && CONFIG.workers.workerNum > 0) {
    for (let i = 0; i < CONFIG.workers.workerNum; i++)
      cluster.fork()
  }
  app.on('error', onError)
  if (CONFIG.ssl) {
    const key = path.join(__dirname, 'config', 'ssl', CONFIG.ssl.key)
    const cert = path.join(__dirname, 'config', 'ssl', CONFIG.ssl.crt)
    const sslOptions = {
      key: fs.readFileSync(key, 'utf8'),
      cert: fs.readFileSync(cert, 'utf8'),
      requestCert: false,
      rejectUnauthorized: false,
      ciphers: [
        'ECDHE-RSA-AES256-SHA384',
        'DHE-RSA-AES256-SHA384',
        'ECDHE-RSA-AES256-SHA256',
        'DHE-RSA-AES256-SHA256',
        'ECDHE-RSA-AES128-SHA256',
        'DHE-RSA-AES128-SHA256',
        'HIGH',
        '!aNULL',
        '!eNULL',
        '!EXPORT',
        '!DES',
        '!RC4',
        '!MD5',
        '!PSK',
        '!SRP',
        '!CAMELLIA',
      ].join(':'),
      honorCipherOrder: true,
    }
    const server = https.createServer(sslOptions, app).listen(process.env.PORT || CONFIG.port)
  } else {
    const server = http.createServer(app).listen(process.env.PORT || CONFIG.port)
  }
  routers(app)
  console.log('Listening on ' + (process.env.PORT || CONFIG.port))
}

/**
 *
 */
async function runWorker () {
  require('./job/job_' + cluster.worker.id).JobRunning()
  console.log(`Worker ${process.pid} for schedule system `)
}

async function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof CONFIG.port === 'string'
    ? 'Pipe ' + CONFIG.port
    : 'Port ' + CONFIG.port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

run()
