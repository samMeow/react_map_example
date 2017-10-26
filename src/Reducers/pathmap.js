// @flow
import { createReducer } from 'reduxsauce'
import { Types as pathmapTypes } from 'Actions/pathmap'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'


export const INIT_STATE = {
  startPlace: {
    name: 'Not Selected Yet',
    placeId: '',
    id: '',
    location: {
      lat: 0,
      lng: 0,
    },
  },
  dropoffs: [],
  requesting: false,
  error: false,
  errorMsg: '',
  token: null,
}

// ====== reducer ======
const reset = () => INIT_STATE

const changeStartPlace = (state, { place }) => ({
  ...state,
  startPlace: place,
})

const addDropoff = (state, { place }) => ({
  ...state,
  dropoffs: [...state.dropoffs, place],
})

const removeDropoff = (state, { id }) => {
  const filteredDropoff = state.dropoffs.filter(place => place.id !== id)
  return {
    ...state,
    dropoffs: filteredDropoff,
  }
}

const submitForm = (state, { error, errorMsg }) => ({
  ...state,
  error,
  errorMsg: errorMsg || state.errorMsg,
})

const askForPathPending = state => ({
  ...state,
  requesting: true,
})

const askForPathSuccess = (state, { payload }) => ({
  ...state,
  requesting: false, // TODO: should be false until we draw the path
  token: payload.token, // debug purpose
})

const askForPathError = state => ({
  ...state,
  requesting: false,
  error: true,
  errorMsg: 'An unexpected error occur. Please try again later',
})

const Handlers = createReducer(INIT_STATE, {
  RESET: reset,
  [pathmapTypes.CHANGE_START_PLACE]: changeStartPlace,
  [pathmapTypes.ADD_DROPOFF]: addDropoff,
  [pathmapTypes.REMOVE_DROPOFF]: removeDropoff,
  [pathmapTypes.SUBMIT_FORM]: submitForm,
  [`${pathmapTypes.ASK_FOR_PATH}_${PENDING}`]: askForPathPending,
  [`${pathmapTypes.ASK_FOR_PATH}_${FULFILLED}`]: askForPathSuccess,
  [`${pathmapTypes.ASK_FOR_PATH}_${REJECTED}`]: askForPathError,
})

export default Handlers
