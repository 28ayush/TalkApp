const express=require('express')
const app=express();
const http=require('http').createServer(app)

http.listen(3000,()=>{
    console.log(`listening on port ...3000`);
})
app.use(express.static(__dirname));
app.get('/',(res,req)=>{
    res.sendFile(__dirname+'/index.html')
})

//socket

const io=require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log("connected...")
    
    socket.on('message',(msg)=>{
        
        socket.broadcast.emit('message',msg);
        
    })
})