'use strict'
const AppWindow = require('../AppWindow')
const Game = require('./game')

class TheMemoryApp extends AppWindow {
  constructor (options) {
    super(options)

    this.game = undefined
    this.boardSize = [4, 3]
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

  keyInput () {

  }
}

module.exports = TheMemoryApp
