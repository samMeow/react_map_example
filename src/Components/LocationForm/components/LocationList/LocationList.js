import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PlaceType } from 'Constants/proptypes'

import './LocationList.less'

export default class LocationList extends Component {
  static propTypes = {
    removeDropoff: PropTypes.func.isRequired,
    startPlace: PlaceType.isRequired,
    dropoffs: PropTypes.arrayOf(PlaceType).isRequired,
  }

  onCrossClick = id => () => {
    const { removeDropoff } = this.props
    removeDropoff(id)
  }

  renderDropOffList = () => {
    const { dropoffs } = this.props
    return (
      <ul className="location-list-block-dropoff-list">
        {dropoffs.map(({ id, name }) =>
          (
            <li key={id} className="location-list-block-dropoff-list-item">
              <i
                className="cross-icon"
                onClick={this.onCrossClick(id)}
                role="button"
                tabIndex="-1"
                onKeyPress={this.onCrossClick(id)}
              />
              <span>{name}</span>
            </li>
          ))}
      </ul>
    )
  }

  render() {
    const { startPlace } = this.props
    return (
      <div className="grid-x location-list">
        <div className="small-6 large-12 location-list-block">
          <div className="location-list-block-header">Start Place</div>
          <div className="location-list-block-content">
            <span>{startPlace.name}</span>
          </div>
        </div>
        <div className="small-6 large-12 location-list-block">
          <div className="location-list-block-header">Dropoffs</div>
          <div className="location-list-block-content">
            {this.renderDropOffList()}
          </div>
        </div>
      </div>
    )
  }
}
