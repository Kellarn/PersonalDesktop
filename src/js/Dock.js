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
    console.log(thisApp)

    if (thisApp) {
      this.desktop.windowArray.push(thisApp)
      console.log(this.desktop.windowArray)

      this.desktop.appNumber += 1
      this.desktop.offsetX += 1
      this.desktop.offsetY += 1
      this.desktop.zIndex += 1
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
}

module.exports = Dock
