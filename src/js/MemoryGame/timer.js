'use strict'

/**
 * Constrcuctor for a simple timer
 * @constructor
 */
class Timer {
  constructor () {
    this.startTime = undefined
  }

  /**
   * Starts the timer
   */
  startTimer () {
    this.startTime = new Date().getTime()
  }

  /**
   * Stops the timer
   * @returns int currentTime
   */
  stopTimer () {
    let currentTime = new Date().getTime()

    return (currentTime - this.startTime) / 1000
  }
}

module.exports = Timer
