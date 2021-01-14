import { ON_HTTP_ERROR, UPDATE_LAST_HTTP_OBJECT, HTTP_COMPLETED, HTTP_IS_IN_PROGRESS, NOTIFY_WITH } from './globalConstants'

interface msgNotifier {
    message: string
    show: boolean
    cssClass?: string
}

const initState = {
    resHasErr: false,
    resObject: null,
    reqInProgress: false,
    reqCompleted: true,
    msgNotifier: {showMsg: false, msg: '', variant: ''} /* showMsg, msg*/
}

export function globalR(state=initState, action:reactAction) {
    switch(action.type) {
        case ON_HTTP_ERROR:
            return {...state, ...({resHasErr: action.payload})}
        case UPDATE_LAST_HTTP_OBJECT:
            return {...state, ...({resObject: action.payload})}
        case HTTP_COMPLETED:
            return {...state, reqCompleted: true, reqInProgress: false}
        case HTTP_IS_IN_PROGRESS:
            return {...state, reqInProgress: true}
        case NOTIFY_WITH: 
            return {...state, msgNotifier: action.payload}
        default:
            return state
    }
}