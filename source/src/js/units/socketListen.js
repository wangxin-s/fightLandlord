const socket = require('socket.io-client')('http://localhost:3001');//{'reconnect':false,'auto connect':false}

// 用户申请进入房间  后端返回数据
let goRoomObject = {
    callBack:function(){
        
    }
};
socket.on('goRoom', (data) => {
    goRoomObject.callBack(data)
   
});















export {
    socket,
    goRoomObject
}