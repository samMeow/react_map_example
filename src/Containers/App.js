// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import PathMap from 'Components/PathMap/PathMap'

class App extends Component {
  render() {
    return (
      <div className="grid-x">
        <div className="small-12 medium-12 large-3" />
        <div className="small-12 medium-12 large-9">
          <PathMap
            path={[]}
          />
        </div>
      </div>
    )
  }
}

export default connect()(App)
