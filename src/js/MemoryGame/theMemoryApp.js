'use strict'
const AppWindow = require('../AppWindow')
const Game = require('./game')

class TheMemoryApp extends AppWindow {
  constructor (options) {
    super(options)

    this.game = undefined
    this.boardSize = [4, 3]
    this.markedCardForKey = undefined
  }

  initialization () {
    this.print()

    this.game = new Game(this.element.querySelector('.application-content'), 4, 3)
    this.game.initialization()
  }
  print () {
    super.print(this)
    this.element.classList.add('memory')
  }

  keyInput (key) {
    if (!this.markedCardForKey) {
      this.markedCardForKey = this.element.querySelector('.card')
      this.markedCardForKey.classList.add('marked')
    } else {
      this.markedCardForKey.classList.toggle('marked')

      switch (key) {
        case 39:
          this.keyRight()
          break

        case 37:
          this.keyLeft()
          break

        case 38:
          this.keyUp()
          break

        case 40:
          this.keyDown()
          break

        case 13:
          this.game.turnCard(this.markedCardForKey)
          break
      }
    }

    this.markedCardForKey.classList.toggle('marked')
  }

  keyRight () {
    if (this.markedCardForKey.nextElementSibling) {
      this.markedCardForKey = this.markedCardForKey.nextElementSibling
    } else if (this.markedCardForKey.parentNode.nextElementSibling) {
      this.markedCardForKey = this.markedCardForKey.parentNode.nextElementSibling.firstElementChild
    } else {
      this.markedCardForKey = this.element.querySelector('.card')
    }
  }
  keyLeft () {
    if (this.markedCardForKey.previousElementSibling) {
      this.markedCardForKey = this.markedCardForKey.previousElementSibling
    } else if (this.markedCardForKey.parentNode.previousElementSibling) {
      this.markedCardForKey = this.markedCardForKey.parentNode.previousElementSibling.lastElementChild
    } else {
      let allRows = this.element.querySelectorAll('.row')
      let lastRow = allRows[allRows.length - 1]
      this.markedCardForKey = lastRow.lastElementChild
    }
  }
  keyDown () {
    let nextRow

    if (this.markedCardForKey.parentNode.nextElementSibling) {
      let cardID = this.markedCardForKey.classList[0].slice(-2)
      nextRow = parseInt(cardID.charAt(0)) + 1
    } else {
      nextRow = 0
    }

    let correctCardAtNextRow = this.markedCardForKey.classList[0].slice(-1)
    this.markedCardForKey = this.element.querySelector('.card-' + nextRow + correctCardAtNextRow)
  }

  keyUp () {
    let currentRow
    let nextRow
    if (this.markedCardForKey.parentNode.nextElementSibling) {
      let cardID = this.markedCardForKey.classList[0].slice(-2)
      nextRow = parseInt(cardID.charAt(0)) - 1
    } else {
      let allRows = this.element.querySelectorAll('.row')
      currentRow = allRows[allRows.length - 1]
      nextRow = allRows - 1
    }

    let correctCardAtNextRow = this.markedCardForKey.classList[0].slice(-1)
    this.markedCardForKey = this.element.querySelector('.card-' + nextRow + correctCardAtNextRow)
  }
}

module.exports = TheMemoryApp
