const express = require("express");
const db = require("./database");
const cors = require("cors");
const requests = require("./routes/requests");
const transactions = require("./routes/transactions");
const bodyParser = require("body-parser");
const app = express();
const port = 7000;

app.use(cors({credentials: true}));

app.use(bodyParser.urlencoded(({extended: true})));
app.use(bodyParser.json());
app.use("/requests", requests)
app.use("/transactions", transactions)


app.get("/", (req, res) => {
  const query = "SELECT * from assetinventory";
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

app.post("/add", (req, res)=>{
  const {
    machineType, 
    makeAndModel, 
    serviceTag, 
    machineNumber, 
    deliveryDate, 
    user, 
    resourceAccount, 
    currentUser, 
    deploymentDate, 
    businessUnit, 
    location, 
    poNumber,
    moveable
  } = req.body
  const query = `INSERT INTO assetinventory (machineType, makeAndModel, serviceTag, machineNumber, deliveryDate, user, resourceAccount, currentUser, deploymentDate, businessUnit, location, poNumber, logFlag, moveable) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  db.query(query, [machineType, makeAndModel, serviceTag, machineNumber, deliveryDate, user, resourceAccount, currentUser, deploymentDate, businessUnit, location, poNumber, 0, moveable], (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
})

app.get("/asset/:assetId", (req, res)=>{
    const assetId = req.params.assetId;
    const query = `SELECT * FROM assetinventory WHERE machineNumber=?`
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

app.listen(port, (req, res) => {
  console.log("Server is running at port", port);
});
