import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import {forum} from '../../../js/Api'


export function* DoForum(action) {
	const res = yield call(axios.post, forum, action.info)
	yield put({ type: 'ADD_FORUM_SUCCESS', payload: res.data })

}

export function* GetList(action) {

	const res = yield call(axios.post, forum + 'getlist', { userId: action.info })
	yield put({ type: 'GET_FORUM_LIST_SUCCESS', payload: res.data })

}

export function* GetOneforum(action) {
	const res = yield call(axios.post, forum + 'getone', { name: action.info })
	yield put({ type: 'GET_ONE_FORUM_SUCCESS', payload: res.data.forum })
	yield put({ type: 'PROFILE_LOADED', payload: res.data.profile })
}

export function* updateForum(action) {
	const res = yield call(axios.post, forum + 'update/'+ action.info.forumId, action.info)
	yield put({ type: 'FORUM_UPDATE_SUCCESS', payload: res.data })

}

export function* deleteForum(action) {

	const res = yield call(axios.post, forum + action.info.forumId)
	yield put({ type: 'FORUM_DELETE_SUCCESS', payload: res.data })

}
