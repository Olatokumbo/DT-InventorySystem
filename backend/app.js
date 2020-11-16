const express = require("express");
const db = require("./database");
const cors = require("cors");
const app = express();
const port = 7000;

app.use(cors());

app.get("/", (req, res) => {
  const query = "SELECT * from computers";
  db.query(query, (err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

app.listen(port, (req, res) => {
  console.log("Server is running at port", port);
});
