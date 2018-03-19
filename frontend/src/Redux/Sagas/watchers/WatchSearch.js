import { DoSearch } from '../workers/DoSearch';
import {takeLatest } from 'redux-saga/effects'


export function* WatchSearch() {
  yield takeLatest("SEARCH_WORD_REQUESTED", DoSearch);

}