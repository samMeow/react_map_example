import PropTypes from 'prop-types'

export const GeoLocationType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
})


export default {
  GeoLocationType,
}
