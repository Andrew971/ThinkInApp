import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import {search} from '../../../js/Api'



export function* DoSearch (action) {
    const res = yield call (axios.post, search, {word:action.word})
    yield put({type:'SEARCH_RESULT', result:res.data})

}
