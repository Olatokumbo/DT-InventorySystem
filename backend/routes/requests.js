const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/", (req, res) => {
  const query = "SELECT * FROM requests";
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
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

module.exports = router;
