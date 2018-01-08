'use strict'
const Dock = require('./Dock')

class Desktop {
  constructor () {
    this.windowArray = []
    this.zIndex = 0
    this.offsetX = 2
    this.offsetY = 7
    this.clickX = 0
    this.clickY = 0
    this.activeWindow = false
    this.appNumber = 0
    this.mouseMoveFunc = this.mouseMove.bind(this)
    this.mouseUpFunc = this.mouseUp.bind(this)
    this.dock = new Dock(this)
  }

  init () {
    this.dock.init()
    document.addEventListener('mousedown', this.mouseDown.bind(this))
    document.addEventListener('keydown', this.keyPressed.bind(this))
  }

  mouseDown (event) {
    let element = event.target

    if (element.parentNode.classList) {
      while (!element.parentNode.classList.contains('pwd')) {
        element = element.parentNode
      }
    }

    if (element.classList.contains('window-div')) {
      if (parseInt(element.style.zIndex) !== this.zIndex) {
        this.setFocus(element)
      }

      if (event.target.classList.contains('window-top')) {
        this.clickX = event.clientX - this.activeWindow.x
        this.clickY = event.clientY - this.activeWindow.y
        element.classList.add('moving')

        window.addEventListener('mousemove', this.mouseMoveFunc)
        window.addEventListener('mouseup', this.mouseUpFunc)
      }
    }
  }

  mouseMove (event) {
    let newX = event.clientX - this.clickX
    let newY = event.clientY - this.clickY

    let newMiddleX = newX + parseInt(this.activeWindow.element.offsetWidth) / 2
    let newMiddleY = newY + parseInt(this.activeWindow.element.offsetHeight) / 2

    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    if (newMiddleX < windowWidth && newMiddleX > 0 && newMiddleY < windowHeight && newY > 0) {
      console.log('Moving')
      this.activeWindow.x = event.clientX - this.clickX
      this.activeWindow.y = event.clientY - this.clickY

      this.activeWindow.element.style.left = this.activeWindow.x + 'px'
      this.activeWindow.element.style.top = this.activeWindow.y + 'px'
    }
  }

  mouseUp (event) {
    window.removeEventListener('mousemove', this.mouseMoveFunc)
    window.removeEventListener('mouseup', this.mouseUpFunc)

    this.activeWindow.element.classList.remove('moving')
  }

  setFocus (element) {
    element.focus()

    for (let i = 0; i < this.windowArray.length; i++) {
      if (this.windowArray[i].id === element.id) {
        this.activeWindow = this.windowArray[i]
        this.zIndex += 1
        element.style.zIndex = this.zIndex
      }
    }
  }

  clickOnWindowButton (event) {
    let action = event.target.classList
    let element = event.target

    if (element.parentNode) {
      while (!element.parentNode.id) {
        element = element.parentNode
      }

      element = element.parentNode
    }

    let i = -1
    for (let x = 0; x < this.windowArray.length; x++) {
      if (this.windowArray[x].id === element.id) {
        i = x
      }
    }
    if (i !== -1) {
      this.setFocus(this.windowArray[i].element)
      if (action.contains('material-icons')) {
        this.closeWindow(this.windowArray[i].id)
        element = event.target
      }
    }
  }

  closeWindow (id) {
    let removed = false

    for (let i = 0; i < this.windowArray.length && !removed; i++) {
      if (this.windowArray[i].id === id) {
        this.windowArray[i].close()
        this.windowArray.splice(i, 1)
        removed = true
      }
    }
  }

  keyPressed (event) {
    if (document.activeElement.id === this.activeWindow.id) {
      if (this.activeWindow.activateKeyInput) {
        this.activeWindow.keyInput(event.keyCode)
      }
    } else {

    }
  }

  clearDesktop () {
    for (let i = 0; i < this.windowArray.length; i++) {
      this.windowArray[i].close()
    }
    this.windowArray = []
    this.zIndex = 0
    this.clickX = 0
    this.clickY = 0
    this.appNumber = 0
  }
}

module.exports = Desktop
