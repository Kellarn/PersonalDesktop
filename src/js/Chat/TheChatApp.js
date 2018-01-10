'use strict'
const AppWindow = require('../AppWindow')
const Chat = require('./Chat')

/**
 * Constrcuctor for the chat application
 * Extends the AppWindow class
 * @param options
 * @constructor
 */

class TheChatApp extends AppWindow {
  constructor (options) {
    super(options)

    this.chat = undefined
    this.username = ''
    this.server = 'ws://vhost3.lnu.se:20080/socket/'
    this.channel = ''
    this.isSettingsOpen = false
  }

  /**
 * Function to init the application
 */
  initialization () {
    this.print()
    if (window.localStorage.getItem('userAndChannel')) {
      this.clearContent()
      let object = JSON.parse(window.localStorage.getItem('userAndChannel'))
      this.username = object.username
      this.channel = object.channel
      this.connectToChat()
    }

    this.element.querySelector('.settings-text').addEventListener('click', this.clickOnMenu.bind(this))
  }
   /**
 * Function to close chat socket and remove the application
 */
  close () {
    if (this.chat) {
      this.chat.socket.close()
    }
    document.querySelector('#pwd').removeChild(this.element)
  }

   /**
 * Function to connect to the chat via the chat module
 */
  connectToChat () {
    this.chat = new Chat(this.element, this.server, this.channel, this.username)
    this.chat.initialization()
  }

   /**
 * Function print basic window and add specifics
 */
  print () {
    super.print(this)
    this.element.classList.add('chat')
    let template = document.querySelector('#general-settings-template').content.cloneNode(true)
    let template2 = document.querySelector('#chat-setting-template').content.cloneNode(true)
    template.querySelector('.settings-div').appendChild(template2)
    this.element.querySelector('.application-meny').appendChild(template)

    this.menuSettings()
  }

   /**
 * Function to handle clicks on the menu
 * @param event
 */
  clickOnMenu (event) {
    let target
    target = event.target.textContent

    if (target === 'Settings') {
      this.menuSettings()
    } else {

    }
  }

   /**
 * Function to add menu settings via templates
 */
  menuSettings () {
    if (!this.isSettingsOpen) {
      let template = document.querySelector('#general-settings-template').content.cloneNode(true)
      template = this.addChatMenu(template)

      this.element.querySelector('.application-content').appendChild(template)
      this.isSettingsOpen = true
    } else {
      let settings = document.querySelector('.application-content .setting-wrapper')
      this.element.querySelector('.application-content').removeChild(settings)
      this.isSettingsOpen = false
    }
  }

   /**
 * Function to add settings for username and channel that the user writes in.
 * @param element
 */
  addChatMenu (element) {
    let template = document.querySelector('#chat-menu-template').content.cloneNode(true)
    template.querySelector('input[name="username"]').setAttribute('value', this.username)
    template.querySelector('input[name="channel"]').setAttribute('value', this.channel)

    template.querySelector('button').addEventListener('click', this.saveMenuSettings.bind(this))

    element.querySelector('.settings-div').appendChild(template)

    return element
  }

   /**
 * Function to clear the content
 */
  clearContent () {
    let content = this.element.querySelector('.application-content')
    while (content.lastChild) {
      content.removeChild(content.lastChild)
    }
    this.isSettingsOpen = false
  }

   /**
 * Function to save menu settings and starting a new chat with these settings.
 */
  saveMenuSettings () {
    if (this.chat) {
      this.chat.socket.close()
      this.chat.online = false
    }

    let form = this.element.querySelector('#form1')

    this.username = form.querySelector('input[name="username"]').value
    this.channel = form.querySelector('input[name="channel"]').value

    this.clearContent()

    if (this.username === '') {
      this.username = 'User@SeabossOS'
    }
    this.connectToChat()

    let infoObject = {username: this.username, channel: this.channel}
    window.localStorage.setItem('userAndChannel', JSON.stringify(infoObject))
  }
}

module.exports = TheChatApp
