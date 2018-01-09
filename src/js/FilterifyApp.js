'use strict'

const AppWindow = require('./AppWindow')
const Filterify = require('./Filterify')

class FilterifyApp extends AppWindow {
  constructor (options) {
    super(options)
    this.filterify = undefined
  }

  initialization () {
    this.print()
    this.filterify = new Filterify(this.element)
    this.filterify.initialization()
  }
  print () {
    super.print(this)
    this.element.classList.add('filterify')
  }
  close () {
    this.filterify.close()
    document.querySelector('#pwd').removeChild(this.element)
  }
}

module.exports = FilterifyApp
