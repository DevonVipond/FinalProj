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

//mysqlConnection.query('select * from UserActivities',  function(err, result) {
//  if (err) { console.log(err)}
//  console.log(result)
//
//})
//function fancyFind (keyToFind, dataStructure) {
//
//    if (!keyToFind || !dataStructure) return null
//
//    for (const key in dataStructure) {
//
//        const value = dataStructure[key]
//
//        if (key == keyToFind) { 
//
//            return value            
//
//        } else if (key.constructor.name == keyToFind) {
//
//          return key
//
//        } else if (Array.isArray(value)) { 
//
//            const res = fancyFind(keyToFind, value); 
//
//            if(res) return res
//
//        } else if (typeof dataStructure[key] === 'object' && !Array.isArray(value)) { 
//
//            const res = fancyFind(keyToFind, value); 
//
//            if(res) return res
//
//        }  else {
//
//
//        }
//    }
//
//    return null; 
//
//}
//
//
//mysqlConnection.query('call GET_ACTIVITIES(?)', ['adolf'],  function(err, rows) {
//  if (err) { console.log(err)}
//  console.log(rows)
//
//
//})

module.exports = mysqlConnection