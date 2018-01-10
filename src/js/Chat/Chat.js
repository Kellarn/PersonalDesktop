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
    this.online = false
  }

  async initialization () {
    this.messageArray = []
    this.print()
    this.printSavedMessages()
    await this.connectToServer()

    this.socket.addEventListener('message', this.newMessageFromServer.bind(this))
    this.element.querySelector('.send-button').addEventListener('click', this.submitMessage.bind(this))
    this.element.querySelector('form').addEventListener('submit', this.submitMessage.bind(this))
    this.element.querySelector('.message-text').addEventListener('input', this.controlInput.bind(this))
    this.element.querySelector('.message-text').focus()
  }
  print () {
    let template = document.querySelector('#chat-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)

    let connection = this.element.querySelector('.connection')
    connection.textContent = 'Not connected'
    this.element.querySelector('.application-meny .chat-wrapper').appendChild(connection)
  }

  async connectToServer () {
    this.socket = await new window.WebSocket(this.server)

    this.socket.addEventListener('open', this.connectionOnline.bind(this))
    this.socket.addEventListener('error', this.connectionOffline.bind(this))
  }
  async submitMessage (event) {
    if (event) {
      event.preventDefault()
    }

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
      this.element.querySelector('.send-button').setAttribute('disabled', 'disabled')
      this.element.querySelector('form').reset()
      this.element.querySelector('form .message-text').focus()
    }
  }

  connectionOnline () {
    this.element.querySelector('.connection').classList.add('chat-online')
    let connection = this.element.querySelector('.connection')
    connection.textContent = 'Connected'
  }

  connectionOffline () {
    this.element.querySelector('.connection').classList.add('chat-offline')
    let connection = this.element.querySelector('.connection')
    connection.textContent = 'Not connected'
  }

  newMessageFromServer (event) {
    let data = JSON.parse(event.data)

    if (data.type === 'message') {
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
    let oldMessageList = this.element.querySelector('.old-messages')
    let scrolled = false

    if (oldMessageList.scrollTop !== (oldMessageList.scrollHeight - oldMessageList.offsetHeight)) {
      scrolled = true
    }

    let newMessageTemplate = document.querySelector('#li-old-message-template').content.cloneNode(true)
    let username = document.createTextNode(data.username + ': ')
    let message = document.createTextNode(data.data)

    if (data.username === this.username) {
      newMessageTemplate.querySelector('li .old-message').classList.add('chat-me')
    } else {
      newMessageTemplate.querySelector('li .old-message').classList.add('chat-other')
      newMessageTemplate.querySelector('.message-username').appendChild(username)
    }
    newMessageTemplate.querySelector('.message-message').appendChild(message)

    this.element.querySelector('.old-messages ul').appendChild(newMessageTemplate)

    this.scrollToBottom(scrolled)
  }
  scrollToBottom (scrolled) {
    let oldMessageList = this.element.querySelector('.old-messages')

    if (!scrolled) {
      oldMessageList.scrollTop = oldMessageList.scrollHeight
    }
  }
  saveNewMessage (data) {
    let newMessage = {
      username: data.username,
      data: data.data
    }
    if (this.messageArray.length >= 20) {
      this.messageArray.splice(0, 1)
      this.messageArray.push(newMessage)
    } else {
      this.messageArray.push(newMessage)
    }
    window.sessionStorage.setItem('Chat-at-' + this.channel, JSON.stringify(this.messageArray))
  }

  printSavedMessages () {
    if (window.sessionStorage.getItem('Chat-at-' + this.channel)) {
      let messages = JSON.parse(window.sessionStorage.getItem('Chat-at-' + this.channel))
      this.messageArray = messages

      for (let i = 0; i < this.messageArray.length; i++) {
        this.printNewMessage(this.messageArray[i])
      }
    }
  }

  controlInput (event) {
    let input = event.target.value

    if (input.length > 1) {
      this.element.querySelector('.send-button').removeAttribute('disabled')
    }
  }
}

module.exports = Chat
