'use strict'
const AppWindow = require('./AppWindow')

class Dock {
  constructor (desktop) {
    this.desktop = desktop
  }

  createApp (type, options) {
    let thisApp

    switch (type) {
      case 'window':

        thisApp = new AppWindow(options)
        thisApp.print()

        break
    }

    return thisApp
  }

  startApp (type, title) {
    let marginX = 10 * (this.desktop.offsetX)
    let marginY = 10 * (this.desktop.offsetY)

    let options = {
      title: title,
      id: 'App-' + this.desktop.appNumber,
      zIndex: this.desktop.zIndex,
      tabIndex: this.desktop.appNumber,
      x: marginX,
      y: marginY
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
  init () {
    document.querySelector('.dock').addEventListener('click', this.clickOnDock.bind(this), true)
  }
  clickOnDock (event) {
    let value
    let title

    let element = this.getClickedElement(event.target)

    if (element) {
      value = element.getAttribute('value')
    }

    title = element.querySelector('.title').textContent
    this.startApp(value, title)
  }

  getClickedElement (target) {
    let element

    if (target.hasAttribute('value')) {
      element = target
    } else if (target.parentNode.hasAttribute('value')) {
      element = target.parentNode
    }
    return element
  }

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
