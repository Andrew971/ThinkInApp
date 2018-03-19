import axios from 'axios'
import { call, put } from 'redux-saga/effects'

const apiUrl = 'http://localhost:8080/follow/'


export function* FollowLab(action) {
    yield call(axios.post, apiUrl+'lab', action.info)

}
export function* FollowUser(action) {
    yield call(axios.post, apiUrl, action.info)

}

export function* GetlistFo(action) {
    const res = yield call(axios.post, apiUrl+'getlist', {userId:action.info})
    yield put({ type: 'FOLLOW_LIST_SUCCESS', payload: res.data })

}
export function* GetMylistFo(action) {
    const res = yield call(axios.post, apiUrl+'getlist', {userId:action.info})
    yield put({ type: 'MY_LIST_SUCCESS', payload: res.data })

}
