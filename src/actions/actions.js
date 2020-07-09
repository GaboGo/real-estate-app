/*
 * action types
 */

export const SET_FILTERS = 'ADD_FILTERS'
export const SET_FILTER_APPLIED = 'SET_FILTER_APPLIED'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const UPDATE_DATA = 'UPDATE_DATA'

/*
 * action creators
 */

export function setFilters(obj) {
  return { type: SET_FILTERS, obj }
}

export function setFilterApplied(flag) {
  return { type: SET_FILTER_APPLIED, flag }
}

export function requestData(flag) {
  return {type: REQUEST_DATA, flag}
}

export function receiveData(json) {
  return {
    type: RECEIVE_DATA,
    data: json.data,
    receivedAt: Date.now()
  }
}

export function updateData(filters) {
  return {
    type: UPDATE_DATA,
    filters: filters,
    receivedAt: Date.now()
  }
}

export function fetchData() {
  return dispatch => {
    dispatch(requestData())
    return fetch('https://raw.githubusercontent.com/aptuno/code-challenge/master/challenges/data/properties.json')
       .then(res => res.json())
       .then((json) => {dispatch(receiveData(json))})
       .catch(console.log("error"))
  }
}
  