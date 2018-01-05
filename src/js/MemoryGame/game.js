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
    this.imageNumberArray = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]
    this.currentGameImgAmount = this.imageNumberArray.slice(0, (this.x * this.y))
    this.turns = 0

    this.shuffleCards()
  }

  initialization () {
    let i = 0

    this.boardArray = []
    for (i = 0; i < this.y; i++) {
      let array = []
      array.length = this.y
      this.boardArray.push(array)
    }

    for (i = 0; i < this.y; i++) {
      for (let x = 0; x < this.x - 1; x += 2) {
        this.boardArray[i][x] = new Card(i + x, this.currentGameImgAmount.pop())
        this.boardArray[i][x + 1] = new Card(i + (x + 1), this.currentGameImgAmount.pop())
      }
    }
    console.log(this.boardArray)
  }

  shuffleCards () {
    let temp
    let random
    for (let i = 0; i < this.currentGameImgAmount.length; i++) {
      temp = this.currentGameImgAmount[i]
      random = Math.floor(Math.random() * this.currentGameImgAmount.length)
      this.currentGameImgAmount[i] = this.currentGameImgAmount[random]
      this.currentGameImgAmount[random] = temp
    }
  }
}

module.exports = MemoryGame
