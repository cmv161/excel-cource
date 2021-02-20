import {camelToDashCase, storage, toInlineStyles} from '../../core/utils';
import {defaultStyles} from '../../constans';
import {parse} from '@core/parse'
const CODES ={
  A: 65,
  Z: 68
}
const colsCount = CODES.Z-CODES.A+1


const DEFAULT_WIDTH = 125
const DEFAULT_HEIGHT = 25

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
  // return DEFAULT_WIDTH + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
  // return DEFAULT_WIDTH + 'px'
}

function toCell(el, col, row, state ) {
  const id= `${row}:${col}`
  const data =state.dataState[id]
      ?state.dataState[id]
      :''
  // const styles = toInlineStyles(defaultStyles)


  const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})

  return `
    <div class="cell ${el}" 
    style="${styles}; width: ${getWidth(state.colState, col)}" contenteditable 
    data-col="${col}" 
    data-type="cell"
    data-id="${row}:${col}" 
    data-value="${data}"
    > ${parse(data) || ''}</div>
    `
}


function toColumn(col, index, width) {
  return `
    <div class="column" data-type="resizable"  data-col='${index}' style="width: ${width}">
    ${col} 
 
    <div class="col-resize" data-resize = "col" ></div>
    
    </div>
    `
}

// style="height: 100px"


function createRow(index, content, height) {
  // console.log(height)
  const resize = index ? '<div class="row-resize" data-resize = "row" ></div>  ' : ''
  const style=index ? `style="height: ${height}"`: ''
  return `
    <div class="row" data-type="resizable" data-col='${index}' ${style}>
    <div class="row-info">${index ? index:'' }

   ${resize}
    </div>
    <div class="row-data"  >${content}</div>
</div>
`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A+index)
}

export function createTable(rowsCount =3, state={}) {
  const rows =[]
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el, index)=>{
        const width= getWidth(state.colState, index)
        return toColumn(el, index, width)
      })
      .join('')
 
  rows.push(createRow(null, cols))
  
  for (let row=0; row<rowsCount; row++) {
    const height= getHeight(state.rowState, row+1)
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map((el, index)=>toCell(el, index, row, state))
        .join('')
    rows.push(createRow(row+1, cells, height))
  }

  return rows.join('')
}
