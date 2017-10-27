// @flow
declare var google: any;
type GeoLocation = [number, number];

const toLatLng = (geo: GeoLocation) =>
  (new google.maps.LatLng(geo[0], geo[1]))

const convertWayPoint = (geo: GeoLocation) =>
  ({ location: toLatLng(geo), stopover: false })

const getDrivingPath = (path: Array<GeoLocation>) => (
  new Promise((resolve, reject) => {
    if (path.length < 2) {
      reject(new Error('Invalid waypoints'))
    }

    const DirectionsService = new google.maps.DirectionsService()
    const [start, ...waypoints] = path
    const last = waypoints.pop()

    DirectionsService.route({
      origin: toLatLng(start),
      destination: toLatLng(last),
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: waypoints.map(convertWayPoint),
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result)
      } else {
        reject(new Error(JSON.stringify(result)))
      }
    })
  })
)

export default {
  getDrivingPath,
}
