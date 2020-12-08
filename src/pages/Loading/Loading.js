import React from "react";
import style from "./Loading.module.css";
import {CircularProgress, Grid} from "@material-ui/core";
const Loading = () =>{
    return(
        <Grid container justify="center" alignItems="center" className={style.container}>
        <CircularProgress/>
        </Grid>
    )
}

export default Loading;