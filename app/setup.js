'use strict'
/**
 * Module denpendencies
 */
const fs = require('fs')
const path = require('path')

const logger = require('koa-logger')
const serve = require('koa-static')
const compress = require('koa-compress')
const Wechat = require('co-wechat')

const error = require('../middleware/error')
const config = require('../config')

const wechat = Wechat(config.wechat.token)

var wechatHandler = function * () {

}

/**
 * load 3rdparty and custom middleware to koa app.
 */
module.exports = function setupApp (app, config) {
  if (config.env === 'development') {
    app.use(logger())
  }

  app.use(compress())
  app.use(serve(path.join(__dirname, '../static'), {maxage: 1000 * 1800}))
  app.use(error())

  app.use(wechat.middleware(wechatHandler))

  // mount all routes defined in app folder
  fs.readdirSync(path.join(__dirname, '../route')).forEach((file) => {
    require('../route/' + file).init(app)
  })
}
