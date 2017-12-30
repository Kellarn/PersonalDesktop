'use strict'
const AppWindow = require('./AppWindow')

class TheChatApp extends AppWindow {
  constructor (options) {
    super(options)

    this.chat = undefined
    this.username = ''
    this.server = 'ws://vhost3.lnu.se:20080/socket/'
    this.channel = ''
  }

  print () {
    super.print(this)
  }
}

module.exports = TheChatApp
