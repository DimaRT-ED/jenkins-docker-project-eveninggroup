var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');


/* GET login page. */
router.get('/', async function(req, res) {
    res.render('register');
});
// ADD Todo
router.post('/', async function(req, res, next) {
    console.log('req.body: ', req.body)
    res.send(JSON.stringify( await DB.addUser(req.body)))
})

module.exports = router;