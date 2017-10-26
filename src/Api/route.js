// @flow
/* global process */
import { create } from 'apisauce'

type GeoLocation = [number, number];

const api = () => create({
  baseURL: process.env.API_URL,
})

const postRouteData = (data: Array<GeoLocation>) =>
  api().post('/route', data)

const getRouteDetail = (token: string) =>
  api().get(`/route/${token}`)

export default {
  postRouteData,
  getRouteDetail,
}
