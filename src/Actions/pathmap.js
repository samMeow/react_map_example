// @flow
import { createActions } from 'reduxsauce'

// ======== action =======
const { Types, Creators } = createActions({
  reset: null,
  changeStartPlace: ['place'],
  addDropoff: ['place'],
  removeDropoff: ['id'],
  askForPath: (startPlace, dropoffs) => {
    const { location } = startPlace
    const dropoffsLocation = dropoffs.map(dropoff => dropoff.location)
    const path = [location, ...dropoffsLocation].map(({ lat, lng }) => ([lat, lng]))

    return {
      type: 'ASK_FOR_PATH',
      payload: new Promise(resolve => setTimeout(() => resolve(path), 2000)),
    }
  },
})

export { Types, Creators }
