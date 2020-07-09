import { combineReducers } from 'redux'
import { SET_FILTERS, SET_FILTER_APPLIED, REQUEST_DATA, RECEIVE_DATA, UPDATE_DATA } from '../actions/actions'

const getDataFiltered = (data, filters) => {
    return data.filter(card => {
        let applyRegionFilter = false;
        let applyBedroomsFilter = false;
        if(filters.region !== ''){
            if(card.regions[0].includes(filters.region)){
                applyRegionFilter = true
            }        
        } else {
            applyRegionFilter = true
        }
        if(filters.bedrooms.length > 0) {
            filters.bedrooms.forEach(bedroom => {
                if(bedroom == card.bedrooms){
                    applyBedroomsFilter = true
                    return
                }
            })
        } else {
            applyBedroomsFilter = true
        }
        if(applyRegionFilter && applyBedroomsFilter){
            return card
        }

        return false
    })
}

const populateArray = (data, type) => {
    let array = []
    data.map(elem => {
      const key = type === 'regions' ? elem.regions[0] : elem.bedrooms
      if(array.indexOf(key) === -1){
        array.push(key)
      }
    })
    return array.sort()
}

function data(
    state = {
      isFetching: false,
      items: [],
      bckup: [],
      regions: [],
      bedrooms: []
    },
    action
){
    switch (action.type) {
      case REQUEST_DATA:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case RECEIVE_DATA:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.data,
          bckup: action.data,
          regions: populateArray(action.data, 'regions'),
          bedrooms: populateArray(action.data, 'bedrooms'),
          lastUpdated: action.receivedAt
        })
      case UPDATE_DATA:
        return Object.assign({}, state, {
          isFetching: false,
          items: getDataFiltered(state.bckup, action.filters),
          lastUpdated: action.receivedAt
        })
      default:
        return state
    }
}

function filters(state = {region : '', bedrooms : []}, action) {
    switch (action.type) {
      case SET_FILTERS:
        console.log(action.obj)
        return action.obj
      default:
        return state
    }
}

function filterApplied(state = false, action) {
    switch (action.type) {
      case SET_FILTER_APPLIED:
        return action.flag
      default:
        return state
    }
}
  
const appReducers = combineReducers({
    data,
    filters,
    filterApplied
})
  
export default appReducers