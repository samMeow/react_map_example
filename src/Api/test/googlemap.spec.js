/* global google */
import test from 'ava'
import sinon from 'sinon'

import googleMapApi from '../googlemap'

test.before(() => {
  global.google = {
    maps: {
      DirectionsService: () => {},
      DirectionsStatus: {
        OK: 1,
        FAIL: -1,
      },
      LatLng: (lat, lng) => ({ lat, lng }),
      TravelMode: {
        DRIVING: 'DRIVING',
      },
    },
  }
})

test.serial(
  'getDrivingPath success',
  async (t) => {
    const path = [
      [1, 2],
      [1, 2],
    ]

    const routeApi = sinon.stub()
    const mockDirectionsService = sinon.stub(google.maps, 'DirectionsService')
    mockDirectionsService.returns({
      route: routeApi,
    })

    const promise = googleMapApi.getDrivingPath(path)
    routeApi.callArgWith(1, { result: 'result' }, google.maps.DirectionsStatus.OK)
    const result = await promise

    t.true(routeApi.called)
    t.true(routeApi.calledWithMatch({
      origin: { lat: 1, lng: 2 },
      destination: { lat: 1, lng: 2 },
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: [],
    }))
    t.deepEqual(result, { result: 'result' })

    mockDirectionsService.restore()
  },
)

test.serial(
  'getDrivingPath fail args',
  async (t) => {
    const path = [
      [1, 2],
    ]

    const routeApi = sinon.stub()
    const mockDirectionsService = sinon.stub(google.maps, 'DirectionsService')
    mockDirectionsService.returns({
      route: routeApi,
    })

    const promise = googleMapApi.getDrivingPath(path)

    const error = await t.throws(promise)
    t.is(error.message, 'Invalid waypoints')

    mockDirectionsService.restore()
  },
)

test.serial(
  'getDrivingPath fail callback',
  async (t) => {
    const path = [
      [1, 2],
      [1, 2],
    ]

    const routeApi = sinon.stub()
    const mockDirectionsService = sinon.stub(google.maps, 'DirectionsService')
    mockDirectionsService.returns({
      route: routeApi,
    })

    const promise = googleMapApi.getDrivingPath(path)
    routeApi.callArgWith(1, { result: 'result' }, google.maps.DirectionsStatus.FAIL)
    const error = await t.throws(promise)

    t.true(routeApi.called)
    t.true(routeApi.calledWithMatch({
      origin: { lat: 1, lng: 2 },
      destination: { lat: 1, lng: 2 },
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: [],
    }))
    t.is(error.message, JSON.stringify({ result: 'result' }))

    mockDirectionsService.restore()
  },
)
