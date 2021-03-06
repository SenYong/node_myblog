var db    = {};  
var mysql = require('mysql');  
var pool  = mysql.createPool({  
  connectionLimit : 10,  
  host            : 'localhost',  
  user            : 'root',  
  password        : '123456',  
  database        : 'fish',
  multipleStatements: true 
});  
  
db.query = function(sql, callback){  
    if (!sql) {  
        callback();  
        return;  
    }  
    pool.query(sql, function(err, rows, fields) {  
      if (err) {  
        console.log(err);  
        callback(err, null);  
        return;  
      };  
  
      callback(null, rows, fields);  
    });  
}  

db.insert = function(sql, addSqlParams, callback){
  if(!sql){
    callback();
    return;
  }
  pool.query(sql, addSqlParams, function(err, result, fields){
    if(err){
      console.log(err);
      callback(err,null);
      return;
    }
    callback(null, result, fields);
  })
}

module.exports = db; 