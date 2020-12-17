const express = require("express");
const router = express.Router();
const db = require("../database.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/expired", (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const now = new Date().toISOString();
      const query = `SELECT * FROM assetinventory WHERE endDate < ?`;
      db.query(query, [now], (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      });
    }
  });
 
});


router.get("/out", (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const query = `SELECT * FROM assetinventory WHERE logFlag = 2`;
      db.query(query, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
      });
    }
  });
});

module.exports = router;
