var express = require('express');
var router = express.Router();
var os = require('os');
var db = require('../database/mysql.js');

router.post('/board/getBoardComment', function(req, res, next){
    var id = req.body.id;
    var sql = 'SELECT * FROM `fh_board`';
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

router.post('/board/userComment', function(req,res, next){
    var b_name = req.body.b_name;
    var b_img = req.body.b_img;
    var b_content = req.body.b_content;
    var b_time = Date.parse(new Date()) / 1000;
    var b_ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress) + "";
    var b_system = os.type();
    var sql = 'INSERT INTO fh_board(b_name,b_img,b_content,b_time,b_ip,b_system) VALUES(?,?,?,?,?,?)';
    var addSqlParams = [b_name,b_img,b_content,b_time,b_ip,b_system];
    db.insert(sql,addSqlParams,function(err,result){
        if (err) return;
        res.end(JSON.stringify({id:addSqlParams, msg: "成功", code: 0}))
    })
})

module.exports = router; 