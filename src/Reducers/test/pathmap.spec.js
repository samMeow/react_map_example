import test from 'ava'
import { reducerTest } from 'redux-ava'

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
    { startPlace: mockPlace },
  ),
)

test(
  'addDropoff reduce',
  reducerTest(
    Handlers,
    { dropoffs: [] },
    Creators.addDropoff(mockPlace),
    { dropoffs: [mockPlace] },
  ),
)

test(
  'removeDropoff reduce',
  reducerTest(
    Handlers,
    { dropoffs: [{ id: 'a' }, { id: 'b' }] },
    Creators.removeDropoff('a'),
    { dropoffs: [{ id: 'b' }] },
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
