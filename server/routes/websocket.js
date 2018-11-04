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
        FieldMark: '',//字段标记  便于再有新增或删除字段ctrl+D统一增减 无实质意义
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        status_is_playLandlord: 'false',//子状态=> 抢地主
        is_playLandlord: [],//谁是地主  
        leftPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',//当前玩家的位置  进入大厅赋值 返回给前端缓存
            is_ready: '',//当前玩家是否准备
            cardData: [],//当前玩家  卡牌数据源
            playLandlord: 'false',//当前谁在抢地主
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
        }
    },
    {
        roomId: 2,
        FieldMark: '',
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        status_is_playLandlord: 'false',
        is_playLandlord: [],
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
        }
    },
    {
        roomId: 3,
        FieldMark: '',
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        status_is_playLandlord: 'false',
        is_playLandlord: [],
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
        }
    },
    {
        roomId: 4,
        FieldMark: '',
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        status_is_playLandlord: 'false',
        is_playLandlord: [],
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
    for (var i = 0; i < hallData.length - 1; i++) {
        if (newHallData.length >= 4) {
            break;
        }
        if (hallData[i].leftPlayer.id && hallData[i].rightPlayer.id && hallData[i].bottomPlayer.id) {
            // 当前房间人数已满
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
                status_is_playLandlord: 'false',
                is_playLandlord: [],
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
    for (let i = 0; i < len - 1; i++) {
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
        for (let i = 0; i < hallData.length - 1; i++) {
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
                hallData[i][data.seat] = {...hallData[i][data.seat],...data.userInfo,};//存储当前用户信息
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
        for (let i = 0; i < hallData.length - 1; i++) {
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
        for (let i = 0; i < hallData.length - 1; i++) {
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
        for (let i = 0; i < hallData.length - 1; i++) {
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
                        hallData[i].status_is_playLandlord = 'true';

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
            socket.emit('outRoom', sendData);
        }
    })






















    // var obj = {
    //     list: [],
    //     myCard: [],
    //     left: [],
    //     right: [],
    //     bottomCard: []
    // };
    // socket.on('getCards', function (data) {
    //     if (obj.list.length <= 0) {
    //         var list = [];
    //         for (var i = 0; i < 54; i++) {
    //             list.push(i);
    //         }
    //         creatCard();
    //     }
    //     console.log(data);
    //     //js 随机整数方法
    //     function rnd(n, m) {
    //         return Math.floor(Math.random() * (m - n + 1) + n)
    //     }
    //     function creatCard() {
    //         for (var j = 0; j < 54; j++) {
    //             var index = rnd(0, 53);
    //             var one = list[j];
    //             var two = list[index];
    //             list[j] = two;
    //             list[index] = one;
    //         }
    //         var myCard = list.slice(0, 17);
    //         myCard.sort(function (a, b) { return b - a });
    //         obj = {
    //             list: list,
    //             myCard: myCard,
    //             left: obj.list.slice(17, 34),
    //             right: obj.list.slice(34, 51),
    //             bottomCard: obj.list.slice(51, 54)
    //         }
    //     }

    //     socket.emit('getCards', obj);
    // });

    // //接收当前人出牌
    // socket.on('emitCard', function (data) {
    //     socket.emit('emitCard', {
    //         code: '0000',
    //         message: '出牌成功'
    //     });
    //     //向前端--发送最新的纸牌
    //     socket.emit('getCards', obj);
    // });




    // //登录用户的资料
    // socket.on('loginer', (data) => {
    //     let sql = "select * from t_player where party_id = '" + data.partyId + "'";
    //     connect.query(sql, function (err, result) {
    //         if (err) {
    //             console.log(err.message);
    //             return
    //         } else {
    //             socket.emit('loginer', result)
    //         }
    //     })
    // })

    // //创建房间
    // socket.on('hall', (data) => {
    //     let sql = 'select * from t_player where player_status = "Y"';
    //     let length;

    //     connect.query(sql, function (err, result) {
    //         if (err) {
    //             console.log(err.message);
    //             return
    //         } else {
    //             length = result.length;
    //             roomNum(length);
    //         }
    //     })
    // })
    // //查房间数
    // function roomNum(length) {
    //     let sql = 'SELECT tr.room_id,tp.party_id,tp.player_beans,tp.player_img,tp.player_name FROM	t_room AS tr LEFT JOIN t_player AS tp ON tr.room_id = tp.room_id';
    //     let resultData = [];
    //     let obj = {}
    //     let newArr = [];
    //     let markArr = [];
    //     let arr, markId;
    //     connect.query(sql, function (err, result) {
    //         if (err) {
    //             console.log(err.message);
    //             return
    //         }
    //         arr = result.sort(function (a, b) {
    //             var s = a['room_id'],
    //                 t = b['room_id'];

    //             return s < t ? -1 : 1;
    //         });
    //         markId = arr[0].room_id;
    //         if (length !== 'add') {
    //             if (length > result.length * 3) {
    //                 addRoom();
    //             } else {
    //                 result.forEach((item, i) => {

    //                     if (item['room_id'] === markId) {
    //                         markArr.push(item);
    //                     } else {
    //                         obj['id'] = markId;
    //                         obj['data'] = markArr;
    //                         newArr.push(obj);
    //                         obj = {};
    //                         markId = item['room_id'];
    //                         markArr = [item];

    //                     }
    //                 })
    //                 obj['id'] = markId;
    //                 obj['data'] = markArr;
    //                 newArr.push(obj)
    //                 newArr.forEach((item, i) => {
    //                     if (item.data.length == 1) {
    //                         if (item.data[0].party_id !== null && item.data[0].party_id !== undefined && item.data[0].party_id !== '') {
    //                             return true;
    //                         } else {
    //                             item.data = [];
    //                         }
    //                     }
    //                 })
    //                 socket.emit('hall', newArr);
    //             }
    //         } else {
    //             socket.emit('hall', result);
    //         }
    //     })


    // }

    // function roomNumFun(result) {
    //     let data = [];
    //     for (let i in result) {
    //         if (result[i].room_id == result[i + 1].room_id) {
    //             data.push(result[i]);
    //         }
    //     }
    //     return data;
    // }

    // //增加房间(一次增加4个)
    // function addRoom() {
    //     let sql = "INSERT INTO `test`.`t_room` (`room_title`, `room_status`) VALUES (NULL, NULL),(NULL, NULL),(NULL, NULL),(NULL, NULL)";
    //     connect.query(sql, function (err, result) {
    //         if (err) {
    //             console.log(err.message);
    //             return
    //         } else {
    //             console.log(result);
    //             roomNum('add');
    //         }
    //     })
    // }

    // //查房间的具体明细
    // socket.on('hallDetail', (data) => {
    //     let sql = 'select * from t_player';
    //     connect.query(sql, function (err, result) {
    //         if (err) {
    //             console.log(err.message);
    //             return
    //         } else {
    //             socket.emit('hallDetail', result);
    //         }
    //     })
    // })

    // //用户进入房间
    // socket.on('room', (data) => {
    //     //let sql = 'select * from t_player where _id='+'"'+data.partyId+'"'; 
    //     let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id WHERE a.room_id = ' + data.roomId;
    //     connect.query(sql, (err, result) => {
    //         if (err) {
    //             console.log(err.message);
    //             return;
    //         } else {
    //             if (result.length == 3) {
    //                 socket.emit('room', '该房间已满员，请换房间游戏，谢谢！');
    //             } else {
    //                 intoRoom(data);
    //             }
    //             return;
    //         }
    //     })
    // })

    // function intoRoom(data) {
    //     let sql = "update t_player set room_id = " + data.roomId + ",player_seat = '" + data.playerSeat + "' WHERE party_id = '" + data.partyId + "'"
    //     connect.query(sql, (err, result) => {
    //         if (err) {
    //             console.log(err.message);
    //             return;
    //         } else {
    //             console.log(result);
    //             socket.emit('room', true);
    //         }
    //     })
    // }

    // //游戏界面
    // socket.on('gamePage', (data) => {
    //     let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id WHERE a.room_id = ' + data.roomId;
    //     connect.query(sql, (err, result) => {
    //         if (err) {
    //             console.log(err.message);
    //             return;
    //         } else {
    //             if (result.length == 3) {
    //                 socket.emit('room', '该房间已满员，请换房间游戏，谢谢！');
    //             } else {
    //                 intoRoom(data);
    //             }
    //             return;
    //         }
    //     })
    // })


    // //发牌
    // socket.on('dealCards', (data) => {
    //     let options = dealCards();
    //     //let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id WHERE a.room_id = '+data.room_id//查room_id=1的 
    //     //let sql = 'update t_player set player_name = 'QW2' WHERE player_id = 1' //改player_id = 1 的 数据
    //     let p1 = JSON.stringify(one);
    //     let p2 = JSON.stringify(two);
    //     let p3 = JSON.stringify(three);
    //     let sql = "UPDATE t_player AS tp set tp.player_card =  case tp.player_id in (1,2,3) WHEN tp.player_id = 1 then '" + p1 + "' WHEN tp.player_id = 2 then '" + p2 + "' WHEN tp.player_id = 3 then '" + p3 + "' END where tp.room_id = 1"
    //     // let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id'//查所有的
    //     //查
    //     connect.query(sql, function (err, result) {
    //         if (err) {
    //             console.log('[SELECT ERROR] - ', err.message);
    //             return;
    //         }

    //         console.log('发牌')
    //         console.log(result);
    //         socket.emit('dealCards', options);

    //     });
    // })


    // //选择房间座位
    // socket.on('sit', function (data) {
    //     let user_id = Number(data.userId);
    //     let userSql = 'SELECT * FROM users where id=' + user_id;
    //     let updateUser = 'update users set roomId=?,locationSit =?  where id =?';
    //     let val = [data.id, data.location, user_id];
    //     connect.query(userSql, (err, result) => {

    //         let sql = 'SELECT * FROM gamehall';
    //         if (result[0].locationSit === '') {
    //             connect.query(updateUser, val, (err, result) => {
    //                 connect.query(userSql, (err, result) => {
    //                     let location = "";
    //                     if (data.location === 'p1') {
    //                         location = 'leftSit';
    //                     } else if (data.location === 'p2') {
    //                         location = 'bottomSit';
    //                     } else if (data.location === 'p3') {
    //                         location = 'rightSit';
    //                     }
    //                     let upDataSql = 'update gamehall set ' + location + ' =?  where roomId =?';
    //                     let upDateValue = [`${JSON.stringify(result[0])}`, Number(data.id)];

    //                     connect.query(upDataSql, upDateValue, (err, result) => {
    //                         connect.query(sql, (err, result) => {
    //                             io.sockets.emit('getHallInfo', result);
    //                         });
    //                     });
    //                 });
    //             });

    //         }

    //     });


    // })

    // //退出大厅

    // socket.on('exitHall', (data) => {
    //     let sql = 'SELECT * FROM users,gamehall where users.roomId=gamehall.roomId and id=' + Number(data.userId);
    //     connect.query(sql, (err, result) => {
    //         if (result.length > 0) {
    //             let bearing = '';
    //             if (result[0].locationSit === 'p1') {
    //                 bearing = 'leftSit';
    //             } else if (result[0].locationSit === 'p2') {
    //                 bearing = 'bottomSit';
    //             } else if (result[0].locationSit === 'p3') {
    //                 bearing = 'rightSit';
    //             }
    //             let upDataSql = 'update gamehall set ' + bearing + ' =?  where roomId =?';
    //             let upDateValue = ['', Number(result[0].roomId)];

    //             connect.query(upDataSql, upDateValue, (err, result) => {
    //                 let userSql = 'update users set locationSit=? where id =?';
    //                 let val = ['', Number(data.userId)];
    //                 connect.query(userSql, val, (err, result) => {
    //                     let roomSql = 'SELECT * FROM gamehall';
    //                     connect.query(roomSql, (err, result) => {

    //                         io.sockets.emit('getHallInfo', result);
    //                         socket.emit('exitHall', Number(data.userId));
    //                     });
    //                 });
    //             });
    //         } else {
    //             socket.emit('exitHall', Number(data.userId));
    //         }

    //     });
    // });

    // //判断牌型
    // socket.on('typeJudge', (data) => {
    //     let options = typeJudge(data);
    //     socket.emit('typeJudge', options);
    // })
    // //出牌（比较大小）
    // socket.on('palyCard', (data) => {
    //     let options;
    //     if (maxCard.length > 0) {
    //         maxCard.push(data);
    //         options = thanCard(maxCard[0], maxCard[1])
    //         socket.emit('palyCard', options)
    //         maxCard.splice(0, 1);
    //     } else {
    //         maxCard.push(data);
    //         options = true;
    //         socket.emit('palyCard', options)
    //     }
    // })
    // function dealCards() {

    //     let total = 17;
    //     let cards = Cards.slice(0);
    //     for (let i = 0; i < 3; i++) {
    //         hiddenCards[i] = getOneCard(cards);
    //     }
    //     for (let i = 0; i < total; i++) {
    //         one[i] = getOneCard(cards);
    //     }
    //     for (let i = 0; i < total; i++) {
    //         two[i] = getOneCard(cards);
    //     }
    //     for (let i = 0; i < total; i++) {
    //         three[i] = getOneCard(cards);
    //     }
    //     one = one.sort(cardSort);
    //     two = two.sort(cardSort);
    //     three = three.sort(cardSort);

    //     return {
    //         one,
    //         two,
    //         three
    //     }
    // }
    // //随机取一张牌
    // function getOneCard(cards) {
    //     return cards.splice(Math.ceil(Math.random() * cards.length - 1), 1)[0];
    // }
    // //给牌排序
    // function cardSort(a, b) {
    //     var va = parseInt(a.val);
    //     var vb = parseInt(b.val);
    //     if (va === vb) {
    //         return a.type > b.type ? 1 : -1;
    //     } else if (va > vb) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // }
    // let valCount = function (cards) {
    //     let result = [];
    //     let addCount = function (result, v) {
    //         for (let i = 0; i < result.length; i++) {
    //             if (result[i].val == v) {
    //                 result[i].count++;
    //                 return;
    //             }
    //         }
    //         result.push({ 'val': v, 'count': 1 });
    //     };
    //     for (let i = 0; i < cards.length; i++) {
    //         addCount(result, cards[i].val);
    //     }
    //     return result;
    // };
    // //获取指定张数的最大牌值
    // let getMaxVal = function (cards, n) {
    //     let c = valCount(cards);
    //     let max = 0;
    //     for (let i = 0; i < c.length; i++) {
    //         if (c[i].count === n && c[i].val > max) {
    //             max = c[i].val;
    //         }
    //     }
    //     return max;
    // };
    // //是否是对子
    // let isPairs = function (cards) {
    //     return cards.length == 2 && cards[0].val === cards[1].val
    // }
    // //是否是三根
    // let isThree = function (cards) {
    //     return cards.length == 3 && cards[0].val === cards[1].val && cards[1].val === cards[2].val
    // }
    // //是否是三带一
    // let isThreeWithOne = function (cards) {
    //     if (cards.length !== 4) return false;
    //     let c = valCount(cards);
    //     return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
    // };
    // //是否是三带二
    // let isThreeWithPairs = function (cards) {
    //     if (cards.length != 5) return false;
    //     var c = valCount(cards);
    //     return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
    // };
    // //是否是顺子
    // let isProgression = function (cards) {
    //     if (cards.length < 5 || cards[0].val === 15) return false;
    //     for (let i = 0; i < cards.length; i++) {
    //         if (i != (cards.length - 1) && (cards[i].val + 1) != cards[i + 1].val) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };
    // //是否是连对
    // let isProgressionPairs = function (cards) {
    //     if (cards.length < 6 || cards.length % 2 != 0 || cards[0].val === 15) return false;
    //     for (let i = 0; i < cards.length; i += 2) {
    //         if (i != (cards.length - 2) && (cards[i].val != cards[i + 1].val || (cards[i].val + 1) != cards[i + 2].val)) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };
    // //是否是飞机
    // let isPlane = function (cards) {
    //     if (cards.length < 6 || cards.length % 3 != 0 || cards[0].val === 15) return false;
    //     for (let i = 0; i < cards.length; i += 3) {
    //         if (i != (cards.length - 3) && (cards[i].val != cards[i + 1].val || cards[i].val != cards[i + 2].val || (cards[i].val + 1) != cards[i + 3].val)) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };
    // //是否是飞机带单
    // let isPlaneWithOne = function (cards) {
    //     if (cards.length < 8 || cards.length % 4 != 0) return false;
    //     let c = valCount(cards),
    //         threeList = [],
    //         threeCount = cards.length / 4;
    //     for (let i = 0; i < c.length; i++) {
    //         if (c[i].count == 3) {
    //             threeList.push(c[i]);
    //         }
    //     }
    //     if (threeList.length != threeCount || threeList[0].val === 15) {//检测三根数量和不能为2
    //         return false;
    //     }
    //     for (i = 0; i < threeList.length; i++) {//检测三根是否连续
    //         if (i != threeList.length - 1 && threeList[i].val + 1 != threeList[i + 1].val) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };
    // //是否是飞机带对
    // let isPlaneWithPairs = function (cards) {
    //     if (cards.length < 10 || cards.length % 5 != 0) return false;
    //     var c = valCount(cards),
    //         threeList = [],
    //         pairsList = [],
    //         groupCount = cards.length / 5;
    //     for (var i = 0; i < c.length; i++) {
    //         if (c[i].count == 3) {
    //             threeList.push(c[i]);
    //         }
    //         else if (c[i].count == 2) {
    //             pairsList.push(c[i]);
    //         } else {
    //             return false;
    //         }
    //     }
    //     if (threeList.length != groupCount || pairsList.length != groupCount || threeList[0].val === 15) {//检测三根数量和对子数量和不能为2
    //         return false;
    //     }
    //     for (let i = 0; i < threeList.length; i++) {//检测三根是否连续
    //         if (i != threeList.length - 1 && threeList[i].val + 1 != threeList[i + 1].val) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };
    // //是否是四带二
    // let isFourWithTwo = function (cards) {
    //     var c = valCount(cards);
    //     if (cards.length != 6 || c.length > 3) return false;
    //     for (let i = 0; i < c.length; i++) {
    //         if (c[i].count === 4)
    //             return true;
    //     }
    //     return false;
    // };
    // //是否是四带两个对
    // let isFourWithPairs = function (cards) {
    //     if (cards.length != 8) return false;
    //     let c = valCount(cards);
    //     if (c.length != 3) return false;
    //     for (let i = 0; i < c.length; i++) {
    //         if (c[i].count != 4 && c[i].count != 2)
    //             return false;
    //     }
    //     return true;
    // };
    // //是否是炸弹
    // let isBomb = function (cards) {
    //     return cards.length === 4 && cards[0].val === cards[1].val && cards[0].val === cards[2].val && cards[0].val === cards[3].val;
    // };
    // //是否是王炸
    // let isKingBomb = function (cards) {
    //     return cards.length === 2 && cards[0].type == '0' && cards[1].type == '0';
    // };
    // //判断牌型
    // let typeJudge = function (cards) {
    //     let len = cards.length;
    //     switch (len) {
    //         case 1:
    //             return { 'cardKind': self.ONE, 'val': cards[0].val, 'size': len };
    //         case 2:
    //             if (isPairs(cards))
    //                 return { 'cardKind': self.PAIRS, 'val': cards[0].val, 'size': len };
    //             else if (isKingBomb(cards))
    //                 return { 'cardKind': self.KING_BOMB, 'val': cards[0].val, 'size': len };
    //             else
    //                 return null;
    //         case 3:
    //             if (isThree(cards))
    //                 return { 'cardKind': self.THREE, 'val': cards[0].val, 'size': len };
    //             else
    //                 return null;
    //         case 4:
    //             if (isThreeWithOne(cards)) {
    //                 return { 'cardKind': self.THREE_WITH_ONE, 'val': getMaxVal(cards, 3), 'size': len };
    //             } else if (isBomb(cards)) {
    //                 return { 'cardKind': self.BOMB, 'val': cards[0].val, 'size': len };
    //             }
    //             return null;
    //         default:
    //             if (isProgression(cards))
    //                 return { 'cardKind': self.PROGRESSION, 'val': cards[0].val, 'size': len };
    //             else if (isProgressionPairs(cards))
    //                 return { 'cardKind': self.PROGRESSION_PAIRS, 'val': cards[0].val, 'size': len };
    //             else if (isThreeWithPairs(cards))
    //                 return { 'cardKind': self.THREE_WITH_PAIRS, 'val': getMaxVal(cards, 3), 'size': len };
    //             else if (isPlane(cards))
    //                 return { 'cardKind': self.PLANE, 'val': getMaxVal(cards, 3), 'size': len };
    //             else if (isPlaneWithOne(cards))
    //                 return { 'cardKind': self.PLANE_WITH_ONE, 'val': getMaxVal(cards, 3), 'size': len };
    //             else if (isPlaneWithPairs(cards))
    //                 return { 'cardKind': self.PLANE_WITH_PAIRS, 'val': getMaxVal(cards, 3), 'size': len };
    //             else if (isFourWithTwo(cards))
    //                 return { 'cardKind': self.FOUR_WITH_TWO, 'val': getMaxVal(cards, 4), 'size': len };
    //             else if (isFourWithPairs(cards))
    //                 return { 'cardKind': self.FOUR_WITH_TWO_PAIRS, 'val': getMaxVal(cards, 4), 'size': len };
    //             else
    //                 return null;

    //     }

    // };

    // //比较出牌大小
    // function thanCard(maxCard, playCard) {
    //     let maxType = typeJudge(maxCard);
    //     let playType = typeJudge(playCard);
    //     switch (maxType.cardKind) {
    //         case 1:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 2:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 3:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 4:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 5:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 6:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 7:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 8:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 9:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 10:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 11:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 12:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 13 || playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }
    //         case 13:
    //             if (maxType == null || playType == null) return false;
    //             if (maxType.cardKind == playType.cardKind) {
    //                 if (playType.val > maxType.val) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 if (playType.cardKind == 14) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             }

    //         default:
    //             break;
    //     }
    // }

};

