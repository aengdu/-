const express=require('express')
const app=express()
const server=require("http").createServer(app)
const port=3001
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
/*
      bind (ip,port) => 개통
           === ====
           전화번호 , 연결선
      listen => 대기상태
      accept => 클라이언트가 접속
      read => 요청받기
      write => 응답하기
 */
server.listen(port,()=>{
    console.log("Chat Server Start...")
})
const socketio=require('socket.io')(server)
// socket ==> 전화기
//const io=socketio.listen(server)

// 요청
socketio.on('connection',(socket)=>{
    socket.on('chat-msg',(msg)=>{
        console.log(msg)
        socketio.emit('chat-msg',msg)
    })
})