import PropTypes from 'prop-types'

export const GeoLocationType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
})

export const PlaceType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  location: GeoLocationType.isRequired,
  name: PropTypes.string.isRequired,
})


export default {
  GeoLocationType,
}
