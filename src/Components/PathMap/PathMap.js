import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Marker, DirectionsRenderer } from 'react-google-maps'
import classnames from 'classnames'

import { GeoLocationType } from 'Constants/proptypes'

import MapComponent from './components/MapComponent'

import './PathMap.less'

export default class PathMap extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      location: GeoLocationType.isRequired,
    })).isRequired,
    path: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    center: GeoLocationType.isRequired,
    requesting: PropTypes.bool.isRequired,
  }

  renderPath = () => {
    const { path } = this.props
    if (path.routes) {
      return (<DirectionsRenderer directions={path} />)
    }
    return (<div />)
  }

  renderMarker = () => {
    const { places, path } = this.props
    if (path.routes) {
      // TODO: As mockapi return hardcode route
      // so to retain consistance dont't display marker
      return (<div />)
    }

    return places.map(({ location, id }) => (
      <Marker key={id} position={location} />
    ))
  }

  render() {
    const { center, requesting } = this.props
    return (
      <div className="map-section">
        <MapComponent
          center={center}
        >
          {this.renderMarker()}
          {this.renderPath()}
        </MapComponent>
        <div className={classnames('loading-section', { show: requesting })}>
          <div className="loading-content">
            <img src="/img/loading.gif" alt="loading" />
          </div>
        </div>
      </div>
    )
  }
}
