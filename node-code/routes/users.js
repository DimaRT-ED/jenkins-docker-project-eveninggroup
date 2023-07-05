var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');

/* GET users listing. */
router.get('/', DB.checkAuth,function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
