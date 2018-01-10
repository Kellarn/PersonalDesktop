'use strict'
const AppWindow = require('../AppWindow')
const Game = require('./game')

/**
 * Constrcuctor for the memory application
 * Extends the basic app window.
 * @param options
 * @constructor
 */
class TheMemoryApp extends AppWindow {
  constructor (options) {
    super(options)

    this.game = undefined
    this.boardSize = [3, 4]
    this.markedCardForKey = undefined
  }

  /**
   * Init the application and add settings
   */
  initialization () {
    this.print()
    this.addGeneralSettings()

    this.game = new Game(this.element.querySelector('.application-content'), this.boardSize[1], this.boardSize[0])
    this.game.initialization()
    this.element.querySelector('.memory-wrapper').addEventListener('click', this.clickOnSetting.bind(this), true)
  }

  /**
   * Print the application
   */
  print () {
    super.print(this)
    this.element.classList.add('memory')
  }

  /**
   * Function to add a general settings template to the app.
   */
  addGeneralSettings () {
    let template = document.querySelector('#general-settings-template').content.cloneNode(true)
    template = this.addMemorySettings(template)
    this.element.querySelector('.application-meny').appendChild(template)
  }

  /**
   * Add specific memory settings template
   * @param element
   * @returns element
   */
  addMemorySettings (element) {
    let template = document.querySelector('#memory-setting-template').content.cloneNode(true)
    element.querySelector('.settings-div').appendChild(template)

    return element
  }

  /**
   * Function to get the clicked element and return it
   * @param target
   * @returns element
   */
  getClickedElement (target) {
    let element

    if (target.hasAttribute('value')) {
      element = target
    } else if (target.parentNode.hasAttribute('value')) {
      element = target.parentNode
    }
    return element
  }

  /**
   * Function to perform the correct action after click on settings
   * @param event
   */
  clickOnSetting (event) {
    let value

    let element = this.getClickedElement(event.target)

    if (element) {
      value = element.getAttribute('value')
      if (value === 'restart') {
        this.clearContent()
        this.game.removeEvent()
        this.game = new Game(this.element.querySelector('.application-content'), this.boardSize[1], this.boardSize[0])
        this.game.initialization()
      } else {
        this.startNewGameAfterSettingChange(value)
      }
    }
  }

  /**
   * Function to start a new game if the settings were changed.
   * @param value
   */
  startNewGameAfterSettingChange (value) {
    if (value) {
      this.boardSize = value.split('x')
    }

    this.clearContent()
    this.game.removeEvent()
    this.game = new Game(this.element.querySelector('.application-content'), this.boardSize[1], this.boardSize[0])
    this.game.initialization()
  }

  /**
   * Function to clear content
   */
  clearContent () {
    let content = this.element.querySelector('.application-content')
    while (content.lastChild) {
      content.removeChild(content.lastChild)
    }
  }

  /**
   * Function that controls what to do if a key is pressed
   * @param key
   */
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
      this.markedCardForKey.classList.toggle('marked')
    }
  }

  /**
   * Function for what happens if right key is pressed
   */
  keyRight () {
    if (this.markedCardForKey.nextElementSibling) {
      this.markedCardForKey = this.markedCardForKey.nextElementSibling
    } else if (this.markedCardForKey.parentNode.nextElementSibling) {
      this.markedCardForKey = this.markedCardForKey.parentNode.nextElementSibling.firstElementChild
    } else {
      this.markedCardForKey = this.element.querySelector('.card')
    }
  }

  /**
   * Function for what happens if left key is pressed
   */
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

  /**
   * Function for what happens if down key is pressed
   */
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

  /**
   * Function for what happens if up key is pressed
   */
  keyUp () {
    let nextRow
    if (this.markedCardForKey.parentNode.previousElementSibling) {
      let cardID = this.markedCardForKey.classList[0].slice(-2)
      nextRow = parseInt(cardID.charAt(0)) - 1
    } else {
      let allRows = this.element.querySelectorAll('.row')
      nextRow = allRows.length - 1
    }

    let correctCardAtNextRow = this.markedCardForKey.classList[0].slice(-1)
    this.markedCardForKey = this.element.querySelector('.card-' + nextRow + correctCardAtNextRow)
  }
}

module.exports = TheMemoryApp
