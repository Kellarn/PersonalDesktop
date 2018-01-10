'use strict'

/**
 * Constrcuctor for a card to use in memory
 * @param id
 * @param cardnumber
 * @constructor
 */
class MemoryCard {
  constructor (id, cardNumber) {
    this.id = id
    this.cardNumber = cardNumber
  }
}

module.exports = MemoryCard
