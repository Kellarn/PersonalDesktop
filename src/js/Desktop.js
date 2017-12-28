'use strict'
const Dock = require('./Dock')

class Desktop {
  constructor () {
    this.windowArray = []
    this.zIndex = 0
    this.offsetX = 1
    this.offsetY = 1
    this.activeWindow = false
    this.appNumber = 0
    this.dock = new Dock(this)
  }

  init () {
    this.dock.init()
  }

  mouseDown (event) {
    let element = event.target

    if (element.parentNode.classList) {
      while (!element.parentNode.classList.contains('pwd')) {
        element = element.parentNode
      }
    }
  }
}

module.exports = Desktop
