var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/user', function(req, res, next) {
    res.json({
        code:'0000',
        message:'登陆成功',
        data:{

        }
    })
});

/* 路由重定向 */
router.get('/*', function (req, res, next) {
  res.render('index', {});
});

module.exports = router;
