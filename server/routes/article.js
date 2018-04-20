var express = require('express');
var router = express.Router();
var db = require('../database/mysql.js');

router.post('/art/getNum', function(req, res, next) {  
  if(!Number.isInteger(req.body.page) || !Number.isInteger(req.body.num)){
     res.end(JSON.stringify({msg:"请传入参数", code: 102 }));
     return;
  }
  var start = req.body.page * req.body.num;
  var sql = 'SELECT * FROM `fh_article` order by a_id desc limit ' + start + ',' + req.body.num;
  db.query(sql, function(err, result, fields){
    if(err){
        return;
    }
    res.end(JSON.stringify({data: result, msg:"获取成功", code: 0 }));
  })
});

module.exports = router;
