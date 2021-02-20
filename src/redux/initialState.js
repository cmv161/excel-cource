import {storage} from '../core/utils';
import {defaultStyles, defaultTitle} from '../constans';
import {debug} from 'webpack';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles
}

const normalize = state=>({

  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})



export const initialState = storage('exel-state')

    ?normalize(storage('exel-state'))
    : defaultState

export const initialState2 = storage('exel-state')

    ?storage('exel-state')
    : defaultState


console.log('initialState', initialState)
console.log('initialState2', initialState2)