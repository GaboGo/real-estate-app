import { SET_FILTERS, SET_FILTER_APPLIED } from '../constants/constants'

export function setFilters(obj) {
    return { type: SET_FILTERS, obj }
}
  
export function setFilterApplied(flag) {
    return { type: SET_FILTER_APPLIED, flag }
}