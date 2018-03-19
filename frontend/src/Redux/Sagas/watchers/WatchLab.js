import { AddLab, GetOneLab,GetList,updateLab,deleteLab,AddComment,GetComment } from '../workers/doLab';
import {takeLatest } from 'redux-saga/effects'


export function* WatchLab() {
  yield takeLatest("ADD_LAB_REQUESTED", AddLab);
  yield takeLatest("GET_ONE_LAB_REQUESTED", GetOneLab);
  yield takeLatest("GET_LAB_LIST_REQUESTED", GetList);
  yield takeLatest("UPDATE_LAB_REQUESTED", updateLab);
  yield takeLatest("DELETE_LAB_REQUESTED", deleteLab);
  yield takeLatest("ADD_COMMENT_REQUESTED", AddComment);
  yield takeLatest("GET_COMMENT_REQUESTED", GetComment);


}