import { combineReducers } from 'redux'
import { filters, filterApplied } from './FiltersReducers'
import { data } from './DataReducers'
 
const appReducers = combineReducers({
    data,
    filters,
    filterApplied
})
  
export default appReducers