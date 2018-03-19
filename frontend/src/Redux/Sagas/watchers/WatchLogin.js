import { DoLogin,Signup } from '../workers/DoLogin';
import {takeLatest } from 'redux-saga/effects'


export function* WatchLogin() {
  yield takeLatest("USER_LOGIN_REQUESTED", DoLogin);
  yield takeLatest("USER_SIGNOUT_REQUEST", Signup);

}