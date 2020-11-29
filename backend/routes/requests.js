const express = require("express");
const router = express.Router();
const db = require("../database.js");
const mailer = require("../middlewares/mailer");
require('dotenv').config()
router.get("/", (req, res) => {
  const query = "SELECT * FROM requests";
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

router.post("/", mailer, (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    employeeId,
    machineNumber,
    message,
    startDate,
    endDate,
  } = req.body;
const query = `INSERT INTO requests (firstName, lastName, employeeId, machineNumber, startDate, endDate, message) VALUES (?,?,?,?,?,?,?)` 
db.query(query, [firstName, lastName, employeeId, machineNumber, startDate, endDate, message], (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
// console.log(query);
});


router.post("/approve", (req, res)=>{
  const machineNumber = req.body.machineNumber;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  console.log(startDate, endDate)
  console.log(machineNumber);
  const query = `DELETE FROM requests WHERE machineNumber=?; UPDATE assetinventory SET startDate=?, endDate=? WHERE machineNumber=?;` 
  db.query(query,[machineNumber, startDate, endDate ,machineNumber],  (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
})

router.post("/deny", (req, res)=>{
  const machineNumber = req.body.machineNumber;
  console.log(machineNumber);
  const query = `DELETE FROM requests WHERE machineNumber=?` 
  db.query(query,[machineNumber],  (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
})
module.exports = router;
