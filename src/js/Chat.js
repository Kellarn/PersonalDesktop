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

    this.element.querySelector('form').addEventListener('submit', this.submitMessage.bind(this))
  }

  async connectToServer () {
    this.socket = await new window.WebSocket(this.server)
  }
  submitMessage (event) {
    event.preventDefault()

    let message = this.element.querySelector('.message-text').value

    if (message > 1) {
      let msg = {
        type: 'message',
        data: message,
        username: this.username,
        channel: this.channel,
        key: this.key
      }

      this.socket.send(JSON.stringify(msg))
    }
  }
}

module.exports = Chat
