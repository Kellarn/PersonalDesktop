'use strict'

class Timer {
  constructor () {
    this.timeCounter = 0
  }

  timer () {
    this.timeCounter = setTimeout(timer, 1000)
    if (seconds <= 0) {
      clearTimer()
      let message = 'Time is up. You lost :('
      restart(message)
    }
  }
}
