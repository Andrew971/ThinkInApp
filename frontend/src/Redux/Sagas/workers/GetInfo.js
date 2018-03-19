import axios from 'axios'
import { call, put } from 'redux-saga/effects'

const apiUrl = 'http://localhost:8080/'


export function* GetInfo (action) {

  const res = yield call(axios.post,apiUrl,null,{
    headers: {
      'Authorization': action.token
    }})
    yield put ({type:"USER_LOGGED", payload:res.data})
    yield put ({type:"USER_INFO", payload:res.data.user})

}

export function* CreateUser(action) {
  const res = yield call (axios.post, apiUrl+'signup', action.data)
  yield put({type:'USER_SIGNUP_SUCCESS', payload:res.data})

}
export function* UserProfile(action) {

  const res = yield call (axios.post, apiUrl+'profile', {username:action.username})
  yield put({type:'PROFILE_LOADED', payload:res.data})

}