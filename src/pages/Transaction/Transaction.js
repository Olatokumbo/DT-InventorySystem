import React from "react";
import { TextField } from "@material-ui/core";
import style from "./Transaction.module.css";
const Transaction = () =>{
    return(
        <div className={style.transaction}>
        <TextField 
        size="large" 
        variant="outlined"
        label="Search Asset Number"
        className={style.input}
        />
        <div className={style.data}>
        
        </div>
        </div>
    )
}

export default Transaction;