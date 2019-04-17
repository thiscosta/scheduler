import { defineAction } from 'redux-define'
import { createAction } from 'redux-actions'


export const LOAD_LIST_ESTABLISHMENTS = defineAction('LOAD_LIST_ESTABLISHMENTS', ['START', 'SUCCESS'], 'LOAD THE LIST OF ESTABLISHMENTS')
export const SELECT_ESTABLISHMENT = defineAction('SELECT_ESTABLISHMENT', ['START', 'SUCCESS'], 'SELECT THE ESTABLISHMENT')


export const startLoadListEstablishments = createAction(LOAD_LIST_ESTABLISHMENTS.START)
export const successLoadListEstablishments = createAction(LOAD_LIST_ESTABLISHMENTS.SUCCESS)

export const startSelectEstablishment = createAction(SELECT_ESTABLISHMENT.START)
export const successSelectEstablishment = createAction(SELECT_ESTABLISHMENT.SUCCESS)


const initialState = {
    listEstablishments : [],
    contentIsReady: true,
    selectedEstablishment: null
}

export default function homeReducer(state = initialState, action){
    switch(action.type) {
        case SELECT_ESTABLISHMENT.START:
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
        case SELECT_ESTABLISHMENT.SUCCESS:
            return {
                ...state,
                contentIsReady: true,
                selectedEstablishment: action.payload.selectedEstablishment
            }
        default:
            return state
    }

}