// @flow
import { applyMiddleware, createStore, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise-middleware'

import reducers from '../Reducers/index'

const middlewares = [reduxPromise(), reduxThunk]

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const  { logger } = require('redux-logger')
  middlewares.push(logger)
}

export default (initialState: Object = {}) => {
  const composeMiddleware = compose(applyMiddleware(...middlewares))
  const createStoreWithMiddleware = composeMiddleware(createStore)
  return createStoreWithMiddleware(reducers, initialState)
}
