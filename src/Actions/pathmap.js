// @flow
import { createActions } from 'reduxsauce'

import routeApi from 'Api/route'

// ======== action =======
const { Types, Creators } = createActions({
  reset: null,
  changeStartPlace: ['place'],
  addDropoff: ['place'],
  removeDropoff: ['id'],
  submitForm: (startPlace, dropoffs) =>
    (dispatch) => {
      let errorMsg
      if (dropoffs.length === 0) {
        errorMsg = 'Please enter at least one dropoff'
      }
      if (startPlace.id.length === 0) {
        errorMsg = 'Please enter a start place'
      }

      if (errorMsg) {
        dispatch({ type: 'SUBMIT_FORM', error: true, errorMsg })
        return
      }
      dispatch(Creators.askForPath(startPlace, dropoffs))
      dispatch({ type: 'SUBMIT_FORM', error: false })
    },
  askForPath: (startPlace, dropoffs) =>
    (dispatch, getState) => {
      const { pathmap: { cache } } = getState()
      if (cache.token) {
        return dispatch(Creators.getRouteByToken(cache.token))
      }

      const { location } = startPlace
      const dropoffsLocation = dropoffs.map(dropoff => dropoff.location)
      const path = [location, ...dropoffsLocation].map(({ lat, lng }) => ([lat, lng]))

      return dispatch({
        type: 'ASK_FOR_PATH',
        payload: routeApi.postRouteData(path).then((res) => {
          if (res.status !== 200) {
            throw Error('ASK_FOR_PATH Fail')
          }
          dispatch(Creators.getRouteByToken(res.token))
          return res.data
        }),
      }).catch(err => err)
    },
  getRouteByToken: token =>
    dispatch => dispatch({
      type: 'GET_ROUTE_BY_TOKEN',
      payload: routeApi.getRouteDetail(token).then((res) => {
        if (res.status !== 200) {
          throw new Error('GET_ROUTE_BY_TOKEN Fail')
        }

        if (res.data.status === 'success') {
          dispatch(Creators.askGoogleForDrivingPath(res.data.path))
        }
        return res.data
      }),
    }).catch(err => err),
  askGoogleForDrivingPath: path => ({
    type: 'ASK_GOOGLE_FOR_DRIVING_PATH',
    payload: new Promise(resolve => resolve(path)),
  }),
})

export { Types, Creators }
