import axios from 'axios'
import { call, put } from 'redux-saga/effects'

const apiUrl = 'http://localhost:8080/search'


export function* DoSearch (action) {
    const res = yield call (axios.post, apiUrl, {word:action.word})
    yield put({type:'SEARCH_RESULT', result:res.data})

}
