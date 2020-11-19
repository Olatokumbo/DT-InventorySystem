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

router.post("/validate", (req, res)=>{
    const {
        currentUser, 
        approvalFlag, 
        startDate, 
        endDate
    } = req.body;
    const query =`INSERT INTO transactions (currentUser, approvalFlag, startDate, endDate) VALUES (?,?,?,?)`
    db.query(query,[currentUser, approvalFlag, startDate, endDate], (err, data)=>{
        if (err) throw err;
        console.log(data);
    })
});

module.exports = router