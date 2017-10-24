// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div>React App</div>
    )
  }
}

export default connect()(App)
