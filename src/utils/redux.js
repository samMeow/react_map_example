import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'

export function constructActionNames(ACTION_NAME) {
  const REQUESTING = `${ACTION_NAME}_${PENDING}`
  const SUCCESS = `${ACTION_NAME}_${FULFILLED}`
  const FAILURE = `${ACTION_NAME}_${REJECTED}`

  return { REQUESTING, SUCCESS, FAILURE }
}

export default {
  constructActionNames,
}
