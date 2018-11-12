/**
 * Created by ex-wangxin on 2018/9/13.
 */
var connect = require("./connect");
var io = require('../app').io;

var sendData = {
    code: 200,
    msg: '登录成功'
}

// let Cards = [
//     { icon: 53, type: '0', val: 17 },
//     { icon: 52, type: '0', val: 16 },
//     { icon: 44, type: '1', val: 14 },
//     { icon: 48, type: '1', val: 15 },
//     { icon: 0, type: '1', val: 3 },
//     { icon: 4, type: '1', val: 4 },
//     { icon: 8, type: '1', val: 5 },
//     { icon: 12, type: '1', val: 6 },
//     { icon: 16, type: '1', val: 7 },
//     { icon: 20, type: '1', val: 8 },
//     { icon: 24, type: '1', val: 9 },
//     { icon: 28, type: '1', val: 10 },
//     { icon: 32, type: '1', val: 11 },
//     { icon: 36, type: '1', val: 12 },
//     { icon: 40, type: '1', val: 13 },
//     { icon: 45, type: '2', val: 14 },
//     { icon: 49, type: '2', val: 15 },
//     { icon: 1, type: '2', val: 3 },
//     { icon: 5, type: '2', val: 4 },
//     { icon: 9, type: '2', val: 5 },
//     { icon: 13, type: '2', val: 6 },
//     { icon: 17, type: '2', val: 7 },
//     { icon: 21, type: '2', val: 8 },
//     { icon: 25, type: '2', val: 9 },
//     { icon: 29, type: '2', val: 10 },
//     { icon: 33, type: '2', val: 11 },
//     { icon: 37, type: '2', val: 12 },
//     { icon: 41, type: '2', val: 13 },
//     { icon: 46, type: '3', val: 14 },
//     { icon: 50, type: '3', val: 15 },
//     { icon: 2, type: '3', val: 3 },
//     { icon: 6, type: '3', val: 4 },
//     { icon: 10, type: '3', val: 5 },
//     { icon: 14, type: '3', val: 6 },
//     { icon: 18, type: '3', val: 7 },
//     { icon: 22, type: '3', val: 8 },
//     { icon: 26, type: '3', val: 9 },
//     { icon: 30, type: '3', val: 10 },
//     { icon: 34, type: '3', val: 11 },
//     { icon: 38, type: '3', val: 12 },
//     { icon: 42, type: '3', val: 13 },
//     { icon: 47, type: '4', val: 14 },
//     { icon: 51, type: '4', val: 15 },
//     { icon: 3, type: '4', val: 3 },
//     { icon: 7, type: '4', val: 4 },
//     { icon: 11, type: '4', val: 5 },
//     { icon: 15, type: '4', val: 6 },
//     { icon: 19, type: '4', val: 7 },
//     { icon: 23, type: '4', val: 8 },
//     { icon: 27, type: '4', val: 9 },
//     { icon: 31, type: '4', val: 10 },
//     { icon: 35, type: '4', val: 11 },
//     { icon: 39, type: '4', val: 12 },
//     { icon: 43, type: '4', val: 13 }
// ];
// let cards = Cards.slice(0);
// let self = {
//     ONE: 1,
//     PAIRS: 2,
//     THREE: 3,
//     THREE_WITH_ONE: 4,
//     THREE_WITH_PAIRS: 5,
//     PROGRESSION: 6,
//     PROGRESSION_PAIRS: 7,
//     PLANE: 8,
//     PLANE_WITH_ONE: 9,
//     PLANE_WITH_PAIRS: 10,
//     FOUR_WITH_TWO: 11,
//     FOUR_WITH_TWO_PAIRS: 12,
//     BOMB: 13,
//     KING_BOMB: 14,
// }
// let maxCard = [];//当前牌面上最大的牌
// let one = [], two = [], three = [], hiddenCards = [];










// 大厅房间初始数据(默认4个房间)
var hallData = [
    {
        roomId: 1,
        FieldMark: '',//字段标记  便于当前房间再有全局新增或删除字段ctrl+D统一增减 无实质意义
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        subStatus: '',//子状态=> 抢地主
        is_playLandlord: [],//谁是地主  
        playerLandlordNum: 0,//叫地主 抢地主次数
        leftPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',//当前用户创建时间  可用作当前用户新增或删除字段ctrl+D统一增减
            seat: '',//当前玩家的位置  进入大厅赋值 返回给前端缓存
            is_ready: '',//当前玩家是否准备
            cardData: [],//当前玩家  卡牌数据源
            playLandlord: 'false',//当前谁在抢地主
            isPlayLandlordTitle: '',//存储当前玩家是否叫地主 仅给前端做页面展示
            playCard: 'false',//当前是谁在出牌
            showOutCardIcon: [],//当前玩家  上一轮出牌操作 (已出的牌||不出) Icon 用作前端展示
            showOutCardVal: [],//当前玩家  上一轮出牌操作 (已出的牌||不出) Val  用作比牌
        },
        rightPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        bottomPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        }
    },
    {
        roomId: 2,
        FieldMark: '',
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        subStatus: '',
        is_playLandlord: [],
        playerLandlordNum: 0,
        leftPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        rightPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        bottomPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        }
    },
    {
        roomId: 3,
        FieldMark: '',
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        subStatus: '',
        is_playLandlord: [],
        playerLandlordNum: 0,
        leftPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        rightPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        bottomPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        }
    },
    {
        roomId: 4,
        FieldMark: '',
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        subStatus: '',
        is_playLandlord: [],
        playerLandlordNum: 0,
        leftPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        rightPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        bottomPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready: '',
            cardData: [],
            playLandlord: 'false',
            isPlayLandlordTitle: '',
            playCard: 'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        }
    },
]

// 实时大厅房间数据源  返回前端
var newHallData = [];

// 最新实时大厅房间数据获取方法
function getHallData() {
    // 先清空数据源
    newHallData.length = 0;
    // 循环判断  返回前4个有空位的房间
    for (var i = 0; i < hallData.length; i++) {
        if (newHallData.length >= 4) {
            break;
        }
        if (hallData[i].status == 'Licensing' || hallData[i].leftPlayer.id && hallData[i].rightPlayer.id && hallData[i].bottomPlayer.id) {
            // 当前房间中三名玩家都已准备 已进入到发牌阶段 || 当前房间人数已满    这个房间就不显示在大厅中
        } else {
            newHallData.push(hallData[i])
        }
    }

    // 如果当前有空位房间不足4个 新建空房间
    function is_newHallData() {
        if (newHallData.length < 4) {
            var addRoom = {
                roomId: hallData.length + 1,
                FieldMark: '',
                landlordCard: [],//地主牌数据源
                status: 'ready',//房间内当前进行到哪一步 状态
                subStatus: '',
                is_playLandlord: [],
                playerLandlordNum: 0,
                leftPlayer: {
                    id: '',
                    account: '',
                    password: '',
                    headImg: '',
                    creation_date: '',
                    seat: '',
                    is_ready: '',
                    cardData: [],
                    playLandlord: 'false',
                    isPlayLandlordTitle: '',
                    playCard: 'false',
                    showOutCardIcon: [],
                    showOutCardVal: [],
                },
                rightPlayer: {
                    id: '',
                    account: '',
                    password: '',
                    headImg: '',
                    creation_date: '',
                    seat: '',
                    is_ready: '',
                    cardData: [],
                    playLandlord: 'false',
                    isPlayLandlordTitle: '',
                    playCard: 'false',
                    showOutCardIcon: [],
                    showOutCardVal: [],
                },
                bottomPlayer: {
                    id: '',
                    account: '',
                    password: '',
                    headImg: '',
                    creation_date: '',
                    seat: '',
                    is_ready: '',
                    cardData: [],
                    playLandlord: 'false',
                    isPlayLandlordTitle: '',
                    playCard: 'false',
                    showOutCardIcon: [],
                    showOutCardVal: [],
                }
            }
            hallData.push(addRoom)
            newHallData.push(addRoom)
            is_newHallData()
        }
    }
    is_newHallData()
    return newHallData;
}

