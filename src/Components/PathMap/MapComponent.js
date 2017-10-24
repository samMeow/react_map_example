import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from 'react-google-maps'

import { GeoLocationType } from 'Constants/proptypes'

import './style.less'

class MapComponent extends Component {
  static propTypes = {
    defaultZoom: PropTypes.number,
    defaultCenter: GeoLocationType,
    children: PropTypes.node,
  }

  static defaultProps = {
    defaultZoom: 11,
    defaultCenter: { lat: 22.2855, lng: 114.1577 },
    children: (<div />),
  }

  render() {
    const { defaultZoom, defaultCenter, children } = this.props
    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
      >
        {children}
      </GoogleMap>
    )
  }
}


export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js' +
      '?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="map-container" />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapComponent)
