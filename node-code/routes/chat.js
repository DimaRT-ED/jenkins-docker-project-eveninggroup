var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');

/* GET login page. */
router.get('/',DB.checkAuth, async function(req, res) {
   const users =  DB.getLogginUsers()
   console.log('users on chat.js from DB : ',users)
    res.render('chat',{ myusers: users });
});


module.exports = router;