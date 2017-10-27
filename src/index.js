/* global window */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './style/clear.less'

import ConfigableStore from './Store/index'
import App from './Containers/App'
import Layout from './Components/Layout/Layout'

const store = ConfigableStore()

ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>,
  document.querySelector('#app'),
)
