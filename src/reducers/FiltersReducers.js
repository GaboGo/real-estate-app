import { SET_FILTERS, SET_FILTER_APPLIED } from '../constants/constants'

export function filters(state = {region : '', bedrooms : []}, action) {
    switch (action.type) {
      case SET_FILTERS:
        return action.obj
      default:
        return state
    }
}

export function filterApplied(state = false, action) {
    switch (action.type) {
      case SET_FILTER_APPLIED:
        return action.flag
      default:
        return state
    }
}
