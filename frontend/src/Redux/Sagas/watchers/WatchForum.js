import { DoForum, GetList, GetOneforum,deleteForum,updateForum } from '../workers/DoForum';
import {takeLatest } from 'redux-saga/effects'


export function* WatchForum() {
  yield takeLatest("ADD_FORUM_REQUESTED", DoForum);
  yield takeLatest("GET_FORUM_LIST_REQUESTED", GetList);
  yield takeLatest("GET_ONE_FORUM_REQUESTED", GetOneforum);
  yield takeLatest("DELETE_FORUM_REQUESTED", deleteForum);
  yield takeLatest("UPDATE_FORUM_REQUESTED", updateForum);

}