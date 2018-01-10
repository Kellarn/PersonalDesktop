'use strict'
const Chat = require('./Chat/TheChatApp')
const Memory = require('./MemoryGame/theMemoryApp')
const Filterify = require('./FilterifyApp')

/**
 * Constrcuctor for desktop dock where all the application icons are located.
 * Calls all the applications and starts them
 * @param desktop
 * @constructor
 */
class Dock {
  constructor (desktop) {
    this.desktop = desktop
  }

  /**
   * Function create and init a new application.
   * @param type
   * @param options
   */
  createApp (type, options) {
    let thisApp

    switch (type) {
      case 'chat':

        thisApp = new Chat(options)
        thisApp.initialization()

        break

      case 'memory':
        options.activateKeyInput = true
        thisApp = new Memory(options)
        thisApp.initialization()

        break

      case 'filterify':

        thisApp = new Filterify(options)
        thisApp.initialization()

        break

      case 'reset':
        this.desktop.clearDesktop()
    }

    return thisApp
  }

  /**
   * Function to start the new app and add information and settings to it.
   * @param type
   * @param title
   * @param icon
   */
  startApp (type, title, icon) {
    let marginX = 10 * (this.desktop.offsetX)
    let marginY = 10 * (this.desktop.offsetY)

    let options = {
      icon: icon,
      title: title,
      id: 'App-' + this.desktop.appNumber,
      zIndex: this.desktop.zIndex,
      tabIndex: this.desktop.appNumber,
      x: marginX,
      y: marginY,
      activateKeyInput: false
    }

    let thisApp = this.createApp(type, options)

    if (thisApp) {
      let app = document.querySelector('#' + thisApp.id)
      let buttons = app.querySelector('.window-buttons')
      buttons.addEventListener('click', this.desktop.clickOnWindowButton.bind(this.desktop))
      this.desktop.windowArray.push(thisApp)

      this.desktop.appNumber += 1
      this.desktop.offsetX += 1
      this.desktop.offsetY += 1
      this.desktop.zIndex += 1

      this.desktop.setFocus(thisApp.element)
      this.checkOutOfBounds(thisApp)
    }
  }

  /**
   * Function to initialize an event listener.
   */
  init () {
    document.querySelector('.dock').addEventListener('click', this.clickOnDock.bind(this), true)
  }

  /**
   * Function to to process what was clicked on the dock and start the corresponding app.
   * @param event
   */
  clickOnDock (event) {
    let value
    let title
    let icon

    let element = this.getClickedElement(event.target)

    if (element) {
      value = element.getAttribute('value')
    }

    title = element.querySelector('.title').textContent
    icon = element.querySelector('i').textContent
    this.startApp(value, title, icon)
  }

  /**
   * Function to find the value of the clicked item in the dock.
   * @param target
   * @returns Element
   */
  getClickedElement (target) {
    let element

    if (target.hasAttribute('value')) {
      element = target
    } else if (target.parentNode.hasAttribute('value')) {
      element = target.parentNode
    }
    return element
  }

  /**
   * Function that checks if the newly created window is out of bounds.
   * @param appWindow
   */
  checkOutOfBounds (appWindow) {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    let windowRight = appWindow.x + parseInt(appWindow.element.offsetWidth)
    let windowBottom = appWindow.y + parseInt(appWindow.element.offsetHeight)

    if (windowRight > windowWidth || appWindow.x < 0) {
      this.desktop.offsetX = 2

      appWindow.x = 10 * (this.desktop.offsetX)
      appWindow.element.style.left = appWindow.x + 'px'
    } else if (windowBottom > windowHeight || appWindow.y < 0) {
      this.desktop.offsetY = 7

      appWindow.y = 10 * (this.desktop.offsetY)
      appWindow.element.style.top = appWindow.y + 'px'
    }
  }
}

module.exports = Dock
