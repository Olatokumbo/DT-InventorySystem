import * as actionTypes from "./actionsTypes";
import auth from "../../firebase/firebase";
export const startSignin = (email, password) => {
    return (dispatch)=>{
        auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
            dispatch({ type: actionTypes.SIGNIN_SUCCESS, uid: data.uid });
          })
          .catch((err) => {
            dispatch({ type: actionTypes.SIGNIN_FAILED, error: err.message });
          });
    }
}

export const startSignout = () =>{
    return (dispatch)=>{
        auth
        .signOut()
        .then(()=>{
            dispatch({type: actionTypes.SIGNOUT})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const reset = () =>{
    return (dispatch)=>{
        dispatch({type: actionTypes.RESET})
    }
}