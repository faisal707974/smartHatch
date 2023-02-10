import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupReducer } from './reducers/popUpReducer'


const reducer = combineReducers({
    popUp : popupReducer
})

const middleware = [thunk]


const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;