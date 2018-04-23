var express = require('express');
var router = express.Router();
var os = require('os');
var db = require('../database/mysql.js');


router.post('/log/getLogList', function(req, res, next){
    if(!Number.isInteger(req.body.page) || !Number.isInteger(req.body.num)){
        res.end(JSON.stringify({msg:"请传入参数", code: 102 }));
        return;
    }
    var start = req.body.page * req.body.num;
    var sql = 'SELECT * FROM `fh_log` ORDER BY l_id limit ' + start + ',' + req.body.num + ';' + 'SELECT COUNT(*) as num FROM `fh_log`;'
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

router.post('/log/logDetail', function(req, res, next){
    var id = req.body.id;
    var sql = 'SELECT * FROM `fh_log` WHERE l_id=' + id + ';'
    var sqlPrev = 'SELECT * FROM `fh_log` WHERE l_id=(SELECT l_id FROM fh_log WHERE l_id<'+id+' LIMIT 1);'
    var sqlNext = 'SELECT * FROM `fh_log` WHERE l_id=(SELECT l_id FROM fh_log WHERE l_id>'+id+' LIMIT 1);'
    var sqlSetInc = 'UPDATE fh_log SET l_hit=l_hit+1 WHERE l_id='+id+';'
    db.query(sql+sqlPrev+sqlNext+sqlSetInc, function(err, result){
        if(err) return;
        var data = result[0][0];
        var prev = result[1][0];
        var next = result[2][0];
        res.end(JSON.stringify({data, prev, next, msg: "成功", code: 0}));
    })
})

router.post('/log/getLogComment', function(req, res, next){
    var id = req.body.id;
    var sql = 'SELECT * FROM `fh_log` INNER JOIN fh_log_c ON fh_log_c.lc_pid=fh_log.l_id WHERE l_id='+id;
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

router.post('/log/userComment', function(req,res, next){
    var lc_pid = req.body.lc_pid;
    var lc_name = req.body.lc_name;
    var lc_img = req.body.lc_img;
    var lc_content = req.body.lc_content;
    var lc_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress) + "";
    var lc_system = os.type();
    var lc_time = Date.parse(new Date()) / 1000;
    var sql = 'INSERT INTO fh_log_c(lc_pid,lc_name,lc_img,lc_content,lc_ip,lc_system,lc_time) VALUES(?,?,?,?,?,?,?)';
    var addSqlParams = [lc_pid,lc_name,lc_img,lc_content,lc_ip,lc_system,lc_time];
    db.insert(sql,addSqlParams,function(err,result){
        if (err) return;
        res.end(JSON.stringify({id:addSqlParams, msg: "成功", code: 0}))
    })
})

module.exports = router; 
