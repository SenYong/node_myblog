var express = require('express');
var router = express.Router();
var db = require('../database/mysql.js');


router.get('/api/index', function(req, res, next) {  
  var sql = 'SELECT * FROM `fh_cat` order by c_id desc limit 0,1';
  db.query(sql, function(err, result, fields){
    if(err){
        return;
    }
    res.send(result);
  })
});

module.exports = router;
