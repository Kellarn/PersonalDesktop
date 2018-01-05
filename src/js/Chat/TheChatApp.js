'use strict'
const AppWindow = require('../AppWindow')
const Chat = require('./Chat')

class TheChatApp extends AppWindow {
  constructor (options) {
    super(options)

    this.chat = undefined
    this.username = 'Seabass'
    this.server = 'ws://vhost3.lnu.se:20080/socket/'
    this.channel = ''
  }

  initialization () {
    this.print()
    this.chat = new Chat(this.element, this.server, this.channel, this.username)
    this.chat.initialization()
    this.setFocus()
  }

  print () {
    super.print(this)
  }

  setFocus () {
    this.element.classList.remove('window-focus')
    this.element.focus()
  }
}

module.exports = TheChatApp
