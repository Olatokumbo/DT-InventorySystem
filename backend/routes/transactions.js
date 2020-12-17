const express = require("express");
const router = express.Router();
const db = require("../database.js");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
require("dotenv").config();


router.post("/search", auth ,(req, res)=>{
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const machineNumber = req.body.machineNumber;
            const query = `SELECT * FROM assetinventory WHERE machineNumber=?`;
            db.query(query, [machineNumber], (err, data) => {
              if (err) throw err;
              if(data.length<1){
                res.status(400).json({
                    message: "Records has not been found"
                });
              }
              else{
                res.status(200).json(data);
              }
            });
        }
      });
});

router.post("/validate/in", auth ,(req, res)=>{
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {
                currentUser,
                date,
                machineNumber,
                logFlag
            } = req.body;
            const query =`INSERT INTO transactions (currentUser, date, machineNumber, logFlag) VALUES (?,?,?,?); UPDATE assetinventory SET logFlag=? WHERE machineNumber=?;`
            db.query(query,[currentUser, date, machineNumber, logFlag, logFlag, machineNumber], (err, data)=>{
                if (err) throw err;
                res.status(200).json(data);
            })
        }
      });
});

router.post("/validate/out", auth ,(req, res)=>{
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {
                currentUser,
                date,
                machineNumber,
                logFlag
            } = req.body;
            const query =`INSERT INTO transactions (currentUser, date, machineNumber, logFlag) VALUES (?,?,?,?); UPDATE assetinventory SET logFlag=? WHERE machineNumber=?;`
            db.query(query,[currentUser, date, machineNumber, logFlag, logFlag, machineNumber], (err, data)=>{
                if (err) throw err;
                res.status(200).json(data);
            })
        }
      });
});

module.exports = router