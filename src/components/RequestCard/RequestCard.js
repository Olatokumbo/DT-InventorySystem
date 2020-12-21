import React from "react";
import { Button, CardContent, Typography, Card } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import style from "./RequestCard.module.css";
import moment from "moment";
import axios from "axios";
const RequestCard = ({ data, removeCard }) => {
  const approve = (machineNumber, startDate, endDate, id) => {
    console.log(machineNumber)
    axios.post("http://127.0.0.1:7000/requests/approve", {
      machineNumber,
      startDate,
      endDate
    }, {
      headers: {
        "Authorization": process.env.REACT_APP_TOKEN
      }
    }).then(() => {
      // console.log(data);
      // window.location.reload()
      removeCard(data.id);
    }).catch((err) => {
      console.log(err)
    });
  };
  const deny = (machineNumber, id) => {
    axios.post("http://127.0.0.1:7000/requests/deny", {
      machineNumber
    }, {
      headers: {
        "Authorization": process.env.REACT_APP_TOKEN
      }
    }).then((data) => {
      console.log(data)
      // window.location.reload()
      removeCard(id);
    }).catch((err) => {
      console.log(err)
    });
  };
  return (
    <Card className={style.card}>
      <CardContent>
        <div className={style.info}>
          <div className={style.name}>
            <Typography>{data.firstName}</Typography>
            <Typography>{data.lastName}</Typography>
          </div>
          <Typography>Machine Id: {data.machineNumber}</Typography>
          <Typography>Employee Id: {data.employeeId}</Typography>
          <div className={style.date}>
            <Typography>
              Start Date:{" "}
              {moment(new Date(data.startDate)).format("dddd, DD/MM/YYYY")}
            </Typography>
            <Typography>
              End Date:{" "}
              {moment(new Date(data.endDate)).format("dddd, DD/MM/YYYY")}
            </Typography>
          </div>
          <div className={style.messageContainer}>
            <Typography component="p">{data.message}</Typography>
          </div>
        </div>
        <div className={style.actions}>
          <Button
            className={style.btn}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => deny(data.machineNumber, data.id)}
          >
            <CloseIcon />
          </Button>
          <Button
            className={style.btn}
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => approve(data.machineNumber, data.startDate, data.endDate, data.id)}
          >
            <CheckIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
