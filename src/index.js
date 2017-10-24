/* global window */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ConfigableStore from './Store/index'
import App from './Containers/App'

const store = ConfigableStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app'),
)
