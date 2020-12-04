import React from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import logo from "../../assets/images/share.png";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreator from "../../store/actions";
import style from "./Signin.module.css";
const Signin = ({ signin, error, reset }) => {
  const history =  useHistory();
  const signinForm = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    signin(email, password);
  };
  return (
    <div className={style.main}>
      <div className={style.signinContainer}>
        <div className={style.left}></div>
        <div className={style.right}>
          <div className={style.brand}>
            <img className={style.logo} src={logo} alt="logo.png" />
            <Typography variant="h6">DT Computer Inventory</Typography>
          </div>
          <form className={style.form} onSubmit={signinForm}>
            <TextField
              name="email"
              type="email"
              className={style.input}
              variant="outlined"
              label="Email"
              size="small"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="password"
              type="password"
              className={style.input}
              variant="outlined"
              label="Password"
              size="small"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              className={style.signin}
              variant="contained"
              size="small"
              color="primary"
            >
              Sign In
            </Button>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) =>{
  return{
    error: state.auth.error
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    signin: (name, password)=> dispatch(actionCreator.startSignin(name, password))
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Signin);
