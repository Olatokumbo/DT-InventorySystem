import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
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
  const [machineNumberList, setMachineNumberList] = useState([]);
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    axios
      .get("http://localhost:7000/requests/machineNumbers")
      .then((response) => {
        const modifiedData = response.data.map((data)=>data.machineNumber);
        setMachineNumberList(modifiedData)
      });
  }, []);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleChange = (event) => {
    setMachineNumber(event.target.value);
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

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmployeeId("");
    setMachineNumber("");
    setMessage("");
    setStartDate(new Date());
    setEndDate(new Date());
  };
  const submit = async (e) => {
    console.log("submit");
    e.preventDefault();
    await axios
      .post("http://localhost:7000/requests", {
        firstName,
        lastName,
        employeeId,
        machineNumber,
        message,
        startDate,
        endDate,
      }, {
        headers: {
          "Authorization" : process.env.REACT_APP_TOKEN
        }
      })
      .then((data) => {
        console.log(data);
        alert("Your Request has been sent to the Admin");
        reset();
      })
      .catch((err) => {
        console.log(err);
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
          <FormControl className={style.select}>
            <InputLabel id="demo-mutiple-name-label">
              Find Machine Number
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Find Machine Number"
              id="demo-simple-select"
              value={machineNumber}
              onChange={handleChange}
            >
              {machineNumberList.map((data, index) => (
                <MenuItem key={index} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            disabled={
              !(
                !!firstName &&
                !!lastName &&
                !!employeeId &&
                !!machineNumber &&
                !!message &&
                !!startDate &&
                !!endDate
              )
            }
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Request;
