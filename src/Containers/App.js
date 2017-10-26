// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PathMap from 'Components/PathMap/PathMap'
import LocationForm from 'Components/LocationForm/LocationForm'

import { Creators as pathMapActions } from 'Actions/pathmap'

import { PlaceType } from 'Constants/proptypes'

class App extends Component {
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

  render() {
    const {
      startPlace,
      dropoffs,
      actions,
      requesting,
      error,
      errorMsg,
    } = this.props
    return (
      <div className="grid-x">
        <h1 className="small-12 text-center">React Map Demo</h1>
        <div className="small-12 medium-12 large-3">
          <LocationForm
            startPlace={startPlace}
            dropoffs={dropoffs}
            requesting={requesting}
            error={error}
            errorMsg={errorMsg}
            actions={{
              addDropoff: actions.addDropoff,
              removeDropoff: actions.removeDropoff,
              changeStartPlace: actions.changeStartPlace,
              reset: actions.reset,
              submitForm: actions.submitForm,
            }}
          />
        </div>
        <div className="small-12 medium-12 large-9">
          <PathMap
            path={[]}
            places={[startPlace, ...dropoffs]}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  startPlace: state.pathmap.startPlace,
  dropoffs: state.pathmap.dropoffs,
  requesting: state.pathmap.requesting,
  error: state.pathmap.error,
  errorMsg: state.pathmap.errorMsg,
})

const mapDispathToProps = dispath => ({
  actions: bindActionCreators({
    changeStartPlace: pathMapActions.changeStartPlace,
    addDropoff: pathMapActions.addDropoff,
    removeDropoff: pathMapActions.removeDropoff,
    reset: pathMapActions.reset,
    submitForm: pathMapActions.submitForm,
  }, dispath),
})

export default connect(mapStateToProps, mapDispathToProps)(App)
