// import io from 'socket.io-client'
// const { io } = require("socket.io-client");

const socket = io('http://localhost:3000/');
var toUserId=""
socket.on('connect', function(){
    console.log('i have connected!')
})
var loggedInUser = null
var clients=[];
var usersConnected=[];
socket.on('newClient',(clientID)=>{
    clients.push(clientID);
    console.log('clients array from on.newClient :',clients)
});
// socket.on('inMsg',(msg)=>{
socket.on('inMsg',(msg)=>{
    console.log('msg on socket.io  :',msg)
    const p=document.createElement('p');
    p.textContent = msg;
    document.getElementById('msgs').appendChild(p);
});
socket.on('usersConnections',(usersConnections)=>{
    usersConnected = usersConnections
    console.log('usersConnections  on.usersConnections ::',usersConnected)
    console.log('clients from on.usersConnections :',clients)
    

    //remove all nods on this ele,emt to prevent duplications
    const myNode = document.getElementById("usersForChatId");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    myNode.innerText="Login Users"
    for(let i =0;i<usersConnected.length;i++){
        const p=document.createElement('li');
        p.innerText = usersConnected[i].user.fullname;
        p.id = usersConnected[i].user.user_id;
        p.style.cursor="pointer"
        p.style.padding="10px"
        p.setAttribute("onclick","choosUser(this);");
        document.getElementById('usersForChatId').appendChild(p);
    }
});


//Chat :
myform.onsubmit = sendMsg=(e)=>{
    e.preventDefault()
    const myMsg = myform.txt.value
    console.log('chat msg :',   myMsg)
    console.log('to  toUserId:',   toUserId)
    console.log('to  clients:',   clients)
    socket.emit('myMsg',{to : toUserId,content : myMsg})
}

// myForm.onsubmit = (e)=>{
// e.preventDefault();
// socket.emit('myMsgRoom',myForm.msg.value)

// }




















// socket.on('myBroadcast', function(data){
//     console.log(data)


// })
// socket.on('stopMyBroadcast', function(data){
//     console.log('stop!')
//     socket.removeAllListeners('myBroadcast');
// })
// socket.emit('myEvent', 'myData :)')
// // socket.on('function',data=>{
// //     console.log(eval(data.myFunc));
// // })
// socket.on('html',data=>{
//     document.body.innerHTML += data;
// })
// socket.on('htmlObj',({elm,textContent})=>{
//     const elmP = document.createElement(elm);
//     elmP.textContent = textContent;
//     document.body.appendChild(elmP);
// })


// setInterval(() => {  }, 1000);