import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import appReducers from '../reducers/reducers'
import { fetchData } from '../actions/actions'

const store = createStore(appReducers, applyMiddleware(thunkMiddleware))

store.dispatch(fetchData()).then(() => console.log(store.getState()))

export default store