import * as actionTypes from "../actions/actionsTypes"
const initialState = {
    username: null,
    loggedIn: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state,
                loggedIn: true,
                username: action.username
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                username: null
            }
        default:
            return state
    }
}

export default authReducer