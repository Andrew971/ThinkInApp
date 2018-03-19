import { FollowLab,GetlistFo,FollowUser,GetMylistFo } from '../workers/doFollow';
import {takeLatest } from 'redux-saga/effects'


export function* WatchFollow() {
  yield takeLatest("FOLLOW_LAB_REQUESTED", FollowLab);
  yield takeLatest("FOLLOW_USER_REQUESTED", FollowUser);
  yield takeLatest("LIST_FOLLOW_LAB_REQUESTED", GetlistFo);
  yield takeLatest("GET_MYLIST_REQUESTED", GetMylistFo);

}