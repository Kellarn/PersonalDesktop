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

  async initialization () {
    this.print()
    await this.connectToServer()

    this.socket.addEventListener('message', this.newMessageFromServer.bind(this))
    this.element.querySelector('.send-button').addEventListener('click', this.submitMessage.bind(this))
    this.element.querySelector('.message-text').addEventListener('click', this.toggleFocus.bind(this))
    this.element.querySelector('form').addEventListener('submit', this.submitMessage.bind(this))
  }
  print () {
    let template = document.querySelector('#chat-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)
  }

  async connectToServer () {
    this.socket = await new window.WebSocket(this.server)

    this.socket.addEventListener('open', this.connectionOnline.bind(this))
    this.socket.addEventListener('error', this.connectionOffline.bind(this))
  }
  async submitMessage (event) {
    event.preventDefault()

    let message = this.element.querySelector('.message-text').value

    if (message.length > 1) {
      let msg = {
        type: 'message',
        data: message,
        username: this.username,
        channel: this.channel,
        key: this.key
      }

      await this.socket.send(JSON.stringify(msg))
    }
  }

  connectionOnline () {
    this.element.querySelector('.window-top').classList.add('chat-online')
  }

  connectionOffline () {
    this.element.querySelector('.window-top').classList.add('chat-offline')
  }

  newMessageFromServer (event) {
    let data = JSON.parse(event.data)
    console.log(data)

    if (data.type === 'message' || data.type === 'heartbeat') {
      if (!data.channel) {
        data.channel = ''
      }

      if (data.channel === this.channel) {
        this.printNewMessage(data)
        this.saveNewMessage(data)
      }
    }
  }

  printNewMessage (data) {
    let newMessageTemplate = document.querySelector('#li-old-message-template').content.cloneNode(true)
    let username = document.createTextNode(data.username + ': ')
    let message = document.createTextNode(data.data)

    newMessageTemplate.querySelector('.message-message').appendChild(message)
    newMessageTemplate.querySelector('.message-username').appendChild(username)

    this.element.querySelector('.old-messages ul').appendChild(newMessageTemplate)
  }
  saveNewMessage (data) {

  }

  toggleFocus () {
    this.element.classList.toggle('window-focus')
  }
}

module.exports = Chat
