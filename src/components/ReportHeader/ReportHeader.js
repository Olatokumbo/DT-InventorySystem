import React from "react";
import { Button } from "@material-ui/core";
import {useHistory} from "react-router-dom"
import style from "./ReportHeader.module.css";
const ReportHeader = (props) => {
  const history = useHistory();  
  return (
    <div className={style.report}>
      <div className={style.left}>
        <h3 style={{ textAlign: "center" }}>Report</h3>
        <Button className={style.navBtn} variant="contained" onClick={()=>{history.push("/report/expired")}}>
          Expired Requests
        </Button>
        <Button className={style.navBtn} variant="contained" onClick={()=>{history.push("/report/out")}}>
          Assets Offsite
        </Button>
      </div>
      <div className={style.right}>
        {props.children}
      </div>
    </div>
  );
};

export default ReportHeader;
