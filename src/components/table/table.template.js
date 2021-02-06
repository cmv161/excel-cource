
const CODES ={
  A: 65,
  Z: 68
}
const colsCount = CODES.Z-CODES.A+1

function toCell(el, col, row) {
  return `
    <div class="cell ${el}" contenteditable 
    data-col="${col}" 
    data-type="cell"
    data-id="${row}:${col}"> </div>
    `
}


function toColumn(col, index) {
  console.log(index)
  return `
    <div class="column" data-type="resizable"  data-col='${index}'>
    ${col} 
 
    <div class="col-resize" data-resize = "col" ></div>
    
    </div>
    `
}

//


function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize = "row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-col='${index}' >
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
export function createTable(rowsCount =3) {
  const rows =[]
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el, index)=>{
        return toColumn(el, index)
      })
      .join('')
  rows.push(createRow(null, cols))
  for (let row=0; row<rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map((el, index)=>toCell(el, index, row))
        .join('')
    rows.push(createRow(row+1, cells))
  }

  return rows.join('')
}
