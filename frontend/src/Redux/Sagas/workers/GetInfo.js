import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import {home} from '../../../js/Api'


export function* GetInfo (action) {

  const res = yield call(axios.post,home,null,{
    headers: {
      'Authorization': action.token
    }})
    yield put ({type:"USER_LOGGED", payload:res.data})
    yield put ({type:"USER_INFO", payload:res.data.user})

}

export function* CreateUser(action) {
  const res = yield call (axios.post, home+'signup', action.data)
  yield put({type:'USER_SIGNUP_SUCCESS', payload:res.data})

}
export function* UserProfile(action) {

  const res = yield call (axios.post, home+'profile', {username:action.username})
  yield put({type:'PROFILE_LOADED', payload:res.data})

}

export function* updatepProfile(action) {
  const res = yield call(axios.post, home + 'profile/update/'+ action.info.profileId, action.info)
	yield put({ type: 'PROFILE_UPDATE_SUCCESS', payload: res.data })

}

