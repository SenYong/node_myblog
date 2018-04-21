var express = require('express');
var router = express.Router();
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

router.post('/say/getSayComment', function(req, res, next){
    var id = req.body.id;
    var sql = 'SELECT * FROM `fh_article` INNER JOIN fh_article_c ON fh_article_c.ac_pid=fh_article.a_id WHERE a_id='+id;
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

module.exports = router
