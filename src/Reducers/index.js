import { resettableReducer, createReducer } from 'reduxsauce'
import { combineReducers } from 'redux'

const resettable = resettableReducer('RESET')

const rootReducer = combineReducers({
  base: resettable(createReducer({}, { RESET: () => ({}) })),
})

export default rootReducer
