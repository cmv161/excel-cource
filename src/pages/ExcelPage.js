
import {$} from '@core/dom';
import {Page} from '../core/Page';
import {initialState, normalizeInitialState} from '../redux/initialState';
import {rootReducer} from '../redux/rootReducer';
import {createStore, Store} from '@core/store/createStore';
import {debounce, storage} from '../core/utils';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {changeDate, changeTitle} from '../redux/actions';

function storageName(param) {
  return 'excel:'+ param
}
export class ExcelPage extends Page {
  getRoot() {
    console.log('getroot')
    const params = this.params ? this.params: Date.now().toString()


    console.log(this.params)

    const state = storage(storageName(params))
    console.log('state', state)
    const store= createStore(rootReducer, normalizeInitialState(state))
    console.log('store', store)
    const stateListener=debounce(state=>{
      console.log('App State:', state )
      
     
      storage(storageName(params), state )
    }, 300)

    store.subscribe(stateListener)

    this.excel =new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store
    })
    return this.excel.getRoot()
  }
  afterRender() {
    console.log('afterRender')
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
