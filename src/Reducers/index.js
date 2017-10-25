import { resettableReducer, createReducer } from 'reduxsauce'
import { combineReducers } from 'redux'

import pathmapReducer from './pathmap'

const resettable = resettableReducer('RESET')

const rootReducer = combineReducers({
  base: resettable(createReducer({}, { RESET: () => ({}) })),
  pathmap: resettable(pathmapReducer),
})

export default rootReducer
