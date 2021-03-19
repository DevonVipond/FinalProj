var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

mysqlConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

export default mysqlConnection

mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    mysqlConnection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  }); 