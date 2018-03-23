import axios from 'axios'
import { call, put } from 'redux-saga/effects'

const apiUrl = 'http://localhost:8080/forum/'


export function* DoForum(action) {
	const res = yield call(axios.post, apiUrl, action.info)
	yield put({ type: 'ADD_FORUM_SUCCESS', payload: res.data })

}

export function* GetList(action) {

	const res = yield call(axios.post, apiUrl + 'getlist', { userId: action.info })
	yield put({ type: 'GET_FORUM_LIST_SUCCESS', payload: res.data })

}

export function* GetOneforum(action) {
	const res = yield call(axios.post, apiUrl + 'getone', { name: action.info })
	yield put({ type: 'GET_ONE_FORUM_SUCCESS', payload: res.data.forum })
	yield put({ type: 'PROFILE_LOADED', payload: res.data.profile })


}

export function* updateForum(action) {
	const res = yield call(axios.post, apiUrl + 'update/'+ action.info.forumId, action.info)
	yield put({ type: 'FORUM_UPDATE_SUCCESS', payload: res.data })

}

export function* deleteForum(action) {

	const res = yield call(axios.post, apiUrl + action.info.forumId)
	yield put({ type: 'FORUM_DELETE_SUCCESS', payload: res.data })

}