// 所有卡牌 数据源 
let Cards = [
    { icon: 53, val: 16 },//小王
    { icon: 54, val: 17 },//大王

    { icon: 1, val: 14 },
    { icon: 2, val: 15 },
    { icon: 3, val: 3 },
    { icon: 4, val: 4 },
    { icon: 5, val: 5 },
    { icon: 6, val: 6 },
    { icon: 7, val: 7 },
    { icon: 8, val: 8 },
    { icon: 9, val: 9 },
    { icon: 10, val: 10 },
    { icon: 11, val: 11 },
    { icon: 12, val: 12 },
    { icon: 13, val: 13 },

    { icon: 14, val: 14 },
    { icon: 15, val: 15 },
    { icon: 16, val: 3 },
    { icon: 17, val: 4 },
    { icon: 18, val: 5 },
    { icon: 19, val: 6 },
    { icon: 20, val: 7 },
    { icon: 21, val: 8 },
    { icon: 22, val: 9 },
    { icon: 23, val: 10 },
    { icon: 24, val: 11 },
    { icon: 25, val: 12 },
    { icon: 26, val: 13 },

    { icon: 27, val: 14 },
    { icon: 28, val: 15 },
    { icon: 29, val: 3 },
    { icon: 30, val: 4 },
    { icon: 31, val: 5 },
    { icon: 32, val: 6 },
    { icon: 33, val: 7 },
    { icon: 34, val: 8 },
    { icon: 35, val: 9 },
    { icon: 36, val: 10 },
    { icon: 37, val: 11 },
    { icon: 38, val: 12 },
    { icon: 39, val: 13 },

    { icon: 40, val: 14 },
    { icon: 41, val: 15 },
    { icon: 42, val: 3 },
    { icon: 43, val: 4 },
    { icon: 44, val: 5 },
    { icon: 45, val: 6 },
    { icon: 46, val: 7 },
    { icon: 47, val: 8 },
    { icon: 48, val: 9 },
    { icon: 49, val: 10 },
    { icon: 50, val: 11 },
    { icon: 51, val: 12 },
    { icon: 52, val: 13 },
];

// 洗牌
function actionLicensing() {
    // //洗牌即是打乱数组顺序
    let len = Cards.length;
    for (let i = 0; i < len; i++) {
        let index = Math.floor(Math.random() * (len - i));
        let temp = Cards[index];
        Cards[index] = Cards[len - i - 1];
        Cards[len - i - 1] = temp;
    }
    return Cards;
}

// 卡牌  排序
function cardSort(a, b) {
    return b.val - a.val;
}

// 游戏结束 当前房间数据重置 但保留玩家信息
function gameOverClear(i) {
    hallData[i].landlordCard = [];
    hallData[i].status = 'ready';
    hallData[i].subStatus = '';
    hallData[i].is_playLandlord = [];
    hallData[i].playerLandlordNum = 0;

    let playerArr = ['leftPlayer', 'bottomPlayer', 'rightPlayer'];
    for (let j = 0; j < playerArr.length; j++) {
        hallData[i][playerArr[j]].is_ready = '';
        hallData[i][playerArr[j]].cardData = [];
        hallData[i][playerArr[j]].playLandlord = 'false';
        hallData[i][playerArr[j]].isPlayLandlordTitle = '';
        hallData[i][playerArr[j]].playCard = 'false';
        hallData[i][playerArr[j]].showOutCardIcon = [];
        hallData[i][playerArr[j]].showOutCardVal = [];
    }
}

