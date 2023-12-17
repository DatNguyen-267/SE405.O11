import {createStore , applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas';
import allReducers from './reducers';

const sagaMiddleware = createSagaMiddleware()
// const middleWares = []
// const enhancers = [applyMiddleware(...middleWares)]

const store = createStore(
  allReducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)
export default store

export type RootState = ReturnType<typeof store.getState>