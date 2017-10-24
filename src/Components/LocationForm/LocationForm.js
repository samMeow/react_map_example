import React, { Component } from 'react'

import LocationInput from './components/LocationInput'
import LocationInput from './components/LocationInput/LocationInput'

import './LocationForm.less'

export default class LocationForm extends Component {
  onSubmit = (e) => {
    e.preventDefault()
  }

  onStartPointChange = (place) => {
    console.log(place)
  }

  onDropPointChange = (place) => {
    console.log(place)
  }

  render() {
    return (
      <div>
        <form className="location-form grid-x" onSubmit={this.onSubmit}>
          <div className="small-6 large-12">
            <LocationInput
              title="Start"
              name="start"
              onChange={this.onStartPointChange}
            />
          </div>
          <div className="small-6 large-12">
            <LocationInput
              title="Drop-off"
              name="dropoff"
              onChange={this.onDropPointChange}
            />
          </div>
        </form>
      </div>
    )
  }
}
