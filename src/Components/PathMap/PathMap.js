import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GeoLocationType } from 'Constants/proptypes'

import MapComponent from './components/MapComponent'

export default class PathMap extends Component {
  static propTypes = {
    path: PropTypes.arrayOf(GeoLocationType).isRequired,
  }

  renderPath = () => {
    const { path } = this.props
    return path.map(loc => loc)
  }

  render() {
    return (
      <MapComponent />
    )
  }
}
