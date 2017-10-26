import test from 'ava'
import { reducerTest } from 'redux-ava'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'

import { Creators, Types } from 'Actions/pathmap'
import Handlers from '../pathmap'


const mockPlace = {
  id: '123123',
  placeId: '123123',
  location: { lat: 123, lng: 33 },
  name: 'ABC',
}

test(
  'changeStartPlace reduce',
  reducerTest(
    Handlers,
    { },
    Creators.changeStartPlace(mockPlace),
    { startPlace: mockPlace, cache: {} },
  ),
)

test(
  'addDropoff reduce',
  reducerTest(
    Handlers,
    { dropoffs: [] },
    Creators.addDropoff(mockPlace),
    { dropoffs: [mockPlace], cache: {} },
  ),
)

test(
  'removeDropoff reduce',
  reducerTest(
    Handlers,
    { dropoffs: [{ id: 'a' }, { id: 'b' }] },
    Creators.removeDropoff('a'),
    { dropoffs: [{ id: 'b' }], cache: {} },
  ),
)

test(
  'submitForm with error reduce',
  reducerTest(
    Handlers,
    { error: false, errorMsg: '' },
    { type: Types.SUBMIT_FORM, error: true, errorMsg: 'Hello' },
    { error: true, errorMsg: 'Hello' },
  ),
)

test(
  'submitForm success reduce',
  reducerTest(
    Handlers,
    { error: false, errorMsg: '' },
    { type: Types.SUBMIT_FORM, error: false },
    { error: false, errorMsg: '' },
  ),
)

test(
  'askForPathPending reduce',
  reducerTest(
    Handlers,
    { requesting: false },
    { type: `${Types.ASK_FOR_PATH}_${PENDING}` },
    { requesting: true },
  ),
)

test(
  'askForPathSuccess reduce',
  reducerTest(
    Handlers,
    { requesting: true },
    { type: `${Types.ASK_FOR_PATH}_${FULFILLED}`, payload: { token: 'abc' } },
    { requesting: true, cache: { token: 'abc' } },
  ),
)

test(
  'askForPathError reduce',
  reducerTest(
    Handlers,
    { requesting: true },
    { type: `${Types.ASK_FOR_PATH}_${REJECTED}` },
    {
      requesting: false,
      error: true,
      errorMsg: 'An unexpected error occur. Please try again later',
    },
  ),
)

test(
  'getRouteByTokenSuccess success reduce',
  reducerTest(
    Handlers,
    { requesting: true, cache: {} },
    {
      type: `${Types.GET_ROUTE_BY_TOKEN}_${FULFILLED}`,
      payload: { status: 'success', path: '123' },
    },
    {
      requesting: true,
      cache: {
        path: '123',
      },
    },
  ),
)

test(
  'getRouteByTokenSuccess failure reduce',
  reducerTest(
    Handlers,
    { requesting: true },
    {
      type: `${Types.GET_ROUTE_BY_TOKEN}_${FULFILLED}`,
      payload: { status: 'failure', error: 'getRouteByTokenSuccess failure reduce' },
    },
    {
      requesting: false,
      error: true,
      errorMsg: 'getRouteByTokenSuccess failure reduce',
    },
  ),
)

test(
  'getRouteByTokenSuccess in progress reduce',
  reducerTest(
    Handlers,
    { requesting: true },
    {
      type: `${Types.GET_ROUTE_BY_TOKEN}_${FULFILLED}`,
      payload: { status: 'in progress' },
    },
    {
      requesting: false,
      error: true,
      errorMsg: 'Server is busy. Please try again later',
    },
  ),
)

test(
  'getRouteByTokenError reduce',
  reducerTest(
    Handlers,
    { requesting: true },
    { type: `${Types.GET_ROUTE_BY_TOKEN}_${REJECTED}` },
    {
      requesting: false,
      error: true,
      errorMsg: 'An unexpected error occur. Please try again later',
    },
  ),
)

test(
  'askGoogleForDrivingPathSuccess',
  reducerTest(
    Handlers,
    { requesting: true },
    {
      type: `${Types.ASK_GOOGLE_FOR_DRIVING_PATH}_${FULFILLED}`,
      payload: {
        path: '123',
      },
    },
    {
      requesting: false,
      drivePath: {
        path: '123',
      },
    },
  ),
)


test(
  'askGoogleForDrivingPathError reduce',
  reducerTest(
    Handlers,
    { requesting: true },
    { type: `${Types.ASK_GOOGLE_FOR_DRIVING_PATH}_${REJECTED}` },
    {
      requesting: false,
      error: true,
      errorMsg: 'An unexpected error occur. Please try again later',
    },
  ),
)

