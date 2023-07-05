var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');
const jsonwebtoken = require ('jsonwebtoken')   // creat token 
const secret = "bestApp"


/* GET login page. */
router.get('/', async function(req, res) {
    console.log('req.body: ', req.body)
    res.render('login');
});

// Login User
router.post('/', async function(req, res, next) {
    console.log('req.body on login: ', req.body)
    try{
        const userFromDB = await DB.login(req.body)
        console.log('after Login ',userFromDB ) 
        const num = userFromDB.password.localeCompare(req.body.password);
        console.log('is password equal ?  ', num  )
        // password OK
        if (num==0){
            console.log('num ==0')
            const token = jsonwebtoken.sign(userFromDB, secret,{expiresIn: '1h'}  )
            console.log('the token after encrypt : ',token )
            DB.loggedInUser = userFromDB
            DB.loggedInUsers.unshift(userFromDB) 
            res.cookie('mycookie',token,{
                secure:true,
                httpOnly : true, 
                maxAge: 6*60*60*1000,
                sameSite: true
            })
            res.send(JSON.stringify({permission: true, user: userFromDB}))
           // res.send({permission: true, user: userFromDB})
        //password Wrong
        }else{
            console.log('num !=0')
            res.send(JSON.stringify( {permission: false, user : null} ))
        }
    }catch(err){
        console.log('Error from DB on login :  ', err  )
        res.send(JSON.stringify( {
            permission: false,
            user : null
        } ))
    }
})

// TODO - logOut
router.post('/logout', async function(req, res, next) {
})

module.exports = router;