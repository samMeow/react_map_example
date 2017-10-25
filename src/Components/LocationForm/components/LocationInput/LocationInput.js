import React, { PureComponent } from 'react'
import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'
import { withScriptjs } from 'react-google-maps'
import classnames from 'classnames'
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox'

import { googleMapApiUrl } from 'Constants/googlemap'

import './LocationInput.less'

class LocationInput extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  onSearchBoxMounted = (ref) => {
    this.searchBoxRef = ref
  }

  onInputMount = (ref) => {
    this.input = ref
  }

  onPlaceChange = () => {
    const { onChange } = this.props
    const places = this.searchBoxRef.getPlaces()
    if (this.validate(places)) {
      const {
        formatted_address,
        place_id: placeId,
        geometry: { location },
      } = places[0]
      onChange({
        name: formatted_address,
        location: {
          lat: location.lat(),
          lng: location.lng(),
        },
        placeId,
        id: placeId + Date.now(),
      })
      this.resetValue()
    } else {
      this.setState({ error: true })
    }
  }

  validate = (places) => {
    if (places && places.length === 1) return true
    return false
  }

  resetValue = () => {
    this.input.value = ''
    this.setState({ error: false })
  }

  render() {
    const { title, name } = this.props
    const { error } = this.state
    return (
      <div className={classnames('location-input-container', { error })}>
        <label htmlFor={name}>
          <span className="location-input-title">{title}</span>
          <StandaloneSearchBox
            ref={this.onSearchBoxMounted}
            onPlacesChanged={this.onPlaceChange}
          >
            <input
              id={name}
              type="text"
              placeholder={title}
              className="location-input"
              ref={this.onInputMount}
              onKeyDown={this.onKeyDown}
            />
          </StandaloneSearchBox>
        </label>
        <span className="error-message">Invalid Place</span>
      </div>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: googleMapApiUrl,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  withScriptjs,
)(LocationInput)
