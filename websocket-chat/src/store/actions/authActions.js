export const loggedIn = (data) => {
    return dispatch => {
        dispatch({
            type: 'LOGGEDIN',
            payload: data
        })
    }
}

export const logout = (data) => {
    return dispatch => {
        dispatch({
            type: 'LOGGEDOUT',
            payload: null
        })
    }
}