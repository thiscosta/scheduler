import { defineAction } from 'redux-define'
import { createAction } from 'redux-actions'


export const LOAD_LIST_ESTABLISHMENTS = defineAction('LOAD_LIST_ESTABLISHMENTS', ['START', 'SUCCESS'], 'LOAD THE LIST OF ESTABLISHMENTS')

export const startLoadListEstablishments = createAction(LOAD_LIST_ESTABLISHMENTS.START)
export const successLoadListEstablishments = createAction(LOAD_LIST_ESTABLISHMENTS.SUCCESS)

const initialState = {
    listEstablishments : [],
    contentIsReady: true
}

export default function homeReducer(state = initialState, action){
    switch(action.type) {
        case LOAD_LIST_ESTABLISHMENTS.START:
            return {
                ...state,
                contentIsReady: false
            }
        case LOAD_LIST_ESTABLISHMENTS.SUCCESS:
            return {
                ...state,
                contentIsReady: true,
                listEstablishments: action.payload.listEstablishments
            }
        default:
            return state
    }

}