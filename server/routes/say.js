var express = require('express');
var router = express.Router();
var os = require("os");
var db = require('../database/mysql.js');

router.post('/say/getSayList', function(req, res, next){
    if(!Number.isInteger(req.body.page) || !Number.isInteger(req.body.num)){
        res.end(JSON.stringify({msg:"请传入参数", code: 102 }));
        return;
    }
    var start = req.body.page * req.body.num;
    var sql = 'SELECT * FROM `fh_say` order by s_id desc limit ' + start + ',' + req.body.num + ';' + 'SELECT count(*) as num FROM `fh_say`;'
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    }) 
})

router.post('/say/sayDetail', function(req, res, next){
    var id = req.body.id;
    var sql = 'SELECT * FROM `fh_say` WHERE s_id=' + id + ';'
    var sqlPrev = 'SELECT * FROM `fh_say` WHERE s_id=(SELECT s_id FROM fh_say WHERE s_id<'+id+' LIMIT 1);'
    var sqlNext = 'SELECT * FROM `fh_say` WHERE s_id=(SELECT s_id FROM fh_say WHERE s_id>'+id+' LIMIT 1);'
    var sqlSetInc = 'UPDATE fh_say SET s_hit=s_hit+1 WHERE s_id='+id+';'
    db.query(sql+sqlPrev+sqlNext+sqlSetInc, function(err, result){
        if(err) return;
        var data = result[0][0];
        var prev = result[1][0];
        var next = result[2][0];
        res.end(JSON.stringify({data, prev, next, msg: "成功", code: 0}));
    })
})

router.post('/say/getSayComment', function(req, res, next){
    var id = req.body.id;
    var sql = 'SELECT * FROM `fh_say` INNER JOIN fh_say_c ON fh_say_c.sc_pid=fh_say.s_id WHERE s_id='+id;
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

router.post('/say/userComment', function(req,res, next){
    var sc_pid = req.body.sc_pid;
    var sc_name = req.body.sc_name;
    var sc_img = req.body.sc_img;
    var sc_content = req.body.sc_content;
    var sc_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress) + "";
    var sc_system = os.type();
    var sc_time = Date.parse(new Date()) / 1000;
    var sql = 'INSERT INTO fh_say_c(sc_pid,sc_name,sc_img,sc_content,sc_ip,sc_system,sc_time) VALUES(?,?,?,?,?,?,?)';
    var addSqlParams = [sc_pid,sc_name,sc_img,sc_content,sc_ip,sc_system,sc_time]
    db.insert(sql,addSqlParams,function(err,result){
        if (err) return;
        res.end(JSON.stringify({id:addSqlParams, msg: "成功", code: 0}))
    })
})


module.exports = router
