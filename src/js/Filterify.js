'use strict'

class Filterify {
  constructor (element) {
    this.element = element
    this.streaming = false
    this.classListArray = ['Normal', 'GrayScale', 'Hardware', 'RedMoon', 'YeOld', 'Sickness', 'IAmDrunk']
    this.source = undefined
  }
  initialization () {
    this.print()
    this.startUp()
  }

  print () {
    let template = document.querySelector('#filterify-template').content.cloneNode(true)
    this.element.querySelector('.application-content').appendChild(template)
  }
  close () {
    let tracks = Filterify.source.getTracks()
    tracks.forEach(function (track) {
      track.stop()
    })
  }

  startUp () {
    let video = this.element.querySelector('#video')
    let canvas = this.element.querySelector('#canvas')
    let photo = this.element.querySelector('#photo')
    let startButton = this.element.querySelector('#startbutton')
    let camera = this.element.querySelector('#camera')
    let classListArray = this.classListArray
    let element = this.element
    let width = 200
    let height = 0
    let streamSource

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
        streamSource = stream
        Filterify.source = streamSource
        video.play()
      },
      function (err) {
        console.log(err)
      })

    video.addEventListener('canplay', function (ev) {
      if (!this.streaming) {
        height = video.videoHeight / (video.videoWidth / width)

        video.setAttribute('width', width)
        video.setAttribute('height', height)
        canvas.setAttribute('height', height)
        canvas.setAttribute('height', height)
        this.streaming = true
      }
    })

    startButton.addEventListener('click', (event) => {
      event.preventDefault()
      takePhoto()
    }, false)

    function takePhoto () {
      let context = canvas.getContext('2d')

      if (width && height) {
        canvas.width = width
        canvas.height = height
        context.drawImage(video, 0, 0, width, height)

        let data = canvas.toDataURL('image/png')
        photo.setAttribute('src', data)

        let template = document.querySelector('#filter-photo-template').content.cloneNode(true)

        for (let i = 0; i < classListArray.length; i++) {
          let thumpPhoto = photo.cloneNode(true)
          let listItemTemplate = document.querySelector('#li-thumb-photo-template').content.cloneNode(true)
          listItemTemplate.querySelector('li').classList.add(classListArray[i])
          listItemTemplate.querySelector('.caption').textContent = classListArray[i]
          listItemTemplate.querySelector('.thumb-container').appendChild(thumpPhoto)
          template.querySelector('ul').appendChild(listItemTemplate)
        }

        element.querySelector('.application-content').appendChild(template)
        camera.classList.add('removeCamera')
        photo.classList.remove('notShowing')

        for (let track of streamSource.getTracks()) {
          track.stop()
        }

        let bigImage = document.querySelector('.output #photo')
        let list = document.querySelector('.filter-photo-wrapper ul')
        let items = list.querySelectorAll('li')
        let currentFilter

        for (let x = 0; x < items.length; x++) {
          items[x].addEventListener('click', function (event) {
            for (let i = 0; i < classListArray.length; i++) {
              if (items[x].classList.contains(classListArray[i])) {
                currentFilter = classListArray[i]
                bigImage.className = ''
                bigImage.classList.add(currentFilter)
              }
            }
          })
        }
      } else {
        let context = canvas.getContext('2d')

        context.fillStyle = '#AAA'
        context.fillRect(0, 0, canvas.width, canvas.width)

        let data = canvas.toDataURL('image/png')
        photo.setAttribute('src', data)
      }
    }
  }
}
module.exports = Filterify
