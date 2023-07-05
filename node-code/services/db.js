const { todoModel } = require('../models/todo');
const { reastaurantModel } = require('../models/restaurant');
var express = require('express');
var router = express.Router();
const jsonwebtoken = require ('jsonwebtoken');   // creat token 
const { response } = require('express');


class DB {
    loggedInUser = null
    loggedInUsers = []
    usersConnections = []
    usersConnectionsCounter = []
    secret = 'bestApp'
    checkAuth=(req,res,next)=>{
        console.log('req.cookiessssssssssssssssssssssssssssssssssssssssss',req.cookies)
        const token  = req.cookies['mycookie'];
        var answer = null
        try{
            answer = jsonwebtoken.verify(token, this.secret )
            console.log('answer after checkAuth token', answer)
            if(answer){
                console.log('token ok' )
                return next()
            }else{
                console.log('token not ok',answer )
                // res.json({status : false,  msg : 'you shall not pass!'})
                res.write( 'you shall not pass!')
            }
        }catch{
            console.log('token not ok' )
            res.write(`<h1 style="color:#971f1f; padding:30px;font-size:xx-large; display:flex; justify-content:center;align-items: center;">YOU CAN NOT PASS!  <div style=" color:black ; padding:30px"> You need to Log-In first</div></h1>`)
            //res.json({msg : 'you shall not pass!'})
        }
    }
    async addUser({ fullname, username,password }) {
       // title = this.sanitize(title);
        try {
            console.log('{ fullname, username,password }',{ fullname, username,password })
            const [id]=await reastaurantModel('user').insert({ fullname, username,password });
            // const [addedTask] = await todoModel('todo')
            // .select('title','status','todo_id as id')
            // .where({todo_id:id});
            // return { status: true, data:  addedTask};
        } catch (e) {
            console.log(e);
            return { status: false, err: e.message }
        }
    }
    async login(user){ 
        const [loggedInUser]  =  await reastaurantModel('user').select('*').where({username:user.username })
        return  loggedInUser
    }
    setLogginUsers=(loggedInUser)=>{
                this.usersConnectionsCounter.push(loggedInUser)            
    //             //   console.log('usersConnections',usersConnections) 
                    const ans = this.usersConnections.some(oldUser=>{
                        // console.log(' oldUser  (on DB setusers):  ', oldUser);
                        // console.log('loggedInUser (on DB setusers) :  ', loggedInUser);
                        // console.log(' oldUser.user_id (on DB setusers):  ', oldUser.user_id);
                        // console.log('loggedInUser.user_id  (on DB setusers):  ', loggedInUser.user_id);
                            return (oldUser.user.user_id===loggedInUser.user.user_id )
                    })
                    console.log(' ans on  setlogginuser on DB : ', ans );
                    console.log(' this.usersConnections on  setlogginuser on DB : ', this.usersConnections );
                        if(!ans) {
                            this.usersConnections.push(loggedInUser)
                        }
    }
    getLogginUsers=()=>{
        return  this.usersConnections
    }
    getLogginUser=()=>{
        return  this.loggedInUser
    }
    async addOrder(order) {
        try {
            const forUserId = this.loggedInUsers[0].user_id
          //  console.log('this.loggedInUser',this.loggedInUser);
            console.log('user_id',forUserId);
            console.log('newOrder================>',order);
            const smallhandcutfries = order[0].amount
            const largHandCutFries = order[1].amount
            const sweetPotatoFries = order[2].amount
            const chickenTenders = order[3].amount
            const cheeseWedges = order[4].amount
            const beerBatteredMushrooms = order[5].amount
            const breadedZucchiniPlanks = order[6].amount
            const chessyBreadStickes = order[7].amount
            const cheeseSlice = order[8].amount
            const vegetableSlice = order[9].amount
            const pepperoniSlice = order[10].amount
            const mushroomSlice = order[11].amount
            const dailyVegetarianSlice = order[12].amount
            const dailyMeatLoversSlice = order[13].amount
            console.log('beerBatteredMushrooms',beerBatteredMushrooms);
           // console.log('newOrder.orders[0]',newOrder.orders[0]);
            const [id]=await reastaurantModel('order').insert({smallhandcutfries, largHandCutFries,sweetPotatoFries,chickenTenders,cheeseWedges,beerBatteredMushrooms,breadedZucchiniPlanks, chessyBreadStickes, cheeseSlice,vegetableSlice,pepperoniSlice,mushroomSlice,dailyVegetarianSlice,dailyMeatLoversSlice, forUserId});
            // const [addedTask] = await reastaurantModel('order')
            // .select('title','status','todo_id as id')
            // .where({todo_id:id});
            return  'ffds';
            //  return { status: true, order:  order};
        } catch (e) {
            console.log(e);
            return { status: false, err: e.message }
        }
    }

    async getOrders(){
            const orders = await reastaurantModel('order')
            return orders
    }







/************************** TODO ***************************** */


    async getAllTodos() {
        return await todoModel('todo')
        .select('title','status','todo_id as _id')
        .where({status: 0});
    }
    async getTaskById(todo_id){
        return await todoModel('todo')
        .where({todo_id});
    }
    async addTodo({ title, status = false }) {
        title = this.sanitize(title);
        try {
            const [id]=await todoModel('todo').insert({ title, status });
            const [addedTask] = await todoModel('todo')
            .select('title','status','todo_id as id')
            .where({todo_id:id});
            return { status: true, data:  addedTask};

        } catch (e) {
            console.log(e);
            return { status: false, err: e.message }
        }
    }
    async removeTodo(todo_id){
        try {
            return await todoModel('todo')
            .where({todo_id})
            .del();
        } catch (e) {
            console.log(e);
            return { status: false, err: e.message }
        }
    }
    // UPDATE 
    async updateTodo(todo){
        console.log('todo on update, front file :',todo.title)
        const mytitle = todo.title
        try {
            return await todoModel('todo')
            .update({title:mytitle})
            .where({todo_id:todo._id});
            
        }catch (e) {
            console.log(e);
            return { status: false, err: e.message }
        }
}
    sanitize(inp) {
        return inp.replace(/<script>/g, '')
    }
}

module.exports = { DB: new DB() }