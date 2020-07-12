import { ApiUrl } from "../config/config";
import fetch from 'cross-fetch';
import { REQUEST_DATA, RECEIVE_DATA, UPDATE_DATA, SET_CURRENT_PAGE } from '../constants/constants'

export function requestData(flag) {
    return {type: REQUEST_DATA, flag}
}

export function setCurrentPage(page) {
    return { type: SET_CURRENT_PAGE, page }
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
      dispatch(requestData(true))
      return fetch(ApiUrl)
         .then(res => res.json())
         .then((json) => {dispatch(receiveData(json))})
         .catch(console.log("error"))
    }
}
    