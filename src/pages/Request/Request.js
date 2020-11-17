import React, { useState } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import style from "./Request.module.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import moment from "moment";
import axios from "axios";
const Request = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  const isOutsideRange = (date) => {
    const now = moment();
    return !moment(date).isBetween(
      now.subtract(5, "days"),
      now,
      undefined,
      "[]"
    );
    // [] - match is inclusive
  };

  const reset = ()=>{
    setFirstName("");
    setLastName("");
    setEmployeeId("");
    setMachineNumber("");
    setMessage("");
    setStartDate(new Date())
    setEndDate(new Date())
  }
  const submit = async (e) => {
    console.log("submit")
    e.preventDefault();
    await axios.post("http://localhost:7000/approvals", {
      firstName,
      lastName,
      employeeId,
      machineNumber,
      message,
      startDate,
      endDate,
    }).then((data)=>{
        console.log(data);
        alert("Your Request has been sent to the Admin");
        reset();
    }).catch((err)=>{
        console.log(err)
    });
  };
  return (
    <div className={style.request}>
      <div className={style.header}>
        <Typography variant="h4">Request Form</Typography>
        <Typography gutterBottom>
          Please fill out this form and have your computer approved for offsite
          use
        </Typography>
        <form onSubmit={submit}>
          <TextField
            variant="outlined"
            label="First Name"
            type="text"
            align="center"
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            label="Last Name"
            type="text"
            value={lastName}
            size="small"
            onChange={(e) => setLastName(e.target.value)}
            required
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            label="Employee Id"
            type="text"
            value={employeeId}
            size="small"
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            label="Machine Number"
            type="text"
            value={machineNumber}
            size="small"
            onChange={(e) => setMachineNumber(e.target.value)}
            required
            className={style.input}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DateRangePicker
            required
            ranges={[selectionRange]}
            onChange={handleSelect}
            minDate={moment().toDate()}
            daySize={10}
            startDate={startDate}
            endDate={endDate}
            isOutsideRange={(day) => isOutsideRange(day)}
            min={3}
          />
          <TextField
            variant="outlined"
            label="Message"
            className={style.input}
            value={message}
            multiline
            rows="6"
            onChange={(e) => setMessage(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            className={style.submitBtn}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Request;