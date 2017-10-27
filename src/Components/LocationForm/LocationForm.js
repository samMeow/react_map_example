import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

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
      submitForm: PropTypes.func.isRequired,
    }).isRequired,
    startPlace: PlaceType.isRequired,
    dropoffs: PropTypes.arrayOf(PlaceType).isRequired,
    requesting: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { actions, startPlace, dropoffs } = this.props
    actions.submitForm(startPlace, dropoffs)
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
    const {
      startPlace,
      dropoffs,
      actions,
      error,
      requesting,
      errorMsg,
    } = this.props
    return (
      <div>
        <form
          className={classnames('location-form', { error })}
          onSubmit={this.onSubmit}
        >
          <h3 className="location-form-title">Search Panel</h3>
          <div className="location-form-content grid-x align-center">
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
            <span className="small-12 general-error-message">{errorMsg}</span>
            <div className="grid-x small-12 medium-6 large-12 text-center">
              <button
                type="button"
                className="button alert small-6"
                onClick={this.onResetBtnClick}
                disabled={requesting}
              >
                Reset
              </button>
              <button
                type="submit"
                className="button small-6"
                disabled={requesting}
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <LocationList
          startPlace={startPlace}
          dropoffs={dropoffs}
          removeDropoff={actions.removeDropoff}
          requesting={requesting}
        />
      </div>
    )
  }
}
