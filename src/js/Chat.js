'use strict'

class Chat {
  constructor (element, server, channel, username) {
    this.element = element
    this.server = server
    this.channel = channel
    this.username = username
    this.key = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this.socket = undefined
    this.messageArray = []
  }

  print () {
    let template = document.querySelector('#chat-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)
  }
}

module.exports = Chat
