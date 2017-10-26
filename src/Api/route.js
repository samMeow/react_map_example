import { create } from 'apisauce'

const api = create({
  // Hardcode API address
  baseURL: 'http://127.0.0.1:8080',
})

const postRouteData = data =>
  api.post('/route', data)

const getRouteDetail = token =>
  api.get(`/route/${token}`)

export default {
  postRouteData,
  getRouteDetail,
}
