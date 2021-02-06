import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter=options.emitter
    this.unsubscribers=[]
    this.prepare()
  }
  // настраиваем наш компонент до init
  prepare() {}
  toHTML() {
    return ''
  }
  // Уведомляем слушателей про событие event
  $emit(event, ...arg) {
    this.emitter.emit(event, ...arg)
  }

  
  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // инициализируем компонент
  // добавляем DOM слушателей
  init() {
    this.initDomListener()
  }
  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListener()
    this.unsubscribers.forEach(unsub=>unsub())
  }
}
