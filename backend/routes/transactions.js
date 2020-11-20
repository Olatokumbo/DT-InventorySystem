const express = require("express");
const router = express.Router();
const db = require("../database.js");


router.post("/search", (req, res)=>{
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
});

router.post("/validate/in", (req, res)=>{
    const {
        currentUser,
        inDate,
        machineNumber
    } = req.body;
    const query =`INSERT INTO transactions (currentUser, inDate, machineNumber) VALUES (?,?, ?)`
    db.query(query,[currentUser, inDate, machineNumber], (err, data)=>{
        if (err) throw err;
        res.status(200).json(data);
    })
});

router.post("/validate/out", (req, res)=>{
    const {
        currentUser,
        outDate,
        machineNumber
    } = req.body;
    console.log(outDate)
    const query =`INSERT INTO transactions (currentUser, outDate, machineNumber) VALUES (?,?, ?)`
    db.query(query,[currentUser, outDate, machineNumber], (err, data)=>{
        if (err) throw err;
        res.status(200).json(data);
    })
});

module.exports = router