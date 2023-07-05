var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');


/* GET login page. */
router.get('/', DB.checkAuth, async function(req, res) {
    const orders =  await DB.getOrders()
    console.log('orders from DB:',orders)
    const thisUser = DB.getLogginUser()
    console.log('thisUser from DB:',thisUser)
    const thisUserOrders = []
    orders.forEach(order => {
        if(order.forUserId==thisUser.user_id){
            thisUserOrders.push(order)   
        }
    });
console.log('thisUserOrders',thisUserOrders)
    res.render('personal',{orders: thisUserOrders});
});


module.exports = router;