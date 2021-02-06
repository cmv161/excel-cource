import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

import {resizeHandler} from './table.resize';
import {shouldResize} from './table.function';
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mouseup', 'mousemove', 'mousedown']

    });
  }


  toHTML() {
    return createTable()
  }

  onMouseup(event) {

  }

  onMousemove(event) {

  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
  

