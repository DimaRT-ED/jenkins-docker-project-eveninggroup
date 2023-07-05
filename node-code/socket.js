var http = require('http');
const { DB } = require('./services/db');
const { Server } = require("socket.io");

class MyServer {

    constructor(app) {
        this.server = http.createServer(app);
        this.io = new Server(this.server);
        this.initListeners();
        return this.server;
    }


    initListeners = () => {
        this.io.on('connection', (client) => {
            const clientId = client.id
            console.log('client Id :',clientId);
            client.broadcast.emit('newClient', client.id);

            client.on('myMsg', ({to,content}) => {
                console.log("myMsg on server  to :",to)
                console.log("myMsg on server  content :",content)
                client.to(to).emit('inMsg',content)
            })
            client.on('myMsgRoom', (content) => {
                console.log(content)
                client.to('myRoom').emit('inMsg',content)
            })
            client.on('user-loggedIn', (content) => {
                console.log('uuser-loggedIn',content)
                const loggedInUser =  {
                    socketId :clientId,
                    user : content
                }
                DB.setLogginUsers(loggedInUser)
                const users = DB.getLogginUsers()
                console.log(' this.usersConnections) :', users);
                client.broadcast.emit('usersConnections', users);
            })


















            // setTimeout(()=>{console.log('s');client.broadcast.emit('stopMyBroadcast')},8000)
            // setInterval(()=>{console.log('1');client.broadcast.emit('myBroadcast','some data')},2000)
            // client.on('disconnect', () => {
            //     console.log('disconnected'+client.id)
            // })
            // client.emit('function',{myFunc:`;(function tst(){
            //     console.log('func');
            //     console.log(someVar)

            // })();`});
            // client.emit('html',`
            // <p>This is some text from the server</p>
            // `);
            // client.emit('htmlObj',{elm:'p',textContent:"this is some text from server - by object"});

            // client.on('myEvent', (data) => {
            //     console.log(data);
            // });
        });
    }
}



module.exports = { MyServer };