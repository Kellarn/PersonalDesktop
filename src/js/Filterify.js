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

<<<<<<< HEAD
  initialization () {
    console.log(this.element)
=======
  async initialization () {
>>>>>>> 234ac1762fdb6a42eb87aa40d1fad729bdb8493b
    this.print()
    await this.startUp()
    this.handleSuccess()
  }

  print () {
    let template = document.querySelector('#filterify-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)
<<<<<<< HEAD
=======
  }

  async startUp () {
>>>>>>> 234ac1762fdb6a42eb87aa40d1fad729bdb8493b
    this.video = this.element.querySelector('#video')
    this.canvas = this.element.querySelector('#canvas')
    this.photo = this.element.querySelector('#photo')
    this.startButton = this.element.querySelector('#startButton')
  }

<<<<<<< HEAD
  startUp () {
    navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess())
=======
    await navigator.mediaDevices.getUserMedia(this.constraints)
    return navigator.mediaDevices.getUserMedia(this.constraints)
>>>>>>> 234ac1762fdb6a42eb87aa40d1fad729bdb8493b
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
