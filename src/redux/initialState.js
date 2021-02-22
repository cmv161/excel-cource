import {clone, storage} from '../core/utils';
import {defaultStyles, defaultTitle} from '../constans';
import {debug} from 'webpack';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
  
}

const normalize = state=>({

  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})


// export const initialState = storage('exel-state')
//
//     ?normalize(storage('exel-state'))
//     : defaultState

export const initialState2 = storage('exel-state')

    ?storage('exel-state')
    : defaultState

export function normalizeInitialState(state) {
  return state ? normalize(state): clone(defaultState)
}
