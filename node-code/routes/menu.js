var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');


/* GET login page. */
router.get('/', DB.checkAuth , async function(req, res) {
    res.render('menu');
});


module.exports = router;