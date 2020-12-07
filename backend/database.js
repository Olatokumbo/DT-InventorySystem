var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "inventory_db",
  multipleStatements: true
});
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
module.exports = connection;
