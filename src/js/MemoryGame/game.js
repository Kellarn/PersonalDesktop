'use strict'

const Card = require('./card')
const Board = require('./board')
const Timer = require('./timer')

/**
 * Constrcuctor for the memory game

 * @param element
 * @param x
 * @param y
 * @constructor
 */
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
    this.correctCounter = 0
    this.clickFunction = this.clickOnCard.bind(this)
    this.currentTime = 0

    this.shuffleCards()
    this.addEvent()
    this.timer = new Timer()
    this.timer.startTimer()
    this.gameTimer = 0
  }

/**
 * Function to init the basics
 */
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
  }

/**
 * Function to shuffle the cards that will be used in the game.
 */
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

/**
 * Function to turn a card
 * @param element
 */
  turnCard (element) {
    if (this.flippedCards.length < 2 && !element.classList.contains('disabled')) {
      if (element.classList.contains('card')) {
        let cardNumbers = element.classList[0].split('-')[1]
        let firstNumber = cardNumbers.charAt(0)
        let secondNumber = cardNumbers.charAt(1)

        element.classList.add('img-' + this.boardArray[firstNumber][secondNumber].cardNumber)
        element.classList.add('img')

        this.flippedCards.push(this.boardArray[firstNumber][secondNumber])
        this.element.querySelector('.card-' + this.boardArray[firstNumber][secondNumber].id).classList.add('disabled')

        if (this.flippedCards.length === 2) {
          this.checkIfSame()
        }
      }
    }
  }

  /**
 * Function to check if the two turned cards are the same.
 */
  checkIfSame () {
    this.turns += 1
    if (this.flippedCards[0].cardNumber === this.flippedCards[1].cardNumber) {
      this.element.querySelector('.card-' + this.flippedCards[0].id).classList.add('correct-answer')
      this.element.querySelector('.card-' + this.flippedCards[1].id).classList.add('correct-answer')

      this.flippedCards = []

      this.correctCounter += 1

      if (this.correctCounter === (this.x * this.y) / 2) {
        this.gameFinished()
      }
    } else {
      for (let i = 0; i < this.flippedCards.length; i++) {
        this.element.querySelector('.card-' + this.flippedCards[i].id).classList.add('false-answer')
        this.element.querySelector('.card-' + this.flippedCards[i].id).classList.remove('disabled')
      }
      setTimeout(this.turnBackCard.bind(this), 1000)
    }
  }

  /**
 * Function that turns back the cards if they were not the same.
 */
  turnBackCard () {
    let tempCard

    for (let i = 0; i < this.flippedCards.length; i++) {
      tempCard = this.flippedCards[i]
      this.element.querySelector('.card-' + tempCard.id).classList.remove('false-answer', 'img', 'img-' + tempCard.cardNumber)
    }

    this.flippedCards = []
  }

  /**
 * Function to see what should be done when card is clicked
 * @param event
 */
  clickOnCard (event) {
    this.turnCard(event.target)
  }

  /**
 * Helper function to add click event
 */
  addEvent () {
    this.element.addEventListener('click', this.clickFunction)
  }

   /**
 * Helper function to remove click event
 */
  removeEvent () {
    this.element.removeEventListener('click', this.clickFunction)
  }

   /**
 * Function for what to do when game is finished
 */
  gameFinished () {
    this.removeEvent()
    this.gameTimer = this.timer.stopTimer()
    let template = document.querySelector('#memory-finished-template').content.cloneNode(true)
    template.querySelector('.turns').textContent = this.turns
    template.querySelector('.time').textContent = this.gameTimer
    this.element.appendChild(template)
  }
}

module.exports = MemoryGame
