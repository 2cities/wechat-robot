'use strict'

/**
 * Module denpendencies
 */
const koa = require('koa')
const debug = require('debug')('2cities:server')
const setupApp = require('./app/setup')

const app = koa()
const serverConfig = {}
const port = process.env.PORT || serverConfig.port || 3000

serverConfig.env = process.env.NODE_ENV || 'development'

app.init = function () {
  setupApp(app, serverConfig)

  app.on('error', (err, ctx) => {
    debug('-----------------------')
    debug(err.stack)
  })

  app.server = app.listen(port)
  app.server.on('error', err => {
    if (err.syscall !== 'listen') { throw err }

    if (err.code === 'EADDRINUSE') {
      debug('Port ' + port + ' is already in using.')
      process.exit(1)
    }

    throw err
  })
  app.server.on('listening', () => {
    var addr = app.server.address()
    debug('Wechat-robot server is listening on ' + addr.port)
  })
}

app.init()

module.exports = app
