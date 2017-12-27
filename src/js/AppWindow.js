'use strict'

class AppWindow {
  constructor (appOptions) {
    this.id = appOptions.id
    this.element = undefined
    this.tabIndex = appOptions.tabIndex
    this.title = appOptions.title
    this.zIndex = appOptions.zIndex
  }

  print () {
    let template = document.querySelector('#window-template').content.cloneNode(true)
    let window = template.querySelector('.window-div')
    window.setAttribute('id', this.id)
    window.setAttribute('tabIndex', this.tabIndex)
    window.style.zIndex = this.zIndex

    let main = document.querySelector('#pwd')
    main.appendChild(window)

    this.element = document.querySelector('#' + this.id)
    console.log(this.element)
  }
}

module.exports = AppWindow
