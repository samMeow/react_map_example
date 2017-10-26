import test from 'ava'
import { actionTest } from 'redux-ava'
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk'
import reduxPromise, { PENDING, FULFILLED } from 'redux-promise-middleware'

import { Types, Creators } from '../pathmap'

test(
  'changeStartPlace action',
  actionTest(
    Creators.changeStartPlace,
    123,
    { type: Types.CHANGE_START_PLACE, place: 123 },
  ),
)


test(
  'add Dropoff action',
  actionTest(
    Creators.addDropoff,
    { id: 123 },
    { type: Types.ADD_DROPOFF, place: { id: 123 } },
  ),
)

test(
  'remove Dropoff action',
  actionTest(
    Creators.removeDropoff,
    'abc',
    { type: Types.REMOVE_DROPOFF, id: 'abc' },
  ),
)

test(
  'askForPath action',
  async (t) => {
    t.plan(3)
    const startPlace = {
      location: { lat: 1, lng: 2 },
    }
    const dropoffs = [
      { location: { lat: 112, lng: 223 } },
    ]
    const mockStore = configureStore([reduxPromise(), reduxThunk])()

    await mockStore.dispatch(Creators.askForPath(startPlace, dropoffs))

    const actions = mockStore.getActions()
    t.is(actions.length, 2)
    t.is(actions[0].type, `${Types.ASK_FOR_PATH}_${PENDING}`)
    t.is(actions[1].type, `${Types.ASK_FOR_PATH}_${FULFILLED}`)
  },
)
