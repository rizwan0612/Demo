import * as constants from './globalConstants'

export const httpInProgress = () => ({type: constants.HTTP_IS_IN_PROGRESS})
export const httpCompleted = () => ({type: constants.HTTP_COMPLETED})
export const httpError = (payload:any) => ({type: constants.ON_HTTP_ERROR, payload})
export const httpResponse = (resObject: any) => ({type: constants.UPDATE_LAST_HTTP_OBJECT, payload: resObject})
export const notification = (showMsg: boolean, msg: string, variant: string, uiAction="") => {
    if(uiAction == 'formSubmit') {
        document.querySelector('.popupeditbody') && document.querySelector('.popupeditbody').classList.remove('beforehitSubmit')
    }
    return ({type: constants.NOTIFY_WITH, payload: {showMsg, msg, variant}})
}
export const logoutAction = () => ({type: constants.LOGOUT_ACTION})