

import './scss/index.scss'
import {Router} from './core/routes/Router';
import {DashboardPage} from './pages/DashboardPage';
import {ExcelPage} from './pages/ExcelPage';
import {ActiveRoute} from './core/routes/ActiveRoute';





new Router('#app', {

  dashboard: DashboardPage,
  excel: ExcelPage

})