exports.websocket = function websocket(socket) {
    // 用户登录
    socket.on('login', (data) => {
        let num = parseInt(Math.random() * 10000);
        let sql = 'select * from users where account=' + '"' + data.account + '"';
        let insert = "INSERT INTO `test`.`t_player` (`party_id`, `player_name`, `player_card`, `room_id`, `player_pwd` ,`player_status`) VALUES ('YH" + num + "', '" + data.account + "', null, null, '" + data.password + "','Y')";
        connect.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            if (result.length > 0) {
                if (result[0].password === data.password) {
                    sendData.code = 200;
                    sendData.msg = '登陆成功';
                    sendData.data = result[0]
                    socket.emit('login', sendData);
                    return;
                } else {
                    sendData.code = 201;
                    sendData.msg = '密码错误';
                    socket.emit('login', sendData);
                    return;
                }
            } else {
                sendData.code = 201;
                sendData.msg = '账号不存在';
                socket.emit('login', sendData);
                return;
            }
        })
    });

    //获取最新大厅房间数据
    socket.on('getHallInfo', (data) => {
        let serverData = getHallData();
        sendData.code = 200;
        sendData.msg = '大厅房间数据请求成功';
        sendData.data = serverData;
        socket.emit('getHallInfo', sendData);
    });

    //玩家点击进入房间
    socket.on('goRoom', (data) => {
        for (let i = 0; i < hallData.length; i++) {
            if (hallData[i].roomId == data.roomId) {
                if (hallData[i].leftPlayer.id && hallData[i].rightPlayer.id && hallData[i].bottomPlayer.id) {
                    sendData.code = 201;
                    sendData.msg = '当前房间已满 换个房间试试';
                    socket.emit('goRoom', sendData);
                    break;
                }

                if (hallData[i][data.seat].id) {
                    sendData.code = 201;
                    sendData.msg = '当前位置已经有其他玩家了 换个位置试试';
                    socket.emit('goRoom', sendData);
                    break;
                }

                // 存储当前玩家进入房间信息
                hallData[i][data.seat] = { ...hallData[i][data.seat], ...data.userInfo, };//存储当前用户信息
                hallData[i][data.seat].seat = data.seat;//存储当前用户在房间中的位置
                socket.join(data.roomId)//给当前玩家所在房间  添加标记
                sendData.code = 200;
                sendData.msg = '进入房间成功';
                sendData.data = hallData[i][data.seat];
                socket.emit('goRoom', sendData);

                // 全局发送最新大厅房间数据
                let serverData = getHallData();
                sendData.code = 200;
                sendData.msg = '全局 进入房间=> 大厅房间数据请求成功';
                sendData.data = serverData;
                io.sockets.emit('getHallInfo', sendData);

                // 任一用户进出房间 通过进入房间添加的标记给只在当前房间的所有用户发送(不包括当前客户端玩家)  最新房间玩家数据
                sendData.code = 200;
                sendData.msg = '全局 (当前房间内有玩家进入)=> 当前房间玩家数据信息获取成功';
                sendData.data = hallData[i];
                socket.broadcast.to(data.roomId).emit('getRoomPlayerInfo', sendData);
                break;

            }
        }
    });

    // 进入房间获取当前房间玩家数据
    socket.on('getRoomPlayerInfo', (data) => {
        let is_getRoomPlayerInfo = true;
        for (let i = 0; i < hallData.length; i++) {
            if (hallData[i].roomId == data.roomId) {//当前房间存在
                if (hallData[i][data.seat].id == data.userInfo.id) {//当前房间内 当前位置 确实是当前用户
                    sendData.code = 200;
                    sendData.msg = '当前房间玩家数据信息获取成功';
                    sendData.data = hallData[i];
                    socket.emit('getRoomPlayerInfo', sendData);
                    is_getRoomPlayerInfo = false;
                    break;
                }
            }
        }
        if (is_getRoomPlayerInfo) {
            sendData.code = 201;
            sendData.msg = '异常错误';
            sendData.data = {};
            socket.emit('getRoomPlayerInfo', sendData);
        }
    })

    //退出房间
    socket.on('outRoom', (data) => {
        let is_outRoom = true;
        for (let i = 0; i < hallData.length; i++) {
            if (hallData[i].roomId == data.roomId) {//当前房间存在
                if (hallData[i][data.seat].id == data.userInfo.id) {//当前房间内 当前位置 确实是当前用户
                    //清除当前用户在当前房间信息数据
                    hallData[i][data.seat] = {
                        id: '',
                        account: '',
                        password: '',
                        headImg: '',
                        creation_date: '',
                        seat: '',
                        is_ready: '',
                        cardData: [],
                        playLandlord: 'false',
                        isPlayLandlordTitle: '',
                        playCard: 'false',
                        showOutCardIcon: [],
                        showOutCardVal: [],
                    }
                    socket.leave(data.roomId)//给当前玩家  移除进入房间时添加的标记
                    sendData.code = 200;
                    sendData.msg = '退出成功';
                    sendData.data = {};
                    socket.emit('outRoom', sendData);

                    // 全局发送最新大厅房间数据
                    let serverData = getHallData();
                    sendData.code = 200;
                    sendData.msg = '全局 退出房间=> 大厅房间数据请求成功';
                    sendData.data = serverData;
                    io.sockets.emit('getHallInfo', sendData);

                    // 任一用户进出房间 给只在当前房间的所有用户发送(不包括当前客户端玩家)  最新房间玩家数据
                    sendData.code = 200;
                    sendData.msg = '全局 (当前房间内有玩家退出)=> 当前房间玩家数据信息获取成功';
                    sendData.data = hallData[i];
                    socket.broadcast.to(data.roomId).emit('getRoomPlayerInfo', sendData);
                    is_outRoom = false;
                    break;
                }
            }
        }

        if (is_outRoom) {
            sendData.code = 201;
            sendData.msg = '异常错误';
            sendData.data = {};
            socket.emit('outRoom', sendData);
        }
    });

    // 房间内玩家 操作 准备
    socket.on('ready', (data) => {
        let isReady = true;
        for (let i = 0; i < hallData.length; i++) {
            if (hallData[i].roomId == data.roomId) {//当前房间存在
                if (hallData[i][data.seat].id == data.userInfo.id) {//当前房间内 当前位置 确实是当前用户
                    //当前玩家已准备 标记
                    hallData[i][data.seat].is_ready = 'true'

                    // 任一用户准备 给只在当前房间的所有用户发送   最新房间玩家数据
                    sendData.code = 200;
                    sendData.msg = data.seat + '=>准备ok';
                    sendData.data = hallData[i];
                    io.sockets.in(data.roomId).emit('ready', sendData);
                    isReady = false;

                    // 当前房间内三人 都准备了
                    if (hallData[i].leftPlayer.is_ready == 'true' && hallData[i].rightPlayer.is_ready == 'true' && hallData[i].bottomPlayer.is_ready == 'true') {
                        hallData[i].status = 'Licensing';//进入发牌阶段
                        // 给玩家随机分牌赋值
                        let roomCardData = actionLicensing();
                        hallData[i].leftPlayer.cardData = roomCardData.slice(0, 17).sort(cardSort);
                        hallData[i].rightPlayer.cardData = roomCardData.slice(17, 34).sort(cardSort);
                        hallData[i].bottomPlayer.cardData = roomCardData.slice(34, 51).sort(cardSort);
                        hallData[i].landlordCard = roomCardData.slice(51).sort(cardSort)// 地主牌

                        //当前房间 抢地主 子状态 设置
                        hallData[i].subStatus = 'playLandlord';

                        //随机一个玩家叫地主
                        let randomis_playLandlord = ['leftPlayer', 'rightPlayer', 'bottomPlayer'];
                        let randomIndex = Math.floor(Math.random() * 3);
                        hallData[i][randomis_playLandlord[randomIndex]].playLandlord = 'true';

                        // 所有玩家都已准备 发牌数据更新  开始抢地主 给只在当前房间的所有用户发送  最新房间玩家数据
                        sendData.code = 200;
                        sendData.msg = '所有玩家都已准备 发牌数据更新 开始抢地主';
                        sendData.data = hallData[i];
                        io.sockets.in(data.roomId).emit('Licensing', sendData);
                    }

                    break;
                }
            }
        }

        if (isReady) {
            sendData.code = 201;
            sendData.msg = '异常错误';
            sendData.data = {};
            socket.emit('ready', sendData);
        }
    })

    // 是否抢地主
    socket.on('isPlayLandlord', (data) => {
        let isPlayLandlord = true;
        for (let i = 0; i < hallData.length; i++) {
            if (hallData[i].roomId == data.roomId) {//当前房间存在
                if (hallData[i][data.seat].id == data.userInfo.id) {//当前房间内 当前位置 确实是当前用户

                    // 如果没有人抢地主  重新发牌
                    function Licensing() {
                        hallData[i].status = 'Licensing';//进入发牌阶段
                        // 给玩家随机分牌赋值
                        let roomCardData = actionLicensing();
                        hallData[i].leftPlayer.cardData = roomCardData.slice(0, 17).sort(cardSort);
                        hallData[i].rightPlayer.cardData = roomCardData.slice(17, 34).sort(cardSort);
                        hallData[i].bottomPlayer.cardData = roomCardData.slice(34, 51).sort(cardSort);
                        hallData[i].landlordCard = roomCardData.slice(51).sort(cardSort)// 地主牌

                        //当前房间 抢地主 子状态 设置
                        hallData[i].subStatus = 'playLandlord';

                        //随机一个玩家叫地主
                        let randomis_playLandlord = ['leftPlayer', 'rightPlayer', 'bottomPlayer'];
                        let randomIndex = Math.floor(Math.random() * 3);
                        hallData[i][randomis_playLandlord[randomIndex]].playLandlord = 'true';

                        // 所有玩家都没有抢地主 重新发牌
                        sendData.code = 200;
                        sendData.msg = '所有玩家都没有抢地主 重新发牌';
                        sendData.data = hallData[i];
                        io.sockets.in(data.roomId).emit('isPlayLandlord', sendData);
                    }

                    // 存储当前玩家是否叫地主title标记
                    hallData[i][data.seat].isPlayLandlordTitle = data.isPlayLandlordTitle;

                    //清除轮到当前玩家叫地主状态
                    hallData[i][data.seat].playLandlord = 'false';

                    // 房间内玩家操作是否抢地主次数标记
                    hallData[i].playerLandlordNum += 1;

                    // 当前玩家选择抢地主
                    if (data.isPlayLandlord == 'true') {
                        hallData[i].is_playLandlord.push(data.seat)
                    }

                    // 叫地主抢地主 三轮已过
                    if (hallData[i].playerLandlordNum == 3) {
                        // 没有人抢地主
                        if (hallData[i].is_playLandlord.length == 0) {
                            hallData[i].playerLandlordNum = 0;
                            hallData[i].subStatus = '';
                            // 重新发牌时清除所有玩家是否抢地主title标记
                            hallData[i].bottomPlayer.isPlayLandlordTitle = '';
                            hallData[i].rightPlayer.isPlayLandlordTitle = '';
                            hallData[i].leftPlayer.isPlayLandlordTitle = '';

                            // 所有玩家都没有抢地主 清空牌  可以直接进行重新发牌  清空为了让前端渲染出重发效果 而不是直接将牌替换 效果不明显
                            hallData[i].leftPlayer.cardData = [];
                            hallData[i].rightPlayer.cardData = [];
                            hallData[i].bottomPlayer.cardData = [];
                            // 所有玩家都没有抢地主 清空牌
                            sendData.code = 200;
                            sendData.msg = '所有玩家都没有抢地主 清空牌';
                            sendData.data = hallData[i];
                            io.sockets.in(data.roomId).emit('isPlayLandlord', sendData);

                            // 重新回到发牌
                            Licensing()
                            break;
                        }

                        let landlordCardData = hallData[i][hallData[i].is_playLandlord[hallData[i].is_playLandlord.length - 1]].cardData;
                        // 只有一个人叫地主 没有其他人抢
                        if (hallData[i].is_playLandlord.length == 1) {
                            hallData[i][hallData[i].is_playLandlord[hallData[i].is_playLandlord.length - 1]].cardData = [...landlordCardData, ...hallData[i].landlordCard].sort(cardSort);//地主牌赋值给地主 重新排序
                            hallData[i][hallData[i].is_playLandlord[hallData[i].is_playLandlord.length - 1]].playCard = 'true';//地主先出牌 添加出牌标记
                            hallData[i].playerLandlordNum = 0;
                            hallData[i].subStatus = 'playCard';//子状态  进入打牌阶段

                            // 抢地主结束 进入打牌阶段 清除所有玩家是否抢地主title标记
                            hallData[i].bottomPlayer.isPlayLandlordTitle = '';
                            hallData[i].rightPlayer.isPlayLandlordTitle = '';
                            hallData[i].leftPlayer.isPlayLandlordTitle = '';

                            // 抢地主结束 进入打牌阶段
                            sendData.code = 200;
                            sendData.msg = '抢地主结束 进入打牌阶段';
                            sendData.data = hallData[i];
                            io.sockets.in(data.roomId).emit('isPlayLandlord', sendData);
                            break;
                        }

                        // 进行到第三轮时  如果有玩家未抢地主  就不能再抢地主 赋值谁抢地主时清除  上一轮抢地主title标记
                        if (hallData[i].is_playLandlord.length == 2) {

                            if (data.seat == 'leftPlayer') {
                                if (!hallData[i].is_playLandlord.includes('bottomPlayer')) {
                                    hallData[i].rightPlayer.playLandlord = 'true';
                                    hallData[i].rightPlayer.isPlayLandlordTitle = '';
                                } else {
                                    hallData[i].bottomPlayer.playLandlord = 'true';
                                    hallData[i].bottomPlayer.isPlayLandlordTitle = '';
                                }
                            }
                            if (data.seat == 'bottomPlayer') {
                                if (!hallData[i].is_playLandlord.includes('rightPlayer')) {
                                    hallData[i].leftPlayer.playLandlord = 'true';
                                    hallData[i].leftPlayer.isPlayLandlordTitle = '';
                                } else {
                                    hallData[i].rightPlayer.playLandlord = 'true';
                                    hallData[i].rightPlayer.isPlayLandlordTitle = '';
                                }
                            }
                            if (data.seat == 'rightPlayer') {
                                if (!hallData[i].is_playLandlord.includes('leftPlayer')) {
                                    hallData[i].bottomPlayer.playLandlord = 'true';
                                    hallData[i].bottomPlayer.isPlayLandlordTitle = '';
                                } else {
                                    hallData[i].leftPlayer.playLandlord = 'true';
                                    hallData[i].leftPlayer.isPlayLandlordTitle = '';
                                }
                            }
                        } else {
                            // 抢地主给下一家
                            if (data.seat == 'leftPlayer') {
                                hallData[i].bottomPlayer.playLandlord = 'true';
                                hallData[i].bottomPlayer.isPlayLandlordTitle = '';
                            }
                            if (data.seat == 'bottomPlayer') {
                                hallData[i].rightPlayer.playLandlord = 'true';
                                hallData[i].rightPlayer.isPlayLandlordTitle = '';
                            }
                            if (data.seat == 'rightPlayer') {
                                hallData[i].leftPlayer.playLandlord = 'true';
                                hallData[i].leftPlayer.isPlayLandlordTitle = '';
                            }
                        }

                        // 
                        sendData.code = 200;
                        sendData.msg = '叫地主抢地主  发送前端状态更新';
                        sendData.data = hallData[i];
                        io.sockets.in(data.roomId).emit('isPlayLandlord', sendData);
                        break;
                    }

                    // 叫地主抢地主 第四轮  终结 
                    if (hallData[i].playerLandlordNum == 4) {
                        let landlordCardData = hallData[i][hallData[i].is_playLandlord[hallData[i].is_playLandlord.length - 1]].cardData;
                        hallData[i][hallData[i].is_playLandlord[hallData[i].is_playLandlord.length - 1]].cardData = [...landlordCardData, ...hallData[i].landlordCard].sort(cardSort);//地主牌赋值给地主 重新排序
                        hallData[i][hallData[i].is_playLandlord[hallData[i].is_playLandlord.length - 1]].playCard = 'true';//地主先出牌 添加出牌标记
                        hallData[i].playerLandlordNum = 0;
                        hallData[i].subStatus = 'playCard';//子状态  进入打牌阶段
                        // 抢地主结束 进入打牌阶段 清除所有玩家是否抢地主title标记
                        hallData[i].bottomPlayer.isPlayLandlordTitle = '';
                        hallData[i].rightPlayer.isPlayLandlordTitle = '';
                        hallData[i].leftPlayer.isPlayLandlordTitle = '';

                        // 抢地主结束 进入打牌阶段
                        sendData.code = 200;
                        sendData.msg = '抢地主结束 进入打牌阶段';
                        sendData.data = hallData[i];
                        io.sockets.in(data.roomId).emit('isPlayLandlord', sendData);
                        break;
                    }


                    // 抢地主给下一家
                    if (data.seat == 'leftPlayer') {
                        hallData[i].bottomPlayer.playLandlord = 'true';
                    }
                    if (data.seat == 'bottomPlayer') {
                        hallData[i].rightPlayer.playLandlord = 'true';
                    }
                    if (data.seat == 'rightPlayer') {
                        hallData[i].leftPlayer.playLandlord = 'true';
                    }

                    sendData.code = 200;
                    sendData.msg = '叫地主抢地主  发送前端状态更新';
                    sendData.data = hallData[i];
                    io.sockets.in(data.roomId).emit('isPlayLandlord', sendData);

                    isPlayLandlord = false;
                    break;
                }
            }
        }

        if (isPlayLandlord) {
            sendData.code = 201;
            sendData.msg = '异常错误';
            sendData.data = {};
            socket.emit('outRoom', sendData);
        }
    })


    // 当前玩家是否出牌
    socket.on('isPlayCard', (data) => {
        let isPlayCard = true;
        for (let i = 0; i < hallData.length; i++) {
            if (hallData[i].roomId == data.roomId) {//当前房间存在
                if (hallData[i][data.seat].id == data.userInfo.id) {//当前房间内 当前位置 确实是当前用户

                    if (data.isPlayCard == 'true') {//玩家出牌
                        if (GetCardType(data.showOutCardVal) != 'None') {//牌型正常符合
                            if (data.seat == 'leftPlayer') {
                                // 当前是地主第一次出牌  或者其余两名玩家上轮不要  (无需比牌大小)
                                if ((hallData[i].bottomPlayer.showOutCardIcon.length == 0 || hallData[i].bottomPlayer.showOutCardIcon[0] == 'notOut')
                                    && (hallData[i].rightPlayer.showOutCardIcon.length == 0 || hallData[i].rightPlayer.showOutCardIcon[0] == 'notOut')) {

                                } else {//需要先与上一轮玩家进行比牌
                                    let isPlayer = hallData[i].rightPlayer.showOutCardIcon.length == 0 || hallData[i].rightPlayer.showOutCardIcon[0] == 'notOut'
                                        ? 'bottomPlayer' : 'rightPlayer';
                                    if (!cardContrast(hallData[i][isPlayer].showOutCardVal, data.showOutCardVal)) {//当前牌无法大过上家
                                        sendData.code = 201;
                                        sendData.msg = '当前牌无法大过上家';
                                        socket.emit('isPlayCard', sendData);
                                        isPlayCard = false;
                                        return;
                                    }

                                }
                                // (function (i) {
                                data.showOutCardIcon.forEach((j) => {// 删除掉已出的牌
                                    hallData[i].leftPlayer.cardData = hallData[i].leftPlayer.cardData.filter((item) => {
                                        return item.icon != j;
                                    })
                                })

                                hallData[i].leftPlayer.showOutCardIcon = data.showOutCardIcon;//存储当前玩家出的牌Icon
                                hallData[i].leftPlayer.showOutCardVal = data.showOutCardVal;//存储当前玩家出的牌Val
                                hallData[i].leftPlayer.playCard = 'false';//清除轮到当前玩家出牌状态

                                if (hallData[i].leftPlayer.cardData.length == 0) {//游戏结束 当前玩家牌已打完
                                    gameOverClear(i)//当前房间数据重置 但保留玩家信息
                                    sendData.code = 200;
                                    sendData.data = hallData[i];
                                    sendData.msg = '游戏结束=> leftPlayer玩家胜利';
                                    io.sockets.in(data.roomId).emit('gameOver', sendData);
                                    isPlayCard = false;
                                    return;
                                }

                                hallData[i].bottomPlayer.playCard = 'true';// 出牌状态赋值给下一家
                                hallData[i].bottomPlayer.showOutCardIcon = [];// 删除下一玩家 上轮是否出牌 已出的牌Icon
                                hallData[i].bottomPlayer.showOutCardVal = [];// 删除下一玩家 上轮是否出牌 已出的牌Val

                                socket.emit('clearCardStatusArr', { code: 200, msg: '清除当前玩家卡牌是否选择 及出牌控制  true：选中  out：出牌' });
                                sendData.code = 200;
                                sendData.data = hallData[i];
                                sendData.msg = '出牌成功';
                                io.sockets.in(data.roomId).emit('isPlayCard', sendData);
                                isPlayCard = false;
                                // })(i)
                            }

                            if (data.seat == 'bottomPlayer') {
                                // 当前是地主第一次出牌  或者其余两名玩家上轮不要  (无需比牌大小)
                                if ((hallData[i].rightPlayer.showOutCardIcon.length == 0 || hallData[i].rightPlayer.showOutCardIcon[0] == 'notOut')
                                    && (hallData[i].leftPlayer.showOutCardIcon.length == 0 || hallData[i].leftPlayer.showOutCardIcon[0] == 'notOut')) {

                                } else {//需要先与上一轮玩家进行比牌
                                    let isPlayer = hallData[i].leftPlayer.showOutCardIcon.length == 0 || hallData[i].leftPlayer.showOutCardIcon[0] == 'notOut'
                                        ? 'rightPlayer' : 'leftPlayer';
                                    if (!cardContrast(hallData[i][isPlayer].showOutCardVal, data.showOutCardVal)) {//当前牌无法大过上家
                                        sendData.code = 201;
                                        sendData.msg = '当前牌无法大过上家';
                                        socket.emit('isPlayCard', sendData);
                                        isPlayCard = false;
                                        return;
                                    }
                                }
                                // (function (i) {
                                data.showOutCardIcon.forEach((j) => {// 删除掉已出的牌
                                    hallData[i].bottomPlayer.cardData = hallData[i].bottomPlayer.cardData.filter((item) => {
                                        return item.icon != j;
                                    })
                                })
                                hallData[i].bottomPlayer.showOutCardIcon = data.showOutCardIcon;//存储当前玩家出的牌Icon
                                hallData[i].bottomPlayer.showOutCardVal = data.showOutCardVal;//存储当前玩家出的牌Val
                                hallData[i].bottomPlayer.playCard = 'false';//清除轮到当前玩家出牌状态

                                if (hallData[i].bottomPlayer.cardData.length == 0) {//游戏结束 当前玩家牌已打完
                                    gameOverClear(i)//当前房间数据重置 但保留玩家信息
                                    sendData.code = 200;
                                    sendData.data = hallData[i];
                                    sendData.msg = '游戏结束=> bottomPlayer玩家胜利';
                                    io.sockets.in(data.roomId).emit('gameOver', sendData);
                                    isPlayCard = false;
                                    return;
                                }

                                hallData[i].rightPlayer.playCard = 'true';// 出牌状态赋值给下一家
                                hallData[i].rightPlayer.showOutCardIcon = [];// 删除下一玩家 上轮是否出牌 已出的牌Icon
                                hallData[i].rightPlayer.showOutCardVal = [];// 删除下一玩家 上轮是否出牌 已出的牌Val

                                socket.emit('clearCardStatusArr', { code: 200, msg: '清除当前玩家卡牌是否选择 及出牌控制  true：选中  out：出牌' });
                                sendData.code = 200;
                                sendData.data = hallData[i];
                                sendData.msg = '出牌成功';
                                io.sockets.in(data.roomId).emit('isPlayCard', sendData);
                                isPlayCard = false;
                                // })(i)
                            }

                            if (data.seat == 'rightPlayer') {
                                // 当前是地主第一次出牌  或者其余两名玩家上轮不要  (无需比牌大小)
                                if ((hallData[i].leftPlayer.showOutCardIcon.length == 0 || hallData[i].leftPlayer.showOutCardIcon[0] == 'notOut')
                                    && (hallData[i].bottomPlayer.showOutCardIcon.length == 0 || hallData[i].bottomPlayer.showOutCardIcon[0] == 'notOut')) {

                                } else {//需要先与上一轮玩家进行比牌
                                    let isPlayer = hallData[i].bottomPlayer.showOutCardIcon.length == 0 || hallData[i].bottomPlayer.showOutCardIcon[0] == 'notOut'
                                        ? 'leftPlayer' : 'bottomPlayer';
                                    if (!cardContrast(hallData[i][isPlayer].showOutCardVal, data.showOutCardVal)) {//当前牌无法大过上家
                                        sendData.code = 201;
                                        sendData.msg = '当前牌无法大过上家';
                                        socket.emit('isPlayCard', sendData);
                                        isPlayCard = false;
                                        return;
                                    }
                                }

                                // (function (i) {
                                data.showOutCardIcon.forEach((j) => {// 删除掉已出的牌
                                    hallData[i].rightPlayer.cardData = hallData[i].rightPlayer.cardData.filter((item) => {
                                        return item.icon != j;
                                    })
                                })

                                hallData[i].rightPlayer.showOutCardIcon = data.showOutCardIcon;//存储当前玩家出的牌Icon
                                hallData[i].rightPlayer.showOutCardVal = data.showOutCardVal;//存储当前玩家出的牌Val
                                hallData[i].rightPlayer.playCard = 'false';//清除轮到当前玩家出牌状态

                                if (hallData[i].rightPlayer.cardData.length == 0) {//游戏结束 当前玩家牌已打完
                                    gameOverClear(i)//当前房间数据重置 但保留玩家信息
                                    sendData.code = 200;
                                    sendData.data = hallData[i];
                                    sendData.msg = '游戏结束=> rightPlayer玩家胜利';
                                    io.sockets.in(data.roomId).emit('gameOver', sendData);
                                    isPlayCard = false;
                                    return;
                                }

                                hallData[i].leftPlayer.playCard = 'true';// 出牌状态赋值给下一家
                                hallData[i].leftPlayer.showOutCardIcon = [];// 删除下一玩家 上轮是否出牌 已出的牌Icon
                                hallData[i].leftPlayer.showOutCardVal = [];// 删除下一玩家 上轮是否出牌 已出的牌Val

                                socket.emit('clearCardStatusArr', { code: 200, msg: '清除当前玩家卡牌是否选择 及出牌控制  true：选中  out：出牌' });
                                sendData.code = 200;
                                sendData.data = hallData[i];
                                sendData.msg = '出牌成功';
                                io.sockets.in(data.roomId).emit('isPlayCard', sendData);
                                isPlayCard = false;
                                // })(i)
                            }

                        } else {//玩家出牌不符合规则
                            sendData.code = 201;
                            sendData.msg = '出牌不符合规则';
                            socket.emit('isPlayCard', sendData);
                            isPlayCard = false;
                        }
                    } else {//玩家不出
                        hallData[i][data.seat].showOutCardIcon.push('notOut');//当前玩家不出标记
                        hallData[i][data.seat].playCard = 'false';//清除轮到当前玩家出牌状态
                        if (data.seat == 'leftPlayer') {
                            hallData[i].bottomPlayer.playCard = 'true';// 出牌状态赋值给下一家
                            hallData[i].bottomPlayer.showOutCardIcon = [];// 删除下一玩家 上轮是否出牌 已出的牌Icon
                            hallData[i].bottomPlayer.showOutCardVal = [];// 删除下一玩家 上轮是否出牌 已出的牌Val
                        }
                        if (data.seat == 'bottomPlayer') {
                            hallData[i].rightPlayer.playCard = 'true';// 出牌状态赋值给下一家
                            hallData[i].rightPlayer.showOutCardIcon = [];// 删除下一玩家 上轮是否出牌 已出的牌Icon
                            hallData[i].rightPlayer.showOutCardVal = [];// 删除下一玩家 上轮是否出牌 已出的牌Val
                        }
                        if (data.seat == 'rightPlayer') {
                            hallData[i].leftPlayer.playCard = 'true';// 出牌状态赋值给下一家
                            hallData[i].leftPlayer.showOutCardIcon = [];// 删除下一玩家 上轮是否出牌 已出的牌Icon
                            hallData[i].leftPlayer.showOutCardVal = [];// 删除下一玩家 上轮是否出牌 已出的牌Val
                        }


                        sendData.code = 200;
                        sendData.msg = '当前玩家选择不出';
                        sendData.data = hallData[i];
                        io.sockets.in(data.roomId).emit('isPlayCard', sendData);
                        isPlayCard = false;
                    }



                    break;
                }
            }
        }

        if (isPlayCard) {
            sendData.code = 201;
            sendData.msg = '异常错误';
            sendData.data = {};
            socket.emit('outRoom', sendData);
        }
    })













};

