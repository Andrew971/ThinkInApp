import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import {follow} from '../../../js/Api'

export function* FollowLab(action) {

    try {
        yield call(axios.post,follow+'lab', action.info)
    } catch(e) {
        console.log(e)
    }

}

export function* FollowUser(action) {
    yield call(axios.post, follow, action.info)

}
export function* unFollowUser(action) {
    yield call(axios.post, follow+'undo', action.info)

}
export function* unFollowLab(action) {
    yield call(axios.post, follow+'lab/undo', action.info)

}

export function* GetlistFo(action) {
    const res = yield call(axios.post, follow+'getlisto', {userId:action.info})
    yield put({ type: 'FOLLOW_LIST_SUCCESS', payload: res.data })

}
export function* GetMylistFo(action) {
    const res = yield call(axios.post, follow+'getlisto', {userId:action.info})
    yield put({ type: 'MY_LIST_SUCCESS', payload: res.data })

}
