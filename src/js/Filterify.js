'use strict'

class Filterify {
  constructor (element) {
    this.element = element
    this.width = 320
    this.height = 0
    this.streaming = false
    this.video = null
    this.canvas = null
    this.photo = null
    this.startButton = null
    this.localStream = undefined
  }

  initialization () {
    this.print()
    this.startUp()
  }

  print () {
    let template = document.querySelector('#filterify-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)
  }

  start () {
    this.video = this.element.querySelector('#video')
    this.canvas = this.element.querySelector('#canvas')
    this.photo = this.element.querySelector('#photo')
    this.startButton = this.element.querySelector('#startButton')
    window.trace('Requesting local stream')
    this.startButton.disabled = true
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then(this.gotStream)
    .catch(function (e) {
      window.alert('getUserMedia() error: ' + e.name)
    })
  }
  gotStream (stream) {
    this.video = this.element.querySelector('#video')
    window.trace('Received local stream')
    this.video.srcObject = stream
    this.localStream = stream
  }
}
module.exports = Filterify
