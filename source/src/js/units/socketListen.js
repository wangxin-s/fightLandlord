const socket = require('socket.io-client')('http://localhost:3001');//{'reconnect':false,'auto connect':false}

// 获取用户登录后  后端返回数据
let loginObject = {
    callBack: function() {}
}
socket.on('login',(data)=> {
    loginObject.callBack(data)
})

// 获取大厅房间最新实时数据
let getHallInfoObject = {
    callBack:function() {}
}
socket.on('getHallInfo', (data) => {
    getHallInfoObject.callBack(data)
    
});

// 用户申请进入房间  后端返回数据
let goRoomObject = {
    callBack:function() {}
};
socket.on('goRoom', (data) => {
    goRoomObject.callBack(data)
   
});


// 用户申请退出房间  后端返回数据
let outRoomObject = {
    callBack:function() {}
}
socket.on('outRoom', (data) => {
    outRoomObject.callBack(data)
});















export {
    socket,
    loginObject,
    getHallInfoObject,
    goRoomObject,
    outRoomObject,
}