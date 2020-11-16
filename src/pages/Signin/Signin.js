import React from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import logo from "../../assets/images/share.png";
import style from "./Signin.module.css";
const Signin = ({ signin, error, reset }) => {
  const signinForm = (e) => {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    signin({ username, password });
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
              name="text"
              type="text"
              className={style.input}
              variant="outlined"
              label="Username"
              size="small"
            />
            <TextField
              name="password"
              type="password"
              className={style.input}
              variant="outlined"
              label="Password"
              size="small"
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

export default Signin;
