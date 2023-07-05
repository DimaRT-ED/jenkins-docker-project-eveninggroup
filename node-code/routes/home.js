var express = require('express');
var router = express.Router();
const { DB } = require('../services/db');
// const todo = new Todo();

/* GET home page. */
router.get('/',async function(req, res, next) {
    const todosFromDB =  await DB.getAllTodos()
    console.log('todosFromDB :',todosFromDB)
    res.render('index', { todos: todosFromDB , title: 'Express with ejs' });
  
});
// ADD Todo
router.post('/',   async function(req, res, next) {
    console.log('req.body: ', req.body)
    res.send(JSON.stringify( await DB.addTodo(req.body)))
})
//DELETE
router.delete('/',  async (req, res, next) => {
    const { _id } = req.body;
    console.log('_id : ',_id)
    res.send(JSON.stringify(await DB.removeTodo(_id)));
})

//UPDATE
router.put('/',  async (req, res, next) => {
   // const { _id } = req.body;
    console.log('req.body UPDATE , home.js file: ',req.body)
    const ans = JSON.stringify(await DB.updateTodo(req.body))
    console.log(' returned updateTodo on home : ', ans  )
    // res.send(JSON.stringify(await DB.updateTodo(_id)));
})
module.exports = router;
