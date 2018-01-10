'use strict'

const AppWindow = require('./AppWindow')
const Filterify = require('./Filterify')

/**
 * Constrcuctor for the Filterify Application
 * Extends the AppWindow class
 * @param options
 * @constructor
 */
class FilterifyApp extends AppWindow {
  constructor (options) {
    super(options)
    this.filterify = undefined
  }

   /**
   * Function to initialize the content
   */
  initialization () {
    this.print()
    this.filterify = new Filterify(this.element)
    this.filterify.initialization()
  }

  /**
   * Function to print
   */
  print () {
    super.print(this)
    this.element.classList.add('filterify')
  }

  /**
   * Function to close the application
   */
  close () {
    this.filterify.close()
    document.querySelector('#pwd').removeChild(this.element)
  }
}

module.exports = FilterifyApp
