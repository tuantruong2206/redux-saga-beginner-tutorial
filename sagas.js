import { all, call, put, takeEvery } from 'redux-saga/effects'

const delay = (ms) => new Promise((res, rej) => setTimeout(res, ms))

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
    // yield delay(1000)
    yield call(delay,1000) // use call effect // => { CALL: {fn: delay, args: [1000]}}
    yield put({ type: 'INCREMENT'}) // => { PUT: {type: 'INCREMENT'} }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* helloSaga() {
    console.log('Hello Sagas!')
}
//https://redux-saga.js.org/docs/introduction/BeginnerTutorial/

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
    ])
}