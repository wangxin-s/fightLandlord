const socket = require('socket.io-client')('http://localhost:3001');//{'reconnect':false,'auto connect':false}

// 获取用户登录后  后端返回监听
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

// 用户申请进入房间  后端返回监听
let goRoomObject = {
    callBack:function() {}
};
socket.on('goRoom', (data) => {
    goRoomObject.callBack(data)
   
});


// 用户申请退出房间  后端返回监听
let outRoomObject = {
    callBack:function() {}
}
socket.on('outRoom', (data) => {
    outRoomObject.callBack(data)
});


// 进入房间获取当前房间玩家数据  后端返回监听
let getRoomPlayerInfoObject = {
    callBack:function() {}
}
socket.on('getRoomPlayerInfo',(data) => {
    getRoomPlayerInfoObject.callBack(data)
})


// 当前房间玩家操作  准备  后端返回监听
let readyObject = {
    callBack:function() {}
}
socket.on('ready',(data) => {
    readyObject.callBack(data)
})

// 所有玩家都已准备 发牌数据更新 给只在当前房间的所有用户发送  后端返回监听
let LicensingObject = {
    callBack:function() {}
}
socket.on('Licensing',(data) => {
    LicensingObject.callBack(data)
})


// 玩家是否抢地主  后端返回监听
let isPlayLandlordObject = {
    callBack:function() {}
}
socket.on('isPlayLandlord',(data) => {
    isPlayLandlordObject.callBack(data)
})


// 当前玩家是否出牌

let isPlayCardObject = {
    callBack:function() {}
}
socket.on('isPlayCard',(data) => {
    isPlayCardObject.callBack(data)
})

// 用户出牌后 清除当前玩家卡牌是否选择 及出牌控制  true：选中  out：出牌

let clearCardStatusArrObject = {
    callBack:function() {}
}
socket.on('clearCardStatusArr',(data) => {
    clearCardStatusArrObject.callBack(data)
})

// gameOver  游戏结束

let gameOverObject = {
    callBack:function() {}
}
socket.on('gameOver',(data) => {
    gameOverObject.callBack(data)
})












export {
    socket,
    loginObject,
    getHallInfoObject,
    goRoomObject,
    outRoomObject,
    getRoomPlayerInfoObject,
    readyObject,
    LicensingObject,
    isPlayLandlordObject,
    isPlayCardObject,
    clearCardStatusArrObject,
    gameOverObject,
}