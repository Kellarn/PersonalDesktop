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
  }

  print () {
    super.print(this)
    this.element.classList.add('chat')
  }

  addChatMenu (element) {
    let template = document.querySelector('.chat-menu-template').content.cloneNode(true)
    template.querySelector('input[name="username"]').setAttribute('value', this.username)
    template.querySelector('input[name="channel"]').setAttribute('value', this.channel)

    template.querySelector('button').addEventListener('click', this.saveMenuSettings.bind(this))

    element.querySelector('.settings').appendChild(template)

    return element
  }

  saveMenuSettings () {
    if (this.chat) {
      this.chat.socket.close()
      this.chat.online = false
    }

    let form = this.element.querySelector('form')

    this.username = form.querySelector('input[name="username"]').value
    this.channel = form.querySelector('input[name="channel"]').value

    if (this.username === '') {
      this.username = 'User@SeabossOS'
    }

    this.chat = new Chat(this.element, this.server, this.channel, this.username)
    this.chat.initialization()
    this.setFocus()
  }
  setFocus () {
    this.element.classList.remove('window-focus')
    this.element.focus()
  }
}

module.exports = TheChatApp
