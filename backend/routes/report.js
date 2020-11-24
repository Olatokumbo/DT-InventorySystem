const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/expired", (req, res) => {
  const now = new Date().toISOString();
  const query = `SELECT * FROM assetinventory WHERE endDate < ?`;
  db.query(query, [now], (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});


router.get("/out", (req, res) => {
  const query = `SELECT * FROM assetinventory WHERE logFlag = 2`;
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

module.exports = router;
