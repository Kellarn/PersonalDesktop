'use strict'

class Timer {
  constructor () {
    this.startTime = undefined
  }

  startTimer () {
    this.startTime = new Date().getTime()
  }

  stopTimer () {
    let currentTime = new Date().getTime()

    return (currentTime - this.startTime) / 1000
  }
}

module.exports = Timer
