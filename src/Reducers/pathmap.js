// @flow
import { createReducer } from 'reduxsauce'

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


const Handlers = createReducer(INIT_STATE, {
  RESET: reset,
})

export default Handlers
