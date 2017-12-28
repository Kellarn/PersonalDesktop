'use strict'

const AppWindow = require('./AppWindow')
// const interact = require('interactjs')
let zIndex = 1

let options = {
  title: 'Hello',
  id: 'Window1',
  zIndex: zIndex
}
let clickwindow = document.querySelector('#window')
clickwindow.onclick = function () {
  zIndex++
  let window1 = new AppWindow(options)
  window1.print()
  console.log(options)
}
