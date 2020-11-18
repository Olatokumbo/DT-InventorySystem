import React from "react";
import { TextField, Typography } from "@material-ui/core";
import style from "./Transaction.module.css";
const Transaction = () => {
  return (
    <div className={style.transaction}>
      <div className={style.top}>
      <div className={style.container}>
        <TextField
          size="medium"
          variant="outlined"
          name="searchAssetNumber"
          label="Search Asset Number"
          className={style.input}
          autoFocus={true}
          
        />
      </div>
      <div className={style.container}>
        <TextField
          size="medium"
          variant="outlined"
          label="Employee Id"
          className={style.input}
        />
      </div>
      </div>
      <div className={style.data}>
        <div className={style.statusContainer}>
          <Typography>Status:</Typography>
          <Typography className={style.approved}>APPROVED</Typography>
        </div>
        <Typography className={style.currentUser}>David King</Typography>
        <div className={style.dates}>
        <Typography>Start Date: Tuesday, 10/12/2020</Typography>
        <Typography>End Date: Tuesday, 10/12/2020</Typography>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
