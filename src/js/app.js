require('./app-window')
const interact = require('interactjs')

let zindex = 0

// document.querySelector('html').addEventListener('dragover', dragover, false)
// document.querySelector('html').addEventListener('drop', drop, false)

let clickwindow = document.querySelector('#window')
clickwindow.onclick = function () {
  let window1 = document.createElement('app-window')
  interact('app-window')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: 'parent',
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
    }
  })

  function dragMoveListener (event) {
    let target = event.target
        // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener
  // window1.setAttribute('draggable', 'true')
  window1.setAttribute('id', 'window' + zindex)
  // window1.setAttribute('style.zIndex: ', zindex)

  zindex += 1
  document.querySelector('#pwd').appendChild(window1)

  /* function dragstart (ev) {
    let style = window.getComputedStyle(ev.target, null)
    ev.dataTransfer.setData('text/plain',
        (parseInt(style.getPropertyValue('left'), 10) - ev.clientX) + ',' +
        (parseInt(style.getPropertyValue('top'), 10) - ev.clientY))
  }
  document.querySelector('#window' + zindex).addEventListener('dragstart', dragstart, false)
  console.log(zindex)

}

function dragover (ev) {
  ev.preventDefault()
}
function drop (ev) {
  let offset = ev.dataTransfer.getData('text/plain').split(',')
  let menu = document.querySelector('app-window')
  menu.style.left = (ev.clientX + parseInt(offset[0], 10)) + 'px'
  menu.style.top = (ev.clientY + parseInt(offset[1], 10)) + 'px'
  ev.preventDefault()
} */
}
