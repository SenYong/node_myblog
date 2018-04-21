var express = require('express');
var router = express.Router();
var os = require("os")
var db = require('../database/mysql.js');

router.post('/art/getArtList', function(req, res, next) {  
  if(!Number.isInteger(req.body.page) || !Number.isInteger(req.body.num)){
     res.end(JSON.stringify({msg:"请传入参数", code: 102 }));
     return;
  }
  var start = req.body.page * req.body.num;
  var sql = 'SELECT * FROM `fh_article` order by a_id desc limit ' + start + ',' + req.body.num + ';' + 'SELECT count(*) as num FROM `fh_article`;'
  db.query(sql, function(err, result, fields){
    if(err){
        return;
    }
    res.end(JSON.stringify({data: result, msg:"获取成功", code: 0 }));
  })
});

router.post('/art/artDetail', function(req, res, next){
    var id = req.body.id;
    var sql = 'SELECT * FROM `fh_article` WHERE a_id=' + id + ';'
    var sqlPrev = 'SELECT * FROM `fh_article` WHERE a_id=(SELECT a_id FROM fh_article WHERE a_id<'+id+' LIMIT 1);'
    var sqlNext = 'SELECT * FROM `fh_article` WHERE a_id=(SELECT a_id FROM fh_article WHERE a_id>'+id+' LIMIT 1);'
    var sqlSetInc = 'UPDATE fh_article SET a_hit=a_hit+1 WHERE a_id='+id+';'
    db.query(sql+sqlPrev+sqlNext+sqlSetInc, function(err, result){
        if(err) return;
        var data = result[0][0];
        var prev = result[1][0];
        var next = result[2][0];
        res.end(JSON.stringify({data, prev, next, msg: "成功", code: 0}));
    })
})

router.post('/art/userComment', function(req,res, next){
    var ac_pid = req.body.ac_pid;
    var ac_name = req.body.ac_name + "";
    var ac_img = req.body.ac_img+"";
    var ac_content = req.body.ac_content+"";
    var ac_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress) + "";
    var ac_system = os.type()+"";
    var ac_time = Date.parse(new Date()) / 1000;
    var sql = 'INSERT INTO fh_article_c(ac_pid,ac_name,ac_img,ac_content,ac_ip,ac_system,ac_time) VALUES(?,?,?,?,?,?,?)';
    var addSqlParams = [ac_pid,ac_name,ac_img,ac_content,ac_ip,ac_system,ac_time]
    db.query(sql,addSqlParams,function(err,result){
        if (err) return;
        console.log(addSqlParams)
        res.end(JSON.stringify({id:addSqlParams, msg: "成功", code: 0}))
    })
})

module.exports = router;


