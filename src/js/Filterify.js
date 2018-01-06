'use strict'

class Filterify {
  constructor (element) {
    this.element = element
    this.width = 320
    this.height = 0
    this.constraints = window.constraints = {
      audio: false,
      video: true
    }
  }

  initialization () {
    console.log(this.element)
    this.print()
    this.startUp()
  }

  print () {
    let template = document.querySelector('#filterify-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)
    this.video = this.element.querySelector('#video')
    this.canvas = this.element.querySelector('#canvas')
    this.photo = this.element.querySelector('#photo')
    this.startButton = this.element.querySelector('#startButton')
  }

  startUp () {
    navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess())
  }
  handleSuccess (stream) {
    let videoTracks
    // console.log(this.element.querySelector('#video'))
    window.stream = stream
    this.element.querySelector('#video').srcObject = stream
    videoTracks = stream.getVideoTracks()
    console.log('Using video device: ' + videoTracks[0].label)
    stream.oninactive = function () {
      console.log('Stream inactive')
    }
  }
}
module.exports = Filterify
