import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

//Root reducer and root saga
import rootReducer from './root-reducer'
import { rootSaga } from './root-saga'
import {sagasHome} from '../sagas/home-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
))

sagaMiddleware.run(rootSaga)

export default store