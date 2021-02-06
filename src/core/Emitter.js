export class Emitter {
  constructor() {
    this.listeners={}
  }
  // Уведомляем слушателей если они есть
  // table.emit('table:select', {a:1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener=>{
      listener(...args)   
    })
    return true
  }
  
  // Подписываемся на умедомления
  // Добовляем нового слушателя
  // formula.subscribe('table:select', () =>{})
  subscribe(event, fn) {
    this.listeners[event]=this.listeners[event] || []
    this.listeners[event].push(fn)
    return ()=>{
      this.listeners[event]=
            this.listeners[event].filter(listener=>listener !== fn)
    }
  }
}

// const emitter = new Emitter()
// const unsub=emitter.subscribe('zen', data=> console.log('Sub', data))
// emitter.emit('zen', 42)
// console.log(unsub)
//
