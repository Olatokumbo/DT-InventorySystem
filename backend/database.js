var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "inventory_db",
});
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});
module.exports = connection;
