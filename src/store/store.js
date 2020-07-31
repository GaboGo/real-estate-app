import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers/RootReducer'
import { fetchData } from '../actions/DataActions'
export const history = createHistory();

function configureStoreProd() {
    return createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)))
}

function configureStoreDev() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    return  createStore(rootReducer, composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(),thunkMiddleware)))
}

export const store = process.env.NODE_ENV === 'production' ? configureStoreProd() : configureStoreDev()

store.dispatch(fetchData()).then(() => console.log(store.getState()))

export default store