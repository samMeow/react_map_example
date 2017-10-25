import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PlaceType } from 'Constants/proptypes'

import LocationInput from './components/LocationInput/LocationInput'
import LocationList from './components/LocationList/LocationList'

import './LocationForm.less'

export default class LocationForm extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      addDropoff: PropTypes.func.isRequired,
      removeDropoff: PropTypes.func.isRequired,
      changeStartPlace: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
    }).isRequired,
    startPlace: PlaceType.isRequired,
    dropoffs: PropTypes.arrayOf(PlaceType).isRequired,
  }

  onSubmit = (e) => {
    e.preventDefault()
  }

  onStartPointChange = (place) => {
    const { actions } = this.props
    actions.changeStartPlace(place)
  }

  onDropPointChange = (place) => {
    const { actions } = this.props
    actions.addDropoff(place)
  }

  onResetBtnClick = () => {
    const { actions } = this.props
    actions.reset()
  }

  render() {
    const { startPlace, dropoffs, actions } = this.props
    return (
      <div>
        <form className="location-form grid-x align-center" onSubmit={this.onSubmit}>
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
          <div className="grid-x small-12 medium-6 large-12 text-center">
            <button
              type="button"
              className="button alert small-6"
              onClick={this.onResetBtnClick}
            >
              Reset
            </button>
            <button
              type="submit"
              className="button small-6"
            >
              Search
            </button>
          </div>
        </form>
        <LocationList
          startPlace={startPlace}
          dropoffs={dropoffs}
          removeDropoff={actions.removeDropoff}
        />
      </div>
    )
  }
}
