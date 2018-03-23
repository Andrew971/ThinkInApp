import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import {lab} from '../../../js/Api'


export function* AddLab(action) {
	const res = yield call(axios.post, lab, action.info)
	yield put({ type: 'ADD_LAB_SUCCESS', payload: res.data })

}

export function* GetList(action) {

	const res = yield call(axios.post, lab + 'getlist', { forumId: action.info })
	yield put({ type: 'GET_LAB_LIST_SUCCESS', payload: res.data })

}

export function* GetOneLab(action) {

	const res = yield call(axios.post, lab + 'getone', { id: action.info.labId })
	yield put({ type: 'GET_ONE_LAB_SUCCESS', payload: res.data.lab })
	yield put({ type: 'PROFILE_LOADED', payload: res.data.profile })
	yield put({ type: 'GET_ONE_FORUM_SUCCESS', payload: res.data.forum })

}

export function* updateLab(action) {
	const res = yield call(axios.post, lab + 'update/' + action.info.labId, action.info)
	yield put({ type: 'LAB_UPDATE_SUCCESS', payload: res.data })

}

export function* AddComment(action) {
	const res =  yield call(axios.post, lab+'comment/'+action.info.labId,{comment: action.info.comment, owner: action.info.owner})
 yield put({ type: 'ADD_COMMENT_SUCCESS', payload: res.data })
}
export function* GetComment(action) {
	const res = yield call(axios.post, lab+'comment/get/'+action.info.labId)
	yield put({ type: 'GET_COMMENT_SUCCESS', payload: res.data })

}

export function* deleteLab(action) {

	const res = yield call(axios.post, lab + action.info.labId)
	yield put({ type: 'LAB_DELETE_SUCCESS', payload: res.data })

}