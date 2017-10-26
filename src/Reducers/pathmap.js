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
  cache: {
    token: null,
  },
}

// ====== reducer ======
const reset = () => INIT_STATE

const changeStartPlace = (state, { place }) => ({
  ...state,
  startPlace: place,
  cache: {},
})

const addDropoff = (state, { place }) => ({
  ...state,
  dropoffs: [...state.dropoffs, place],
  cache: {},
})

const removeDropoff = (state, { id }) => {
  const filteredDropoff = state.dropoffs.filter(place => place.id !== id)
  return {
    ...state,
    dropoffs: filteredDropoff,
    cache: {},
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
  cache: {
    token: payload.token,
  },
})

const askForPathError = state => ({
  ...state,
  requesting: false,
  error: true,
  errorMsg: 'An unexpected error occur. Please try again later',
})

const getRouteByTokenSuccess = (state, { payload }) => {
  const { status } = payload
  let newState = {}
  switch (status) {
  case 'success':
    newState = { // TODO: should be still requesting until draw map
      requesting: false,
      cache: { ...state.cache, path: payload.path },
    }
    break
  case 'in progress':
    newState = {
      requesting: false,
      error: true,
      errorMsg: 'Server is busy. Please try again later',
    }
    break
  case 'failure':
  default:
    newState = {
      requesting: false,
      error: true,
      errorMsg: payload.error,
    }
    break
  }

  return { ...state, ...newState }
}

const getRouteByTokenError = state => ({
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
  [`${pathmapTypes.GET_ROUTE_BY_TOKEN}_${FULFILLED}`]: getRouteByTokenSuccess,
  [`${pathmapTypes.GET_ROUTE_BY_TOKEN}_${REJECTED}`]: getRouteByTokenError,
})

export default Handlers
