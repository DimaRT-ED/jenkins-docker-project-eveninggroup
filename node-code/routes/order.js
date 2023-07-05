var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');

/* GET login page. */
router.get('/', DB.checkAuth ,async function(req, res) {
    const user = DB.getLogginUser()
    res.render('order', { loggedInUser: user });
});
router.post('/', async function(req, res, next) {
    console.log('req.body: ', req.body)
   // res.send('hello drom order')
    res.send(JSON.stringify( await DB.addOrder(req.body)))
  // res.send('dfg')
})

module.exports = router;