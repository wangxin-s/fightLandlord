var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 路由重定向 */
router.get('/*', function (req, res, next) {
  res.render('index', {});
});

module.exports = router;
