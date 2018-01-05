'use strict'

const Card = require('./card')
const Board = require('./board')

class MemoryGame {
  constructor (element, x, y) {
    this.element = element
    this.x = x
    this.y = y
    this.board = new Board(element, this.x, this.y)
    this.boardArray = []
    this.flippedCards = []
    this.turns = 0
  }

  initialization () {
    let i = 0

    this.boardArray = []
    for (i = 0; i < this.x; i++) {
      let array = []
      array.length = this.y
      this.board.push(array)
    }

    console.log(this.boardArray)
  }
}

module.exports = MemoryGame
