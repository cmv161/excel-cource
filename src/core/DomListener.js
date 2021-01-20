import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = [], name) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!')
    }
    this.$root=$root
    this.listeners=listeners
  }
  initDomListener() {
    this.listeners.forEach(listener=>{
      const method = getMethodName(listener)


      if (!this[method]) {
        const name =this.name || ''
        throw new Error(
            `methot ${method} is not imlemented in ${name} Components`)
      }

      this[method]= this[method].bind(this)

      this.$root.on(listener, this[method])
    })
  }
  removeDOMListener() {
    this.listeners.forEach(listener=>{
      const method = getMethodName(listener)

      this.$root.off(listener, this[method])
    })
  }
}
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
