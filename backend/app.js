const express = require("express");
const db = require("./database");
const cors = require("cors");
const requests = require("./routes/requests");
const bodyParser = require("body-parser");
const app = express();
const port = 7000;

app.use(cors({credentials: true}));

app.use(bodyParser.urlencoded(({extended: true})));
app.use(bodyParser.json());
app.use("/requests", requests)


app.get("/", (req, res) => {
  const query = "SELECT * from assetinventory";
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

app.listen(port, (req, res) => {
  console.log("Server is running at port", port);
});
