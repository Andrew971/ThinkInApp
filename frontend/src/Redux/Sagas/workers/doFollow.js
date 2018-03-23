import axios from 'axios'
import { call, put } from 'redux-saga/effects'

const apiUrl = 'http://localhost:8080/follow/'

export function* FollowLab(action) {
console.log(action.info)
    try {
        yield call(axios.post,apiUrl+'lab', action.info)
        //console.log(res.data)
    } catch(e) {
        console.log(e)
    }

}

export function* FollowUser(action) {
    yield call(axios.post, apiUrl, action.info)

}
export function* unFollowUser(action) {
    yield call(axios.post, apiUrl+'undo', action.info)

}
export function* unFollowLab(action) {
    // yield call(axios.post, apiUrl+'lab/undo', action.info)

}

export function* GetlistFo(action) {
    const res = yield call(axios.post, apiUrl+'getlisto', {userId:action.info})
    yield put({ type: 'FOLLOW_LIST_SUCCESS', payload: res.data })

}
export function* GetMylistFo(action) {
    const res = yield call(axios.post, apiUrl+'getlisto', {userId:action.info})
    yield put({ type: 'MY_LIST_SUCCESS', payload: res.data })

}