/**********************牌型判断*******************/

// None,//什么都不是
// Single,//单张
// Double,//对子
// Three,//三张
// ThreeOne,//三代一
// ThreeTwo,//三代二
// ShunZi,//顺子45678
// LianDui,//连对334455
// Flay,//飞机333444
// FlayOne,//飞机带单
// FlayTwo,//飞机带对
// Boom,//炸弹
// BoomTwo,//炸弹带对子



// 是否单张
function IsSingle(card) {
    if (card.length == 1) {
        return true;
    }
    return false;
}

// 是否对子
function IsDouble(card) {
    if (card.length == 2) {
        if (card[0] == card[1]) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return false;
    }
}

// 是否是三张
function IsThree(card) {
    if (card.length == 3) {
        if (card[0] != card[1]) {
            return false;
        }

        if (card[1] != card[2]) {
            return false;
        }

        if (card[0] != card[2]) {
            return false;
        }
        return true;
    } else {
        return false;
    }

}

// 	是否是三代一
function IsThreeOne(card) {
    if (card.length == 4) {
        if (card[0] != card[1]) {//第一张是单张
            if (card[1] != card[2]) {
                return false;
            }

            if (card[2] != card[3]) {
                return false;
            }

            if (card[1] != card[3]) {
                return false;
            }
            return true;
        } else if (card[2] != card[3]) {//第四张是单张
            if (card[0] != card[1]) {
                return false;
            }

            if (card[1] != card[2]) {
                return false;
            }

            if (card[0] != card[2]) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

//是否是三代二
function IsThreeTwo(card) {
    if (card.length == 5) {
        if (card[2] == card[3] && card[2] == card[4] && card[3] == card[4]) {	//前2张是对子
            if (card[0] != card[1]) {
                return false;
            }
            return true;
        } else if (card[0] == card[1] && card[0] == card[2] && card[1] == card[2]) {//后2张是对子
            if (card[3] != card[4]) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

// 是否是顺子45678
function IsShunZi(card) {
    if (card.length >= 5 && card.length <= 12) {
        for (var i = 0; i < card.length; i++) {
            if (card[i + 1] == undefined) {
                return true;
            }
            if (card[i + 1] != card[i] + 1) {
                return false;
            }
            if (card[i] == 15 || card[i] == 16 || card[i] == 17) {//顺子不能是2和2王
                return false;
            }

        }
        return true;
    } else {
        return false;
    }

}

// 是否是连对334455
function IsLianDui(card) {
    if (card.length >= 6 && card.length % 2 == 0) {
        for (var i = 0; i < card.length; i = i + 2) {
            if (card[i] == 14 || card[i] == 15 || card[i] == 16 || card[i] == 17) {//连对不能包含A,2和俩王
                return false;
            }

            if (card[i] != card[i + 1]) {//对子之间是否相等
                if (card[i] + 1 == undefined) {
                    return true;
                }
                return false;
            }

            if (card[i + 2] != card[i] + 1) {//2个对子之间是否相差1
                if (card[i + 2] == undefined || card[i + 1] == undefined) {
                    return true;
                }
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

// 是否是飞机333444
function IsFlay(card) {
    if (card.length >= 6 && card.length % 3 == 0) {
        for (var i = 0; i < card.length; i = i + 3) {
            if (card[i] == 15 || card[i] == 16 || card[i] == 17) {//飞机不能包含2和俩王
                return false;
            }

            if (card[i] != card[i + 1]) {
                return false;
            }

            if (card[i + 1] != card[i + 2]) {
                return false;
            }

            if (card[i] != card[i + 2]) {
                return false;
            }

            if (card[i] + 1 != card[i + 3]) {
                if (card[i + 3] == undefined) {
                    return true;
                }
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

// 是否是飞机带单
function IsFlayOne(card) {
    if (card.includes(16) && card.includes(17)) {//不能同时存在大王小王
        return false;
    }

    var someisTrue = [8, 12, 16, 20].some(function (item) {//所有可能出现的情况 length
        return card.length == item;
    })

    if (someisTrue) {
        var markId = card[0]
        var newArr = [];
        var markArr = [];
        for (var i = 0; i < card.length; i++) {
            if (card[i] === markId) {
                markArr.push(card[i]);
            } else {
                newArr.push(markArr)
                markId = card[i];
                markArr = [card[i]];

            }
        }
        newArr.push(markArr)
        newArr.sort(function (a, b) {
            var s = a.length,
                t = b.length;

            // return s < t ? -1 : 1;
            return s - t;
        });

        var everyIsTrue = newArr.every(function (item) {//处理后的数据  是否正常 (飞机三张不包括222)
            return item.length == 1 || (item.length == 3 && item[0] != 15)
        })

        if (everyIsTrue) {//各个情况判断
            if (newArr.length == 4) {
                if (newArr[0].length == 1 && newArr[1].length == 1) {
                    return newArr[2].length == 3 && newArr[3].length == 3 && newArr[2][0] + 1 == newArr[3][0] ? true : false;
                }
                // if (newArr[0].length == 3 && newArr[1].length == 3) {
                // 	return newArr[0][0]+1 == newArr[1][0] && newArr[2].length == 1 && newArr[3].length == 1 ? true : false;
                // }
            }

            if (newArr.length == 6) {
                if (newArr[0].length == 1 && newArr[1].length == 1 && newArr[2].length == 1) {
                    return newArr[3].length == 3 && newArr[4].length == 3 && newArr[5].length == 3
                        && newArr[3][0] + 1 == newArr[4][0] && newArr[4][0] + 1 == newArr[5][0] ? true : false;
                }
                // if (newArr[0].length == 3 && newArr[1].length == 3 && newArr[2].length == 3) {

                // 	return newArr[0][0]+1 == newArr[1][0] && newArr[1][0]+1 == newArr[2][0]
                // 		&& newArr[3].length == 1 && newArr[4].length==1 && newArr[5].length == 1 ? true : false;
                // }
            }

            if (newArr.length == 8) {
                if (newArr[0].length == 1 && newArr[1].length == 1 && newArr[2].length == 1 && newArr[3].length == 1) {
                    return newArr[3].length == 3 && newArr[4].length == 3 && newArr[5].length == 3 && newArr[6].length == 3
                        && newArr[3][0] + 1 == newArr[4][0] && newArr[4][0] + 1 == newArr[5][0] && newArr[5][0] + 1 == newArr[6][0] ? true : false;
                }
                // if (newArr[0].length == 3 && newArr[1].length == 3 && newArr[2].length == 3 && newArr[3].length == 3) {
                // 	return newArr[0][0]+1 == newArr[1][0] && newArr[1][0]+1 == newArr[2][0] && newArr[2][0]+1 == newArr[3][0]
                // 		&& newArr[4].length == 1 && newArr[5].length==1 && newArr[6].length == 1 && newArr[7].length == 1 ? true : false;
                // }
            }

            if (newArr.length == 10) {
                if (newArr[0].length == 1 && newArr[1].length == 1 && newArr[2].length == 1 && newArr[3].length == 1 && newArr[4].length == 1) {
                    return newArr[5].length == 3 && newArr[6].length == 3 && newArr[7].length == 3 && newArr[8].length == 3 && newArr[9].length == 3
                        && newArr[5][0] + 1 == newArr[6][0] && newArr[6][0] + 1 == newArr[7][0] && newArr[7][0] + 1 == newArr[8][0] && newArr[8][0] + 1 == newArr[9][0] ? true : false;
                }
                // if (newArr[0].length == 3 && newArr[1].length == 3 && newArr[2].length == 3 && newArr[3].length == 3 && newArr[4].length == 3) {
                // 	return newArr[0][0]+1 == newArr[1][0] && newArr[1][0]+1 == newArr[2][0] && newArr[2][0]+1 == newArr[3][0] && newArr[3][0]+1 == newArr[4][0]
                // 		&& newArr[5].length == 1 && newArr[6].length==1 && newArr[7].length == 1 && newArr[8].length == 1 && newArr[9].length == 1 ? true : false;
                // }
            }
            return false;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

// 是否是飞机带对
function IsFlayTwo(card) {
    if (card.includes(16) && card.includes(17)) {//不能同时存在大王小王
        return false;
    }

    var someisTrue = [10, 15, 20].some(function (item) {//所有可能出现的情况 length
        return card.length == item;
    })

    if (someisTrue) {
        var markId = card[0]
        var newArr = [];
        var markArr = [];
        for (var i = 0; i < card.length; i++) {
            if (card[i] === markId) {
                markArr.push(card[i]);
            } else {
                newArr.push(markArr)
                markId = card[i];
                markArr = [card[i]];

            }
        }
        newArr.push(markArr)

        newArr = newArr.sort(function (a, b) {
            var s = a.length,
                t = b.length;

            // return s < t ? -1 : 1;
            return s - t;
        });

        var everyIsTrue = newArr.every(function (item) {//处理后的数据  是否正常 (飞机三张不包括222)
            return item.length == 2 || (item.length == 3 && item[0] != 15)
        })

        if (everyIsTrue) {//各个情况判断
            if (newArr.length == 4) {
                if (newArr[0].length == 2 && newArr[1].length == 2) {
                    return newArr[2].length == 3 && newArr[3].length == 3 && newArr[2][0] + 1 == newArr[3][0] ? true : false;
                }
                // if (newArr[0].length == 3 && newArr[1].length == 3) {
                // 	return newArr[0][0]+1 == newArr[1][0] && newArr[2].length == 2 && newArr[3].length == 2 ? true : false;
                // }
            }

            if (newArr.length == 6) {
                if (newArr[0].length == 2 && newArr[1].length == 2 && newArr[2].length == 2) {
                    return newArr[3].length == 3 && newArr[4].length == 3 && newArr[5].length == 3
                        && newArr[3][0] + 1 == newArr[4][0] && newArr[4][0] + 1 == newArr[5][0] ? true : false;
                }
                // if (newArr[0].length == 3 && newArr[1].length == 3 && newArr[2].length == 3) {

                // 	return newArr[0][0]+1 == newArr[1][0] && newArr[1][0]+1 == newArr[2][0]
                // 		&& newArr[3].length == 2 && newArr[4].length==2 && newArr[5].length == 2 ? true : false;
                // }
            }

            if (newArr.length == 8) {
                if (newArr[0].length == 2 && newArr[1].length == 2 && newArr[2].length == 2 && newArr[3].length == 2) {
                    return newArr[3].length == 3 && newArr[4].length == 3 && newArr[5].length == 3 && newArr[6].length == 3
                        && newArr[3][0] + 1 == newArr[4][0] && newArr[4][0] + 1 == newArr[5][0] && newArr[5][0] + 1 == newArr[6][0] ? true : false;
                }
                // if (newArr[0].length == 3 && newArr[1].length == 3 && newArr[2].length == 3 && newArr[3].length == 3) {
                // 	return newArr[0][0]+1 == newArr[1][0] && newArr[1][0]+1 == newArr[2][0] && newArr[2][0]+1 == newArr[3][0]
                // 		&& newArr[4].length == 2 && newArr[5].length==2 && newArr[6].length == 2 && newArr[7].length == 2 ? true : false;
                // }
            }
            return false;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

// 是否是炸弹 
function IsBoom(card) {
    if (card.length == 2) {
        if (card[0] == 16 && card[1] == 17) {
            return true;
        } else {
            return false;
        }
    } else if (card.length == 4) {
        for (var i = 0; i < card.length; i++) {
            if (i == card.length) {
                if (card[0] != card[i]) {
                    return false;
                }
            } else {
                if (card[i + 1] == undefined) {
                    return true;
                }
                if (card[i] != card[i + 1]) {
                    return false;
                }

            }
        }
        return true;
    }
    else {
        return false;
    }
}

// 是否是炸弹带两个单
function IsBoomOne(card) {
    var someisTrue = [4, 6].some(function (item) {//所有可能出现的情况 length
        return card.length == item;
    })
    if (card.length == 4) {//火箭
        if (card[2] == 16 && card[3] == 17) {
            return card[0] == card[1] ? false : true
        } else {
            return false;
        }
    }

    if (card[4] == 16 && card[5] == 17) {//length为6 时  不允许同时存在大小王
        return false;
    }

    if (someisTrue) {
        var markId = card[0]
        var newArr = [];
        var markArr = [];
        for (var i = 0; i < card.length; i++) {
            if (card[i] === markId) {
                markArr.push(card[i]);
            } else {
                newArr.push(markArr)
                markId = card[i];
                markArr = [card[i]];

            }
        }
        newArr.push(markArr)

        newArr = newArr.sort(function (a, b) {
            var s = a.length,
                t = b.length;

            return s - t;
        });

        var everyIsTrue = newArr.every(function (item) {
            return item.length == 1 || item.length == 4
        })

        if (everyIsTrue) {
            if (newArr.length == 3) {
                if (newArr[0].length == 1 && newArr[1].length == 1) {
                    return newArr[0][0] != newArr[1][0] && newArr[2][0] == newArr[2][1] && newArr[2][0] == newArr[2][2] && newArr[2][0] == newArr[2][3] ? true : false;
                }
                // if (newArr[0].length == 4 && newArr[1].length == 2) {
                // 	return newArr[0][0]==newArr[0][1]==newArr[0][2]==newArr[0][3] && newArr[1][0]==newArr[1][1]? true : false;
                // }
            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}

// 是否是炸弹带对子
function IsBoomTwo(card) {
    var someisTrue = [4, 6].some(function (item) {//所有可能出现的情况 length
        return card.length == item;
    })
    if (card.length == 4) {//火箭
        if (card[2] == 16 && card[3] == 17) {
            return card[0] == card[1] ? true : false
        } else {
            return false;
        }
    }

    if (card[4] == 16 && card[5] == 17) {//length为6 时  不允许同时存在大小王
        return false;
    }

    if (someisTrue) {
        var markId = card[0]
        var newArr = [];
        var markArr = [];
        for (var i = 0; i < card.length; i++) {
            if (card[i] === markId) {
                markArr.push(card[i]);
            } else {
                newArr.push(markArr)
                markId = card[i];
                markArr = [card[i]];

            }
        }
        newArr.push(markArr)

        newArr = newArr.sort(function (a, b) {
            var s = a.length,
                t = b.length;

            return s - t;
        });

        var everyIsTrue = newArr.every(function (item) {
            return item.length == 2 || item.length == 4
        })

        if (everyIsTrue) {
            if (newArr.length == 2) {
                if (newArr[0].length == 2 && newArr[1].length == 4) {
                    return newArr[0][0] == newArr[0][1] && newArr[1][0] == newArr[1][1] && newArr[1][0] == newArr[1][2] && newArr[1][0] == newArr[1][3] ? true : false;
                }
                // if (newArr[0].length == 4 && newArr[1].length == 2) {
                // 	return newArr[0][0]==newArr[0][1]==newArr[0][2]==newArr[0][3] && newArr[1][0]==newArr[1][1]? true : false;
                // }
            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}

// 判断牌的类型
function GetCardType(card) {
    if (!Array.isArray(card)) {//数据源非数组
        return "None";
    }

    var isOff = card.every(function (item) {
        return item >= 3 && item <= 17;
    })
    if (!isOff) {
        return "None";
    }


    var type = "";
    card.sort(function (a, b) {
        return a - b;
    });
    if (IsSingle(card)) {
        type = "Single";
    } else if (IsDouble(card)) {
        type = "Double";
    } else if (IsThree(card)) {
        type = "Three";
    } else if (IsThreeOne(card)) {
        type = "ThreeOne";
    } else if (IsThreeTwo(card)) {
        type = "ThreeTwo";
    } else if (IsShunZi(card)) {
        type = "ShunZi";
    } else if (IsLianDui(card)) {
        type = "LianDui";
    } else if (IsFlay(card)) {
        type = "Flay";
    } else if (IsFlayOne(card)) {
        type = "FlayOne";
    } else if (IsFlayTwo(card)) {
        type = "FlayTwo";
    } else if (IsBoom(card)) {
        type = "Boom";
    } else if (IsBoomOne(card)) {
        type = "BoomOne";
    } else if (IsBoomTwo(card)) {
        type = "BoomTwo";
    } else {
        type = "None";
    }
    return type;
}


/*************************比牌************************** */

// 对特殊牌型做比牌之前的处理  如[3,4,4,4，6,7,7,7]将被处理成[[3],[6],[4,4,4],[7,7,7]]  用数组最后一个元素 中第一个值作比较即可
function cardHandle(card) {
    card.sort(function (a, b) {
        return a - b;
    })
    let markId = card[0]
    let newArr = [];
    let markArr = [];
    for (let i = 0; i < card.length; i++) {
        if (card[i] === markId) {
            markArr.push(card[i]);
        } else {
            newArr.push(markArr)
            markId = card[i];
            markArr = [card[i]];

        }
    }
    newArr.push(markArr)

    newArr = newArr.sort(function (a, b) {
        let s = a.length,
            t = b.length;

        return s - t;
    });
    return newArr;
}

// 牌型处理  排序
function sortHandle(a, b) {
    return a - b;
}

// 比较牌大小
function cardContrast(oldData, newData) {
    if (GetCardType(oldData) != 'None' && GetCardType(newData) != 'None') {//牌型无误
        // 出现火箭炸弹时
        if (oldData[0] + oldData[1] == 33) {//上一家出的的火箭 万夫莫开 0.0
            return false;
        }
        if (newData[0] + newData[1] == 33) {//当前玩家出的火箭 横行无阻 0.0
            return true;
        }

        if (GetCardType(newData) == 'Boom') {//当前玩家出的炸弹
            if (GetCardType(oldData) == 'Boom') {
                return newData[0] > oldData[0] ? true : false;
            } else {
                return true;
            }
        }

        // 出去上面几种情况  当前玩家出牌与上一家必须保持一致
        if (GetCardType(oldData) == GetCardType(newData)) {
            let type = GetCardType(oldData);

            // 排序处理
            let sortHandleOld = oldData.sort(sortHandle);
            let sortHandleNew = newData.sort(sortHandle);

            // 特殊牌型处理  
            let cardHandleOld = cardHandle(oldData);
            let cardHandleNew = cardHandle(newData);
            // 单张
            if (type == 'Single') {
                return newData[0] > oldData[0] ? true : false;

            }

            // 对子
            if (type == 'Double') {
                return newData[0] > oldData[0] ? true : false;
            }

            // 三张
            if (type == 'Three') {
                return newData[0] > oldData[0] ? true : false;
            }

            // 三带一
            if (type == 'ThreeOne') {
                return cardHandleNew[cardHandleNew.length - 1][0] > cardHandleOld[cardHandleOld.length - 1][0] ? true : false;
            }

            // 三代二
            if (type == 'ThreeTwo') {
                return cardHandleNew[cardHandleNew.length - 1][0] > cardHandleOld[cardHandleOld.length - 1][0] ? true : false;
            }

            // 顺子 34567
            if (type == 'ShunZi') {
                return sortHandleNew[0] > sortHandleOld[0] ? true : false;
            }

            // 连对334455
            if (type == 'LianDui') {
                return sortHandleNew[0] > sortHandleOld[0] ? true : false;
            }

            // 飞机333444
            if (type == 'Flay') {
                return sortHandleNew[0] > sortHandleOld[0] ? true : false;
            }

            // 飞机带单
            if (type == 'FlayOne') {
                return cardHandleNew[cardHandleNew.length - 1][0] > cardHandleOld[cardHandleOld.length - 1][0] ? true : false;
            }

            // 飞机带对
            if (type == 'FlayTwo') {
                return cardHandleNew[cardHandleNew.length - 1][0] > cardHandleOld[cardHandleOld.length - 1][0] ? true : false;
            }

            // 炸弹
            if (type == 'Boom') {
                return newData[0] > oldData[0] ? true : false;
            }

            // 炸弹带对
            if (type == 'BoomTwo') {
                return cardHandleNew[cardHandleNew.length - 1][0] > cardHandleOld[cardHandleOld.length - 1][0] ? true : false;
            }

        } else {
            return false;
        }
    } else {
        return false;
    }
}