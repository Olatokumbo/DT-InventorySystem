import React from "react";
import { Button, CardContent, Typography, Card } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import style from "./RequestCard.module.css";
import moment from "moment";

const RequestCard = ({ data }) => {
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
          <Typography component="p">
          {data.message}
          </Typography>
          </div>
        </div>
        <div className={style.actions}>
          <Button
            className={style.btn}
            size="small"
            variant="contained"
            color="primary"
          >
            <CloseIcon />
          </Button>
          <Button
            className={style.btn}
            size="small"
            variant="contained"
            color="secondary"
          >
            <CheckIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;