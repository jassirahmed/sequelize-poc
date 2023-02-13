const mysql = require("mysql");
const dbConn = mysql.createConnection({
  host: "localhost", // Replace with your host name
  user: "root", // Replace with your database username
  password: "Jassir@1234", // Replace with your database password
  database: "prac_db", // // Replace with your database Name
});
dbConn.connect(function (err: string) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
export default dbConn;
