import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Marker, DirectionsRenderer } from 'react-google-maps'

import { GeoLocationType } from 'Constants/proptypes'
import { HongKongLocaction } from 'Constants/googlemap'

import MapComponent from './components/MapComponent'

export default class PathMap extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      location: GeoLocationType.isRequired,
    })).isRequired,
    path: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  renderPath = () => {
    const { path } = this.props
    if (path.routes) {
      return (<DirectionsRenderer directions={path} />)
    }
    return (<div />)
  }

  renderMarker = () => {
    const { places } = this.props
    return places.map(({ location, id }) => (
      <Marker key={id} position={location} />
    ))
  }

  render() {
    return (
      <MapComponent
        center={HongKongLocaction}
      >
        {this.renderMarker()}
        {this.renderPath()}
      </MapComponent>
    )
  }
}
