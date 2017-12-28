'use strict'
const Dock = require('./Dock')

class Desktop {
  constructor () {
    this.windowArray = []
    this.zIndex = 0
    this.offsetX = 1
    this.offsetY = 1
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
  }

  mouseDown (event) {
    event.preventDefault()
    let element = event.target

    if (element.parentNode.classList) {
      while (!element.parentNode.classList.contains('pwd')) {
        element = element.parentNode
      }
    }

    if (element.classList.contains('window-div')) {
        // will add some sort of focus method here.
      if (parseInt(element.style.zIndex) !== this.zIndex) {
        this.setFocus(element)
      }

      if (event.target.classList.contains('window-top')) {
        this.clickX = event.clientX - this.activeWindow.x
        console.log(event.clientX)
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

    console.log(newX)
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
}

module.exports = Desktop
