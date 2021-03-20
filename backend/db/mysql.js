var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'cpsc471-project.cizxxygrjsdl.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'thisclasssucks',
  database: 'activities_app',
  multipleStatements: true
});

mysqlConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql database!");
});

mysqlConnection.query('call authenticateUser(?,?, @res); select @res;', ['test', 'password'], function(err, result) {
  if (err) { console.log(err)}
  console.log(result[1][0]['@res'])

})

module.exports = mysqlConnection
  //host: process.env.DB_HOST,
  //port: process.env.DB_PORT,
  //user: process.env.DB_USER,
  //password: process.env.DB_PASSWORD,
  //database: process.env.DB_NAME