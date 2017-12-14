require('./app-window')

let window1 = document.createElement('app-window')
console.log('Hello')

document.querySelector('#pwd').appendChild(window1)

function dragstart (ev) {
  let style = window.getComputedStyle(ev.target, null)
  ev.dataTransfer.setData('text/plain',
      (parseInt(style.getPropertyValue('left'), 10) - ev.clientX) + ',' +
      (parseInt(style.getPropertyValue('top'), 10) - ev.clientY))
  console.log('Dragging started')
}

function dragover (ev) {
  ev.preventDefault()
  console.log('Dragged elements can be dropped here!')
}
function drop (ev) {
  let offset = ev.dataTransfer.getData('text/plain').split(',')
  let menu = document.querySelector('app-window')
  menu.style.left = (ev.clientX + parseInt(offset[0], 10)) + 'px'
  menu.style.top = (ev.clientY + parseInt(offset[1], 10)) + 'px'
  ev.preventDefault()
  console.log('Dragged element dropped on target')
}

document.querySelector('#pwd').addEventListener('dragstart', dragstart, false)
document.querySelector('html').addEventListener('dragover', dragover, false)
document.querySelector('html').addEventListener('drop', drop, false)
