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
    this.clickFunction = this.clickOnCard.bind(this)

    this.shuffleCards()
    this.addEvent()
  }

  initialization () {
    let i = 0

    this.boardArray = []

    for (i = 0; i < this.y; i++) {
      let array = []
      array.length = this.y
      this.boardArray.push(array)
    }

    this.flippedCards = []

    for (i = 0; i < this.y; i++) {
      for (let x = 0; x < this.x - 1; x += 2) {
        this.boardArray[i][x] = new Card('' + i + x, this.currentGameImgAmount.pop())
        this.boardArray[i][x + 1] = new Card('' + i + (x + 1), this.currentGameImgAmount.pop())
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

  turnCard (element) {
    if (this.flippedCards.length < 2 && !element.classList.contains('disabled')) {
      if (element.classList.contains('card')) {
        let cardNumbers = element.classList[0].split('-')[1]
        let firstNumber = cardNumbers.charAt(0)
        let secondNumber = cardNumbers.charAt(1)

        element.classList.add('img-' + this.boardArray[firstNumber][secondNumber].cardNumber)
        element.classList.add('img')

        this.flippedCards.push(this.boardArray[firstNumber][secondNumber])

        if (this.flippedCards.length === 2) {
          this.checkIfSame()
        }
      }
    }
  }

  checkIfSame () {
    if (this.flippedCards[0].cardNumber === this.flippedCards[1].cardNumber) {
      this.element.querySelector('.card-' + this.flippedCards[0].id).classList.add('correct-answer')
      this.element.querySelector('.card-' + this.flippedCards[1].id).classList.add('correct-answer')

      this.flippedCards = []
    } else {
      for (let i = 0; i < this.flippedCards.length; i++) {
        console.log(this.flippedCards[i].id)
        this.element.querySelector('.card-' + this.flippedCards[i].id).classList.add('false-answer')
      }
      setTimeout(this.turnBackCard.bind(this), 1000)
    }
  }

  turnBackCard () {
    let tempCard

    for (let i = 0; i < this.flippedCards.length; i++) {
      tempCard = this.flippedCards[i]
      this.element.querySelector('.card-' + tempCard.id).classList.remove('false-answer', 'img', 'img-' + tempCard.cardNumber)
    }

    this.flippedCards = []
  }

  clickOnCard (event) {
    this.turnCard(event.target)
  }

  addEvent () {
    this.element.addEventListener('click', this.clickFunction)
  }
}

module.exports = MemoryGame
