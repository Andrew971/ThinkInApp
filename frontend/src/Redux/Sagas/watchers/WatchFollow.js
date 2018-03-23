import { FollowLab,GetlistFo,FollowUser,GetMylistFo,unFollowUser,unFollowLab } from '../workers/doFollow';
import {takeLatest } from 'redux-saga/effects'


export function* WatchFollow() {
  yield takeLatest("FOLLOW_LAB_REQUESTED", FollowLab);
  yield takeLatest("FOLLOW_USER_REQUESTED", FollowUser);
  yield takeLatest("LIST_FOLLOW_REQUESTED", GetlistFo);
  yield takeLatest("GET_MYLIST_REQUESTED", GetMylistFo);
  yield takeLatest("UNFOLLOW_USER_REQUESTED", unFollowUser);
  yield takeLatest("UNFOLLOW_LAB_REQUESTED", unFollowLab);

}