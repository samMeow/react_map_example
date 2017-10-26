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
  askForPath: (startPlace, dropoffs) => {
    const { location } = startPlace
    const dropoffsLocation = dropoffs.map(dropoff => dropoff.location)
    const path = [location, ...dropoffsLocation].map(({ lat, lng }) => ([lat, lng]))

    return {
      type: 'ASK_FOR_PATH',
      payload: routeApi.postRouteData(path).then((res) => {
        console.log(res)
        return res
      }),
    }
  },
  getRouteByToken: token => ({
    type: 'GET_ROUTE_BY_TOKEN',
    payload: routeApi.getRouteDetail(token),
  }),
})

export { Types, Creators }
