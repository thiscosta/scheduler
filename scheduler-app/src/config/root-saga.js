import { sagasHome } from '../sagas/home-saga';

import { fork, all} from 'redux-saga/effects'

export function* rootSaga() {
  yield all([
    fork(sagasHome)
  ])
}
