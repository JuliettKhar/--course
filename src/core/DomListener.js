import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No root provided`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)

      if (!this[method]) {
        throw new Error(`
          method ${method} is not implemented in ${this.name || ''} component
        `)
      }
      this[method] = this[method].bind(this)
      // то же самое что и addEventListener
      this.$root.on(listener, this[method])
      console.log(method)
    })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)

      this.$root.off(listener, this[method])
      console.log(method)
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
