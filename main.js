import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSageMiddleware from 'redux-saga'

import rootSaga from './sagas'

import Counter from './Counter'
import reducer from './reducers'

const sagaMidddleware = createSageMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMidddleware)
)

sagaMidddleware.run(rootSaga)

const action = type => store.dispatch({type})
//Note that unlike in redux-thunk, our component dispatches a plain object action.
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
