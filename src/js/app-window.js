'use strict'

const template = document.createElement('template')
template.innerHTML = `
<style>
   :host {
     left:50px;
     top:50px;
     background:black;
     color:white;
     width:300px;
     height:350px;
     float:left;
     text-align:center;
   }
   p{
     display:inline-block;
     margin:0 auto;
     margin-top:5px;
     padding:0;
     color:white;
   }
   img{
     margin:5px;
     padding:0;
   }
   .close{
    position:absolute;
    right:0;
   }
   .min{
     position:absolute;
     right:25px;
   }
   #menu{
     position:relative;
     border:1px solid black;
     border-radius:5px;
     background:red;
     height:30px;
   }
   </style>

   <div id="menu" id="hello">
    <p id="text">Window</p>
    <img src="../image/close.png" class="close">
    <img src="../image/minimize.png" class="min">
   </div>
`

class AppWindow extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._p = this.shadowRoot.querySelector('#text')
    this._menu = this.shadowRoot.querySelector('#menu')
    this._html = document.querySelector('html')
    this._close = this.shadowRoot.querySelector('.close')
    this._min = this.shadowRoot.querySelector('.min')
  }

  static get observedAttributes () {
    return ['text', 'p']
  }
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'text') {
      this._text = newValue
      console.log(this._p.textContent)
    } else if (name === 'p') {
      this._p.textContent = newValue
    }
  }
  connectedCallback () {
    // this._menu.addEventListener('dragstart', this._dragstart, false)
    // this._html.addEventListener('dragover', this._dragover, false)
    // this._html.addEventListener('drop', this._drop, false)
    this._close.addEventListener('click', this._closeWindow)
  }
  disconnectedCallback () {}

  /*
  _dragstart (ev) {
    let style = window.getComputedStyle(ev.target, null)
    ev.dataTransfer.setData('text/plain',
    (parseInt(style.getPropertyValue('left'), 10) - ev.clientX) + ',' +
    (parseInt(style.getPropertyValue('top'), 10) - ev.clientY))
    console.log('Dragging started' + this._p)
  }
  _dragover (ev) {
    ev.preventDefault()
    console.log('Dragged elements can be dropped here!')
  }
  _drop (ev) {
    let offset = ev.dataTransfer.getData('text/plain').split(',')

    this.style.left = (ev.clientX + parseInt(offset[0], 10)) + 'px'
    this.style.top = (ev.clientY + parseInt(offset[1], 10)) + 'px'
    ev.preventDefault()
    console.log('Dragged element dropped on target')
  }
  */
}

window.customElements.define('app-window', AppWindow)

module.exports = AppWindow
