import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import style from "./Transaction.module.css";
const currentDate = new Date();
const Transaction = () => {
  const [inputState, setInputState] = useState(true);
  const [actionState, setActionState] = useState(false);
  const [message, setMessage] = useState("Scan Your Asset");
  const [currentUser, setCurrentUser] = useState("");
  const [approvedUser, setApprovedUser] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [approveState, setApproveState] = useState(null);
  const [logFlag, setLogFlag] = useState(null);

  const reset = () => {
    setMessage("Scan Your Asset");
    setStartDate(null);
    setEndDate(null);
    setCurrentUser("");
    setLogFlag(null);
    setApprovedUser("");
    setInputState(true)
    
  };
  const logic = (currentDate, startDate, endDate, currentUser, approvedUser) => {
    console.log(currentDate);
    console.log(startDate);
    console.log(endDate);
    setInputState(true);
    setMessage("");
    if ((currentDate >= startDate && currentDate <= endDate) && (currentUser===approvedUser)) {
      setActionState(true);
      return "APPROVED";
    }
    setActionState(false);
    return "DENIED" ;
  };
  const search = async (e) => {
    e.preventDefault();
    let machineNumber = e.target.elements.machineNumber.value;
    setMachineNumber(machineNumber);
    reset();
    await axios
      .post("http://localhost:7000/transactions/search", {
        machineNumber,
      })
      .then((received) => {
        const { data } = received;
        console.log(data[0]);
        setStartDate(new Date(data[0].startDate));
        setApprovedUser(data[0].currentUser)
        setEndDate(new Date(data[0].endDate));
        setLogFlag(data[0].logFlag);
        setInputState(false);
        setMessage("Scan your ID");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data.message);
      });
  };

  const validate = (e) => {
    e.preventDefault();
    setCurrentUser(e.target.elements.currentUser.value)
    console.log("validate");
    setApproveState(
      logic(
        currentDate,
        startDate,
        endDate,
        approvedUser,
        e.target.elements.currentUser.value
      )
    );
  };

  const signin = async () => {
    await axios
      .post("http://localhost:7000/transactions/validate/in", {
        currentUser,
        date: currentDate,
        machineNumber,
        logFlag: 1
      })
      .then((data) => {
        console.log(data);
        setMessage("Signed In");
        setInputState(true);
        setActionState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signout = async () => {
    await axios
      .post("http://localhost:7000/transactions/validate/out", {
        currentUser,
        date: currentDate,
        machineNumber,
        logFlag: 2
      })
      .then((data) => {
        console.log(data);
        setMessage("Signed Out");
        setInputState(true);
        setActionState(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.transaction}>
      <div className={style.top}>
        <div className={style.container}>
          <form onSubmit={search}>
            <TextField
              size="medium"
              variant="outlined"
              label="Machine Number"
              name="machineNumber"
              className={style.input}
              autoFocus={inputState}
              disabled={!inputState}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </div>
        <div className={style.container}>
          <form onSubmit={validate}>
            <TextField
              size="medium"
              variant="outlined"
              label="Current User"
              autoFocus={!inputState}
              className={style.input}
              disabled={inputState}
              name="currentUser"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </div>
      </div>
      <div className={style.data}>
        <Typography>{message}</Typography>
        <Typography className={style.currentUser}>{currentUser}</Typography>
        {(startDate && currentUser) && (
          <div>
            <div className={style.statusContainer}>
              <Typography>Status:</Typography>
              <Typography
                className={
                  approveState !== "DENIED" ? style.approved : style.denied
                }
              >
                {approveState}
              </Typography>
            </div>
            <Typography gutterBottom style={{ textAlign: "center" }}>
              Asset Number: {machineNumber}
            </Typography>
            <div className={style.dates}>
              <Typography>
                Start Date:
                {startDate && moment(startDate).format("dddd, DD/MM/YYYY")}
              </Typography>
              <Typography>
                End Date:{" "}
                {endDate && moment(endDate).format("dddd, DD/MM/YYYY")}
              </Typography>
            </div>
            {actionState && (
              <div className={style.actions}>
                <Button variant="contained" size="large" color="primary" onClick={signin} disabled={logFlag!==0}>
                  Signin
                </Button>
                <Button variant="contained" size="large" color="secondary" onClick={signout} disabled={logFlag!==1}>
                  Signout
                </Button>
              </div>
            )}
            {
              logFlag===2 && (
                <div>
                <Typography className={style.signedoutMessage}>ASSET HAS ALREADY BEEN SIGNED OUT</Typography>
                <Button onClick={reset} size="large" color="secondary">RESET</Button>
                </div>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
