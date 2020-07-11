import { REQUEST_DATA, RECEIVE_DATA, UPDATE_DATA, SET_CURRENT_PAGE } from '../constants/constants'

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

export function data(
    state = {
      isFetching: false,
      items: [],
      bckup: [],
      regions: [],
      bedrooms: [],
      currentPage: 1
    },
    action
){
    switch (action.type) {
      case REQUEST_DATA:
        return Object.assign({}, state, {
          isFetching: action.flag,
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
      case SET_CURRENT_PAGE:
        return Object.assign({}, state, {
            currentPage: action.page,
        })
      default:
        return state
    }
}