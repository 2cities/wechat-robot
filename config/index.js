

module.exports = {
  wechat: {
    token: process.env.WX_TOKEN || '',
    appid: process.env.WX_APPID || '',
    encodingAESKey: process.env.WX_AESKEY || ''
  }
}
