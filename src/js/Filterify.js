'use strict'

class Filterify {
  constructor (element) {
    this.element = element
    this.streaming = false
    this.width = 200
    this.height = 0
  }
  initialization () {
    this.print()
    this.startUp()
  }

  print () {
    let template = document.querySelector('#filterify-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)
  }

  takePicture () {
    console.log('hello')
    let video = this.element.querySelector('#video')
    let canvas = this.element.querySelector('#canvas')
    let photo = this.element.querySelector('#photo')
    let context = canvas.getContext('2d')

    if (this.width && this.height) {
      canvas.width = this.width
      canvas.height = this.height
      context.drawImage(video, 0, 0, this.width, this.height)

      let data = canvas.toDataURL('image/png')
      photo.setAttribute('src', data)
    } else {
      this.clearPhoto()
    }
  }
  startUp () {
    let video = this.element.querySelector('#video')
    let canvas = this.element.querySelector('#canvas')
    let photo = this.element.querySelector('#photo')
    let startButton = this.element.querySelector('#startbutton')
    let width = 200
    let height = 0

    navigator.getMedia = (navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia)

    navigator.getMedia({
      video: true,
      audio: false
    },
    function (stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream
      } else {
        let vendorURL = window.URL || window.webkitURL
        video.src = vendorURL.createObjectURL(stream)
      }
      video.play()
    },
  function (err) {
    console.log(err)
  })

    video.addEventListener('canplay', function (ev) {
      if (!this.streaming) {
        height = video.videoHeight / (video.videoWidth / width)
        console.log(video.videoWidth)

        video.setAttribute('width', width)
        video.setAttribute('height', height)
        canvas.setAttribute('height', height)
        canvas.setAttribute('height', height)
        this.streaming = true
        console.log(this.streaming)
      }
    })

    startButton.addEventListener('click', function (event) {
      event.preventDefault()
      let context = canvas.getContext('2d')

      if (width && height) {
        console.log('Hello')
        canvas.width = width
        canvas.height = height
        context.drawImage(video, 0, 0, width, height)

        let data = canvas.toDataURL('image/png')
        photo.setAttribute('src', data)
      } else {
        // this.clearPhoto()
      }
    }, false)

    // this.clearPhoto()
  }

  clearPhoto () {
    let photo = this.element.querySelector('#photo')
    let canvas = this.element.querySelector('#canvas')
    let context = canvas.getContext('2d')

    context.fillStyle = '#AAA'
    context.fillRect(0, 0, canvas.width, canvas.width)

    let data = canvas.toDataURL('image/png')
    photo.setAttribute('src', data)
  }
}
module.exports = Filterify
