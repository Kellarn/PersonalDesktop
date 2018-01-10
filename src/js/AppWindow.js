'use strict'

class AppWindow {
  constructor (appOptions) {
    this.id = appOptions.id
    this.element = undefined
    this.icon = appOptions.icon
    this.tabIndex = appOptions.tabIndex
    this.title = appOptions.title || this.id
    this.zIndex = appOptions.zIndex
    this.x = appOptions.x || 10
    this.y = appOptions.y || 10
    this.activateKeyInput = appOptions.activateKeyInput
  }

  print () {
    let template = document.querySelector('#window-template').content.cloneNode(true)
    let window = template.querySelector('.window-div')
    window.setAttribute('id', this.id)
    window.setAttribute('tabIndex', this.tabIndex)
    window.setAttribute('activateKeyInput', this.activateKeyInput)
    window.style.zIndex = this.zIndex
    window.style.left = this.x + 'px'
    window.style.top = this.y + 'px'

    let main = document.querySelector('#pwd')
    main.appendChild(window)

    this.element = document.querySelector('#' + this.id)
    this.element.querySelector('.title').textContent = this.title
    this.element.querySelector('.icon').textContent = this.icon
  }

  close () {
    document.querySelector('#pwd').removeChild(this.element)
  }
}

module.exports = AppWindow
