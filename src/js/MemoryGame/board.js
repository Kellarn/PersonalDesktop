'use strict'

/**
 * Constrcuctor for a board for the memory game
 * @param element
 * @param x
 * @param y
 * @constructor
 */
class MemoryBoard {
  constructor (element, x, y) {
    this.x = x
    this.y = y
    this.element = element

    this.print()
  }

  /**
 * Function to print the board
 */
  print () {
    let fragment = document.createDocumentFragment()

    let row
    let col

    for (let i = 0; i < this.y; i++) {
      row = document.createElement('div')
      row.classList.add('row')

      for (let x = 0; x < this.x; x++) {
        col = document.createElement('div')
        col.classList.add('card-' + i + x, 'card')

        row.appendChild(col)
      }

      fragment.appendChild(row)
    }
    this.element.appendChild(fragment)
  }
}

module.exports = MemoryBoard
