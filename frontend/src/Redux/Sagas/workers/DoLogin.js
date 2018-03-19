import axios from 'axios'
import { call, put } from 'redux-saga/effects'

const apiUrl = 'http://localhost:8080/'


export function* DoLogin (action) {
 
    const res = yield call (axios.post, apiUrl+'login', action.data)
    localStorage.setItem('token', res.data.token)
    yield put({type:'USER_LOGIN', payload:res.data})

}
export function* Signup (action) {
     yield call (axios.post, apiUrl+'signout',null,{
        headers: {
          'Authorization': action.token
        }})
    yield put({type:'USER_SIGNOUT'})

}
