// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PathMap from 'Components/PathMap/PathMap'
import LocationForm from 'Components/LocationForm/LocationForm'

import { PlaceType } from 'Constants/proptypes'

class App extends Component {
  static propTypes = {
    startPlace: PlaceType.isRequired,
    dropoffs: PropTypes.arrayOf(PlaceType).isRequired,
  }

  render() {
    const { startPlace, dropoffs } = this.props
    return (
      <div className="grid-x">
        <h1 className="small-12 text-center">React Map Demo</h1>
        <div className="small-12 medium-12 large-3">
          <LocationForm
            startPlace={startPlace}
            dropoffs={dropoffs}
          />
        </div>
        <div className="small-12 medium-12 large-9">
          <PathMap
            path={[]}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  startPlace: state.pathmap.startPlace,
  dropoffs: state.pathmap.dropoffs,
})

export default connect(mapStateToProps)(App)
