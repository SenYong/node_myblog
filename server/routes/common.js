var express = require('express');
var router =  express.Router();
var db = require('../database/mysql.js');

//最新文章
router.post('/common/newArt',function(req, res, next){
   var sql = 'SELECT * FROM `fh_article` order by pid desc limit 0,10';
   db.query(sql, function(err, result){
      if(err) return;
      res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
   })
})

//最新日志
router.post('/common/newLog', function(req, res, next){
    var sql = 'SELECT * FROM `fh_log` order by l_time desc limit 0,6';
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功",  code: 0})); 
    })
})

//最新说说
router.post('/common/newSay', function(req, res, next){
    var sql = 'SELECT * FROM `fh_say` order by s_time limit 0,6';
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

//文章点击排行
router.post('/common/artRanking', function(req, res, next){
    var sql = 'SELECT * FROM `fh_article` INNER JOIN fh_cat ON fh_article.pid = fh_cat.c_id order by a_hit desc LIMIT 0,5';
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

//获取个人信息
router.post('/common/getInfo', function(req, res, next){
    var sql = 'SELECT * FROM `fh_system` LIMIT 0,1';
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

//获取最新文章评论3条
router.post('/common/newArtComment', function(req, res, next){
    var sql = 'SELECT * FROM `fh_article` INNER JOIN fh_article_c ON fh_article.a_id=fh_article_c.ac_pid ORDER BY ac_time desc LIMIT 0,3';
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

//获取说说图片
router.post('/common/getSayImg', function(req, res, next){
    var sql = 'SELECT s_img,s_id FROM `fh_say`';
    db.query(sql, function(err, result){
        if(err) return;
        res.end(JSON.stringify({data: result, msg: "成功", code: 0}));
    })
})

module.exports = router; 