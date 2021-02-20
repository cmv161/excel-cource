import {$} from '@core/dom';
import {storage} from '../../core/utils';
import {Store} from '../../core/createStore';
import {rootReducer} from '../../redux/rootReducer';
export function resizeHandler($root, event) {
  return new Promise(resolve=>{
    const $resizer=$(event.target)
    const $parent=$resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp =type==='col'? 'bottom': 'right'
    let value

    $resizer.css({
      [sideProp]: '-5000px'
    })
    document.onmousemove=e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value =coords.width + delta
        $resizer.css({right: -delta+'px'})
      } else {
        const delta = e.pageY-coords.bottom
        value = coords.height+ delta
        $resizer.css({bottom: -delta+'px'})
      }
    }

    document.onmouseup=(e)=>{
      document.onmouseup=null
      document.onmousemove=null

      
      if (type === 'col') {
        $parent.css({width: value+ 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`).forEach((el=>{
          el.classList.add('cell-resize')
          el.style.width= value + 'px'
        }))
        resolve({
          value,
          id: type === 'col' ? $parent.data.col : null,
          type
        })
      } else {
        $parent.css({height: value+'px'})
        console.log($parent.data.col)
        resolve({
          value,
          id: type === 'row' ? $parent.data.col : null,
          type
        })
      }


      $resizer.css({right: 0+'px',
        bottom: '0px'})
    }  
  })
}
