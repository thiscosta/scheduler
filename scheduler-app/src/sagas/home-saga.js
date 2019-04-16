import { takeLatest, all ,call, put } from 'redux-saga/effects'

import { 
    LOAD_LIST_ESTABLISHMENTS, successLoadListEstablishments
} from '../reducers/home-reducer'

import service from '../services/home-service'

//LOAD
function* loadEstablishments() {
    try{
        console.log('chegou saga')
        const result = yield call(service.getEstablishments)
        if(result.success)
            yield put(successLoadListEstablishments({ listEstablishments: result.data }))
        
    }catch(error){
        console.log(error)
    }
}

//TAKE LATEST
export function* sagasHome() {
    yield all ([
        takeLatest(LOAD_LIST_ESTABLISHMENTS.START, loadEstablishments)
    ])
}
