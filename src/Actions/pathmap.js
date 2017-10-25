// @flow
import { createActions } from 'reduxsauce'

// ======== action =======
const { Types, Creators } = createActions({
  reset: null,
  changeStartPlace: ['place'],
  addDropoff: ['place'],
  removeDropoff: ['id'],
})

export { Types, Creators }
