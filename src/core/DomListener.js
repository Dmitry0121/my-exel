import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListener() {
    this.listeners.forEach((listener) => {
      const method = gatMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} not found ib ${this.name} component`)
      }
      this[method] = this[method].bind(this) // bind a method to its context
      this.$root.on(listener, this[method]) // addEventListener
    })
  }

  removeDOMListener() {
    this.listeners.forEach((listener) => {
      const method = gatMethodName(listener)
      this.$root.off(listener, this[method]) // removeEventListener
    })
  }
}

function gatMethodName(name) {
  return 'on' + capitalize(name)
}