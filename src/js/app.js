'use strict'

const AppWindow = require('./AppWindow')

let options = {
  title: 'Window1',
  id: 'Window1'
}
let clickwindow = document.querySelector('#window')
clickwindow.onclick = function () {
  let window1 = new AppWindow(options)
  window1.print()
}
