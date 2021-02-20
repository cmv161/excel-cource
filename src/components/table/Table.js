import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';
import {resizeHandler} from './table.resize';
import {matrix, shouldResize} from './table.function';

import {isCell, nextSelector} from './table.function';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions'
import {defaultStyles} from '../../constans';
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mouseup', 'mousemove', 'mousedown', 'click', 'keydown', 'input'],
      ...options,

    });
    console.log(options)
  }
 
  toHTML() {
    return createTable(3, this.store.getState())
  }
  prepare() {
    this.selection=new TableSelection()
  }
  init() {
    super.init()
    const $cell=this.$root.find('[data-id="0:0"]')

    this.selectCell($cell)

    this.$on('formula:input', value=>{


      this.selection.current.attr('data-value', value)
          .text(parse(value))

      //     .text(parse(value)))
      // debugger
      // this.selection.current.text(value)
      this.updateTextInStore(value)
    })
    this.$on('formula:done', ()=>{
      this.selection.current.focus()
    })
    // this.$subscribe(state=>{
    //   console.log('TableState', state)
    // })

    this.$on('toolbar:applyStyle', value=>{
      console.log('Table style', value)
      this.selection.applyStyle(value)

      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    } )
  }

  onMouseup(event) {

  }
  onClick(event) {

  }

  onMousemove(event) {

  }
  
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles =$cell.getStyles(Object.keys(defaultStyles))
    console.log('styles to dispath', styles)
    this.$dispatch(actions.changeStyles(styles))
  }
  async resizeTable(event) {
    try {
      const data =await resizeHandler(this.$root, event)
     
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target=$(event.target)
      if (event.shiftKey) {
        const $celss= matrix($target, this.selection.current)
            .map(id=>this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($celss)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp']
    const {key}=event
    if (keys.includes(key)&& !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }
  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }
}
  

