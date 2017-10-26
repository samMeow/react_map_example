import test from 'ava'
import { actionTest } from 'redux-ava'
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk'
import reduxPromise, { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import sinon from 'sinon'
import nock from 'nock'

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
  'submitForm invalid startplace action',
  async (t) => {
    const startPlace = { id: '' }
    const mockStore = configureStore([reduxPromise(), reduxThunk])()

    await mockStore.dispatch(Creators.submitForm(startPlace, []))
    const actions = mockStore.getActions()
    const expectedAction = {
      type: Types.SUBMIT_FORM,
      error: true,
      errorMsg: 'Please enter a start place',
    }
    t.deepEqual(actions[0], expectedAction)
  },
)

test(
  'submitForm invalid dropoff action',
  async (t) => {
    const startPlace = { id: '123' }
    const mockStore = configureStore([reduxPromise(), reduxThunk])()

    await mockStore.dispatch(Creators.submitForm(startPlace, []))
    const actions = mockStore.getActions()
    const expectedAction = {
      type: Types.SUBMIT_FORM,
      error: true,
      errorMsg: 'Please enter at least one dropoff',
    }
    t.deepEqual(actions[0], expectedAction)
  },
)

test.serial(
  'submitForm success action',
  async (t) => {
    const startPlace = { id: '123' }
    const dropoffs = [{ id: '321' }]
    const mockStore = configureStore([reduxPromise(), reduxThunk])()
    const mockAsk = sinon.stub(Creators, 'askForPath').returns({ type: 'MOCK_ASK' })

    await mockStore.dispatch(Creators.submitForm(startPlace, dropoffs))
    const actions = mockStore.getActions()
    const expectedAction = {
      type: Types.SUBMIT_FORM,
      error: false,
    }
    t.is(actions.length, 2)
    t.is(actions[0].type, 'MOCK_ASK')
    t.deepEqual(actions[1], expectedAction)
    t.true(mockAsk.called)
    t.true(mockAsk.calledWithExactly(startPlace, dropoffs))

    Creators.askForPath.restore()
  },
)

test.serial(
  'askForPath success action',
  async (t) => {
    const startPlace = { location: { lat: 12, lng: 12 } }
    const dropoffs = [{ location: { lat: 1, lng: 133 } }]

    const mockStore = configureStore([reduxPromise(), reduxThunk])()
    sinon.stub(Creators, 'getRouteByToken').returns({ type: 'MOCK_GET' })

    nock('http://127.0.0.1:8080')
      .post('/route')
      .reply(200, { token: 'abc' })

    await mockStore.dispatch(Creators.askForPath(startPlace, dropoffs))

    const actions = mockStore.getActions()
    t.is(actions.length, 3)
    t.is(actions[0].type, `${Types.ASK_FOR_PATH}_${PENDING}`)
    t.is(actions[1].type, 'MOCK_GET')
    t.is(actions[2].type, `${Types.ASK_FOR_PATH}_${FULFILLED}`)
    t.deepEqual(actions[2].payload, { token: 'abc' })

    Creators.getRouteByToken.restore()
  },
)

test.serial(
  'askForPath fail response action',
  async (t) => {
    const startPlace = { location: { lat: 12, lng: 12 } }
    const dropoffs = [{ location: { lat: 1, lng: 133 } }]

    const mockStore = configureStore([reduxPromise(), reduxThunk])()
    sinon.stub(Creators, 'getRouteByToken').returns({ type: 'MOCK_GET' })

    nock('http://127.0.0.1:8080')
      .post('/route')
      .reply(500)

    await mockStore.dispatch(Creators.askForPath(startPlace, dropoffs))

    const actions = mockStore.getActions()
    t.is(actions.length, 2)
    t.is(actions[0].type, `${Types.ASK_FOR_PATH}_${PENDING}`)
    t.is(actions[1].type, `${Types.ASK_FOR_PATH}_${REJECTED}`)

    Creators.getRouteByToken.restore()
  },
)
