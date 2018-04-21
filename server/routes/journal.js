var express = require('express');
var router = express.Router();
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


module.exports = router; 
