// @flow
import { createReducer } from 'reduxsauce'
import { Types as pathmapTypes } from 'Actions/pathmap'


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

const Handlers = createReducer(INIT_STATE, {
  RESET: reset,
  [pathmapTypes.CHANGE_START_PLACE]: changeStartPlace,
  [pathmapTypes.ADD_DROPOFF]: addDropoff,
  [pathmapTypes.REMOVE_DROPOFF]: removeDropoff,
})

export default Handlers
