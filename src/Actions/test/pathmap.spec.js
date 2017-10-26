import test from 'ava'
import { actionTest } from 'redux-ava'
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk'
import reduxPromise, { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import sinon from 'sinon'
import nock from 'nock'

import googleMapApi from 'Api/googlemap'
import { Types, Creators } from '../pathmap'

const storefunc = configureStore([reduxPromise(), reduxThunk])

test.before(() => {
  process.env.API_URL = 'http://127.0.0.1:8080'
})

test.after(() => {
  delete process.env.API_URL
})

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
    const mockStore = storefunc()

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
    const mockStore = storefunc()

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
    const mockStore = storefunc()
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

    const mockStore = storefunc({ pathmap: { cache: {} } })
    sinon.stub(Creators, 'getRouteByToken').returns({ type: 'MOCK_GET' })

    nock(process.env.API_URL)
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

    const mockStore = storefunc({ pathmap: { cache: {} } })
    sinon.stub(Creators, 'getRouteByToken').returns({ type: 'MOCK_GET' })

    nock(process.env.API_URL)
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

test.serial(
  'askForPath success with cache action',
  async (t) => {
    const mockStore = storefunc({ pathmap: { cache: { token: 'abc' } } })
    const mockGet = sinon.stub(Creators, 'getRouteByToken').returns({ type: 'MOCK_GET' })

    await mockStore.dispatch(Creators.askForPath())
    const actions = mockStore.getActions()

    t.is(actions.length, 1)
    t.is(actions[0].type, 'MOCK_GET')
    t.true(mockGet.called)
    t.true(mockGet.calledWithExactly('abc'))

    Creators.getRouteByToken.restore()
  },
)

test.serial(
  'getRouteByToken succcess action',
  async (t) => {
    const mockStore = storefunc()
    const mockGoogleGet = sinon.stub(Creators, 'askGoogleForDrivingPath')
      .returns({ type: 'MOCK_GOOGLE_GET' })

    nock(process.env.API_URL)
      .get('/route/abc')
      .reply(200, { status: 'success', path: 'dummy' })

    await mockStore.dispatch(Creators.getRouteByToken('abc'))
    const actions = mockStore.getActions()

    t.is(actions.length, 3)
    t.is(actions[0].type, `${Types.GET_ROUTE_BY_TOKEN}_${PENDING}`)
    t.is(actions[1].type, 'MOCK_GOOGLE_GET')
    t.is(actions[2].type, `${Types.GET_ROUTE_BY_TOKEN}_${FULFILLED}`)
    t.true(mockGoogleGet.calledWithExactly('dummy'))
    t.deepEqual(actions[2].payload, { status: 'success', path: 'dummy' })

    mockGoogleGet.restore()
  },
)

test.serial(
  'getRouteByToken fail action',
  async (t) => {
    const mockStore = storefunc()
    const mockGoogleGet = sinon.stub(Creators, 'askGoogleForDrivingPath')
      .returns({ type: 'MOCK_GOOGLE_GET' })

    nock(process.env.API_URL)
      .get('/route/abc')
      .reply(500)

    await mockStore.dispatch(Creators.getRouteByToken('abc'))
    const actions = mockStore.getActions()

    t.is(actions.length, 2)
    t.is(actions[0].type, `${Types.GET_ROUTE_BY_TOKEN}_${PENDING}`)
    t.is(actions[1].type, `${Types.GET_ROUTE_BY_TOKEN}_${REJECTED}`)
    t.false(mockGoogleGet.called)

    mockGoogleGet.restore()
  },
)

test.serial(
  'getRouteByToken in progress action',
  async (t) => {
    const mockStore = storefunc()
    const mockGoogleGet = sinon.stub(Creators, 'askGoogleForDrivingPath')
      .returns({ type: 'MOCK_GOOGLE_GET' })

    nock(process.env.API_URL)
      .get('/route/abc')
      .reply(200, { status: 'in progress', path: 'dummy' })

    await mockStore.dispatch(Creators.getRouteByToken('abc'))
    const actions = mockStore.getActions()

    t.is(actions.length, 2)
    t.is(actions[0].type, `${Types.GET_ROUTE_BY_TOKEN}_${PENDING}`)
    t.is(actions[1].type, `${Types.GET_ROUTE_BY_TOKEN}_${FULFILLED}`)
    t.false(mockGoogleGet.called)

    mockGoogleGet.restore()
  },
)

test.serial(
  'askGoogleForDrivingPath success action',
  async (t) => {
    const path = [
      [1, 2],
      [2, 3],
    ]
    const mockStore = storefunc()
    const mockgoogleApi = sinon.stub(googleMapApi, 'getDrivingPath')
      .resolves('success')

    await mockStore.dispatch(Creators.askGoogleForDrivingPath(path))
    const actions = mockStore.getActions()

    t.is(actions.length, 2)
    t.is(actions[0].type, `${Types.ASK_GOOGLE_FOR_DRIVING_PATH}_${PENDING}`)
    t.is(actions[1].type, `${Types.ASK_GOOGLE_FOR_DRIVING_PATH}_${FULFILLED}`)
    t.true(mockgoogleApi.calledWithMatch(path))

    mockgoogleApi.restore()
  },
)

test.serial(
  'askGoogleForDrivingPath error action',
  async (t) => {
    const path = [
      [1, 2],
      [2, 3],
    ]
    const mockStore = storefunc()
    const mockgoogleApi = sinon.stub(googleMapApi, 'getDrivingPath')
      .rejects()

    await mockStore.dispatch(Creators.askGoogleForDrivingPath(path)).catch(err => err)
    const actions = mockStore.getActions()

    t.is(actions.length, 2)
    t.is(actions[0].type, `${Types.ASK_GOOGLE_FOR_DRIVING_PATH}_${PENDING}`)
    t.is(actions[1].type, `${Types.ASK_GOOGLE_FOR_DRIVING_PATH}_${REJECTED}`)
    t.true(mockgoogleApi.calledWithMatch(path))

    mockgoogleApi.restore()
  },
)
