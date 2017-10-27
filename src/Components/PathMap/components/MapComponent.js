import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from 'react-google-maps'

import { GeoLocationType } from 'Constants/proptypes'
import { HongKongLocaction, googleMapApiUrl } from 'Constants/googlemap'

import './MapComponent.less'

class MapComponent extends Component {
  static propTypes = {
    defaultZoom: PropTypes.number,
    defaultCenter: GeoLocationType,
    center: GeoLocationType.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    defaultZoom: 13,
    defaultCenter: HongKongLocaction,
    children: (<div />),
  }

  render() {
    const {
      defaultZoom,
      defaultCenter,
      children,
      center,
    } = this.props
    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        center={center}
      >
        {children}
      </GoogleMap>
    )
  }
}


export default compose(
  withProps({
    googleMapURL: googleMapApiUrl,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="map-container" />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapComponent)
