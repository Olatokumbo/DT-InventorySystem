import * as actionTypes from "./actionsTypes";
import auth from "../../firebase/firebase";
const startSignin = (email, password) => {
    return ()=>{
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