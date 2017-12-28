'use strict'
const AppWindow = require('./AppWindow')

class Dock {
  constructor (desktop) {
    this.desktop = desktop
  }

  createApp (type, options) {
    let thisApp

    switch (type) {
      case 'window':

        thisApp = new AppWindow(options)
        thisApp.print()
    }
  }
}

module.exports = Dock
