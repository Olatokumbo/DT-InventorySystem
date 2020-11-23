const express = require("express");
const db = require("./database");
const cors = require("cors");
const requests = require("./routes/requests");
const transactions = require("./routes/transactions");
const bodyParser = require("body-parser");
var { nanoid } = require("nanoid");
const app = express();
const port = 7000;

app.use(cors({credentials: true}));

app.use(bodyParser.urlencoded(({extended: true})));
app.use(bodyParser.json());
app.use("/requests", requests)
app.use("/transactions", transactions)

// GET DATA FROM INVENTORY
app.get("/", (req, res) => {
  const query = "SELECT * from assetinventory";
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

// ADD TO INVENTORY
app.post("/add", (req, res)=>{
  const {
    machineType, 
    makeAndModel, 
    serviceTag, 
    machineNumber, 
    deliveryDate, 
    resourceAccount, 
    currentUser, 
    deploymentDate, 
    businessUnit, 
    location, 
    poNumber,
    moveable
  } = req.body
  const uid=nanoid();
  const query = `INSERT INTO assetinventory (uid, machineType, makeAndModel, serviceTag, machineNumber, deliveryDate, resourceAccount, currentUser, deploymentDate, businessUnit, location, poNumber, logFlag, moveable) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  db.query(query, [uid,machineType, makeAndModel, serviceTag, machineNumber, deliveryDate, resourceAccount, currentUser, deploymentDate, businessUnit, location, poNumber, 0, moveable], (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
})

app.get("/asset/:assetId", (req, res)=>{
    const assetId = req.params.assetId;
    const query = `SELECT * FROM assetinventory WHERE uid=?`
    db.query(query, [assetId], (err, data)=>{
      if (err) throw err;
      if(data.length<1){
        res.status(400).json({
            message: "Records has not been found"
        });
      }
      else{
        res.status(200).json(data);
      }
    })
})

// EDIT INVENTORY 
app.post("/asset/edit/:assetId", (req, res)=>{
  const assetId = req.params.assetId;
  const {
    machineType, 
    makeAndModel, 
    serviceTag, 
    machineNumber, 
    deliveryDate, 
    resourceAccount, 
    currentUser, 
    deploymentDate, 
    businessUnit, 
    location, 
    poNumber,
    moveable
  } = req.body
  const query=`UPDATE assetinventory SET machineType=?, makeAndModel=?, serviceTag=?, machineNumber=?, deliveryDate=?, resourceAccount=?, currentUser=?, deploymentDate=?, businessUnit=?, location=?, poNumber=?, moveable=? WHERE uid=?`;
  db.query(query, [machineType, makeAndModel, serviceTag, machineNumber, deliveryDate, resourceAccount, currentUser, deploymentDate, businessUnit, location, poNumber, moveable, assetId], (err, data)=>{
    if (err) throw err;
    if (data)
    res.status(200).json(data);
  })
})

// DELETE FROM INVENTORY
app.post("/asset/delete/:assetId", (req, res)=>{
  const assetId = req.params.assetId;
  const query=`DELETE FROM assetinventory WHERE uid=?`;
  db.query(query, [assetId], (err, data)=>{
    if (err) throw err;
    if (data)
    res.status(200).json(data);
  })
})

app.listen(port, (req, res) => {
  console.log("Server is running at port", port);
});
