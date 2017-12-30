'use strict'
const AppWindow = require('./AppWindow')
const Chat = require('./Chat')

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
    this.chat = new Chat(this.element, this.server, this.channel, this.username)
    this.chat.print()
  }
}

module.exports = TheChatApp
