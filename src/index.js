

import './scss/index.scss'
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from './redux/rootReducer';
import {Store} from './core/createStore';
import {storage, debounce} from './core/utils';
import {initialState} from "./redux/initialState";

const store= new Store(rootReducer, initialState )

const stateListener=debounce(state=>{
  console.log('App State:', state )
  storage('exel-state', state )
},300)

store.subscribe(stateListener)

const excel =new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})
excel.render()

