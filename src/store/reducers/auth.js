import * as actionTypes from "../actions/actionsTypes"
const initialState = {
    uid: null,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                uid: action.uid,
                error: null
            }
        case actionTypes.SIGNIN_FAILED:
            return {
                ...state,
                uid: null,
                error: action.message
            }
        case actionTypes.SIGNOUT:
            return {
                ...state,
                uid: null,
                error: null
            }
        case actionTypes.RESET:
            return {
                ...state,
                uid: null,
                error: null
            }
        default:
            return state
    }
}

export default authReducer