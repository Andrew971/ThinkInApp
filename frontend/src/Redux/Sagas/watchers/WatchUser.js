import { GetInfo, CreateUser,UserProfile,updatepProfile, } from '../workers/GetInfo';
import {takeLatest } from 'redux-saga/effects'


export function* WatchUser() {
  yield takeLatest("USER_INFO_REQUESTED", GetInfo);
  yield takeLatest("USER_SIGNUP_REQUESTED", CreateUser);
  yield takeLatest("USER_PROFILE_REQUESTED", UserProfile);
  yield takeLatest("UPDATE_PROFILE_REQUESTED", updatepProfile);

}