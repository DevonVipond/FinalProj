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

//mysqlConnection.query('show tables',  function(err, result) {
//  if (err) { console.log(err)}
//  console.log(result)
//  console.log(Object.values(JSON.parse(JSON.stringify(result))))
//})
//
//mysqlConnection.query('select * from usertable',  function(err, result) {
//  if (err) { console.log(err)}
//  console.log(result)
//  //const parsedResult = Object.values(JSON.parse(JSON.stringify(result))).map (a => {
//  //  return {
//  //    type: a.UserType
//  //  }
//  //})
//
//  //console.log(parsedResult)
//
//})
//mysqlConnection.query('call REMOVE_ACTIVITY(?,?)', ['putin', 'soccer' ],  function(err, rows) {
//  if (err) { console.log(err)}
//  //console.log(rows)
//})
//mysqlConnection.query('select * from UserActivities',  function(err, result) {
//  if (err) { console.log(err)}
//  const parsedResult = Object.values(JSON.parse(JSON.stringify(result))).map (a => {
//    return {
//        name: a.ActivityID
//    }
//  })
//
//  console.log(parsedResult)
//
//})
//mysqlConnection.query('call SET_DISTANCE(?,?)', ['adolf', '90'],  function(err, rows) {
//  if (err) { console.log(err)}
//  //console.log(rows)
//})
//mysqlConnection.query('call GET_DISTANCE(?)', [''],  function(err, rows) {
//  if (err) { console.log(err)}
//  console.log(rows)
//})
//mysqlConnection.query('call ADD_ACTIVITY(?,?,?)', ['devon', 'soccer', 'advanced'],  function(err, rows) {
//  if (err) { console.log(err)}
//  //console.log(Object.values(rows))
//  console.log(Object.values(JSON.parse(JSON.stringify(rows))))
//})
//mysqlConnection.query('call GET_UNCHECKED_REPORTS()', [],  function(err, rows) {
//  if (err) { console.log(err)}
//  console.log(JSON.parse(JSON.stringify(rows)))
//})

module.exports = mysqlConnection