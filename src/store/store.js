import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/RootReducer'
import { fetchData } from '../actions/DataActions'

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

store.dispatch(fetchData()).then(() => console.log(store.getState()))

export default store