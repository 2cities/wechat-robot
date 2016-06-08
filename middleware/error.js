'use strict'

function getErrorMiddleware () {
  return function * (next) {

    try {
      yield * next
    } catch (err) {

      let status = err.status || 500

      if (status === 500) {
        // dispatch koa global errorHandler and print detail traceback
        this.app.emit('error', err, this)
      }

      if (err.json) {
        this.body = {
          'status': status,
          'message': err.message
        }

        return
      } else {
        this.body = yield this.render(status, {'err': err})
      }
    }
  }
}

module.exports = getErrorMiddleware
