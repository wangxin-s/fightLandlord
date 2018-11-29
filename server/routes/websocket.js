/**
 * Created by ex-wangxin on 2018/9/13.
 */
var connect = require("./connect");
var moduleData = {
    code: 200,
    msg: '成功'
}

var serverData = {
    code: 200,
    msg: '成功'
}

let Cards = [
    {icon: 53, type: '0', val: 17},
    {icon: 52, type: '0', val: 16},
    {icon: 44, type: '1', val: 14},
    {icon: 48, type: '1', val: 15},
    {icon: 0, type: '1', val: 3},
    {icon: 4, type: '1', val: 4},
    {icon: 8, type: '1', val: 5},
    {icon: 12, type: '1', val: 6},
    {icon: 16, type: '1', val: 7},
    {icon: 20, type: '1', val: 8},
    {icon: 24, type: '1', val: 9},
    {icon: 28, type: '1', val: 10},
    {icon: 32, type: '1', val: 11},
    {icon: 36, type: '1', val: 12},
    {icon: 40, type: '1', val: 13},
    {icon: 45, type: '2', val: 14},
    {icon: 49, type: '2', val: 15},
    {icon: 1, type: '2', val: 3},
    {icon: 5, type: '2', val: 4},
    {icon: 9, type: '2', val: 5},
    {icon: 13, type: '2', val: 6},
    {icon: 17, type: '2', val: 7},
    {icon: 21, type: '2', val: 8},
    {icon: 25, type: '2', val: 9},
    {icon: 29, type: '2', val: 10},
    {icon: 33, type: '2', val: 11},
    {icon: 37, type: '2', val: 12},
    {icon: 41, type: '2', val: 13},
    {icon: 46, type: '3', val: 14},
    {icon: 50, type: '3', val: 15},
    {icon: 2, type: '3', val: 3},
    {icon: 6, type: '3', val: 4},
    {icon: 10, type: '3', val: 5},
    {icon: 14, type: '3', val: 6},
    {icon: 18, type: '3', val: 7},
    {icon: 22, type: '3', val: 8},
    {icon: 26, type: '3', val: 9},
    {icon: 30, type: '3', val: 10},
    {icon: 34, type: '3', val: 11},
    {icon: 38, type: '3', val: 12},
    {icon: 42, type: '3', val: 13},
    {icon: 47, type: '4', val: 14},
    {icon: 51, type: '4', val: 15},
    {icon: 3, type: '4', val: 3},
    {icon: 7, type: '4', val: 4},
    {icon: 11, type: '4', val: 5},
    {icon: 15, type: '4', val: 6},
    {icon: 19, type: '4', val: 7},
    {icon: 23, type: '4', val: 8},
    {icon: 27, type: '4', val: 9},
    {icon: 31, type: '4', val: 10},
    {icon: 35, type: '4', val: 11},
    {icon: 39, type: '4', val: 12},
    {icon: 43, type: '4', val: 13}
];
let cards = Cards.slice(0);
let self = {
    ONE: 1,
    PAIRS: 2,
    THREE: 3,
    THREE_WITH_ONE: 4,
    THREE_WITH_PAIRS: 5,
    PROGRESSION: 6,
    PROGRESSION_PAIRS: 7,
    PLANE: 8,
    PLANE_WITH_ONE: 9,
    PLANE_WITH_PAIRS: 10,
    FOUR_WITH_TWO: 11,
    FOUR_WITH_TWO_PAIRS: 12,
    BOMB: 13,
    KING_BOMB: 14,
}
let maxCard = [];//当前牌面上最大的牌
let one = [], two = [], three = [], hiddenCards = [];
let data = {
    roomList: [
        /*{
         "roomId": 1,
         "roomNum": "room1",
         topCard: [],
         position:'',
         count:'',当前叫地主次数
         callOrNo:{},
         p1: {
         id: '2',
         account: 'admin2',
         isLogin: false,
         roomId: '1',
         locationSit: 'p1',
         password: '000000',
         headImg: 'https://pic.qqtn.com/up/2017-9/15063376742826581.jpg',

         //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
         // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
         // hasDisCard--已出牌

         isReady: 'ready',
         card: [],//当前未出的牌
         outCard: [],//已出的牌
         beanNum: '100',//豆子数量
         cardNum: '17',//还有多少张牌
         playType: 'farmer',//Landlord 地主  farmer 农民
         },//左侧玩家数据
         p2: {
         id: '0',
         account: 'admin',
         isLogin: false,
         roomId: '1',
         locationSit: 'p2',
         password: '000000',
         headImg: 'https://pic.qqtn.com/up/2017-9/15063376742826581.jpg',
         //ready--准备按钮  readyEd--已准备  robAndNo--抢·不抢  rob--抢地主  noRob--不抢 discardOrNo--出牌·不出   discard--出牌  noDiscard--不出  hasDisCard--已出牌
         isReady: 'ready',
         card: [],//当前未出的牌
         outCard: [],//已出的牌
         beanNum: '100',//豆子数量
         cardNum: '17',//还有多少张牌
         playType: 'farmer',//Landlord 地主  farmer 农民
         },//右侧玩家数据
         p3: {
         id: '1',
         account: 'admin1',
         isLogin: false,
         roomId: '1',
         locationSit: 'p3',
         password: '000000',
         headImg: 'https://pic.qqtn.com/up/2017-9/15063376742826581.jpg',
         //ready--准备按钮  readyEd--已准备  robAndNo--抢·不抢  rob--抢地主  noRob--不抢 discardOrNo--出牌·不出   discard--出牌  noDiscard--不出  hasDisCard--已出牌
         isReady: 'ready',
         card: [],//当前未出的牌
         outCard: [],//已出的牌
         beanNum: '100',//豆子数量
         cardNum: '17',//还有多少张牌
         playType: 'landlord',//Landlord 地主  farmer 农民
         }//当前玩家数据
         },*/
    ]
};
//空白数据
let blankData = {
    id: '',
    account: '',
    isLogin: '',
    roomId: '',
    locationSit: '',
    password: '',
    headImg: '',
    //ready--准备按钮  readyEd--已准备  robAndNo--抢·不抢  rob--抢地主  noRob--不抢 discardOrNo--出牌·不出   discard--出牌  noDiscard--不出  hasDisCard--已出牌
    isReady: 'ready',
    card: [],//当前未出的牌
    outCard: [],//已出的牌
    beanNum: '',//豆子数量
    cardNum: '',//还有多少张牌
    playType: 'farmer',//Landlord 地主  farmer 农民
};

//已经登陆的用户缓存信息
let loginUserInfo = {};
var robTime = null;//抢地主定时器
var robTimeCount = 0;
var roomRobTime={

};
exports.websocket = function websocket(socket, io) {
    var obj = {
        list: [],
        myCard: [],
        left: [],
        right: [],
        bottomCard: []
    };

    // 登录
    socket.on('login', (data)=> {
        let num = parseInt(Math.random() * 10000);
        let sql = 'select * from users where account=' + '"' + data.account + '"';
        let insert = "INSERT INTO `users`(`account`, `password`) VALUES ('" + data.account + "','" + data.password + "')";
        connect.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            if (result.length > 0) {
                if (result[0].password == data.password) {
                    serverData.data = result[0];
                    loginUserInfo[serverData.data.id] = serverData.data;
                    socket.emit('login', serverData);
                    return;
                } else {
                    serverData.code = 202;
                    serverData.msg = '密码错误';
                    socket.emit('login', serverData);
                    return;
                }
            } else {
                connect.query(insert, function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        return;
                    } else {
                        serverData.data = 'YH' + num;
                        socket.emit('login', serverData);
                        return;
                    }
                })
            }
        })
    });
    //登录用户的资料
    socket.on('loginer', (data)=> {
        let sql = "select * from t_player where party_id = '" + data.partyId + "'";
        connect.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return
            } else {
                socket.emit('loginer', result)
            }
        })
    })

    //创建房间
    socket.on('hall', (data)=> {
        let sql = 'select * from t_player where player_status = "Y"';
        let length;

        connect.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return
            } else {
                length = result.length;
                roomNum(length);
            }
        })
    })
    //查房间数
    function roomNum(length) {
        let sql = 'SELECT tr.room_id,tp.party_id,tp.player_beans,tp.player_img,tp.player_name FROM	t_room AS tr LEFT JOIN t_player AS tp ON tr.room_id = tp.room_id';
        let resultData = [];
        let obj = {}
        let newArr = [];
        let markArr = [];
        let arr, markId;
        connect.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return
            }
            arr = result.sort(function (a, b) {
                var s = a['room_id'],
                    t = b['room_id'];

                return s < t ? -1 : 1;
            });
            markId = arr[0].room_id;
            if (length !== 'add') {
                if (length > result.length * 3) {
                    addRoom();
                } else {
                    result.forEach((item, i)=> {

                        if (item['room_id'] === markId) {
                            markArr.push(item);
                        } else {
                            obj['id'] = markId;
                            obj['data'] = markArr;
                            newArr.push(obj);
                            obj = {};
                            markId = item['room_id'];
                            markArr = [item];

                        }
                    })
                    obj['id'] = markId;
                    obj['data'] = markArr;
                    newArr.push(obj)
                    newArr.forEach((item, i)=> {
                        if (item.data.length == 1) {
                            if (item.data[0].party_id !== null && item.data[0].party_id !== undefined && item.data[0].party_id !== '') {
                                return true;
                            } else {
                                item.data = [];
                            }
                        }
                    })
                    socket.emit('hall', newArr);
                }
            } else {
                socket.emit('hall', result);
            }
        })


    }

    function roomNumFun(result) {
        let data = [];
        for (let i in result) {
            if (result[i].room_id == result[i + 1].room_id) {
                data.push(result[i]);
            }
        }
        return data;
    }

    //增加房间(一次增加4个)
    function addRoom() {
        let sql = "INSERT INTO `test`.`t_room` (`room_title`, `room_status`) VALUES (NULL, NULL),(NULL, NULL),(NULL, NULL),(NULL, NULL)";
        connect.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return
            } else {
                console.log(result);
                roomNum('add');
            }
        })
    }

    //查房间的具体明细
    socket.on('hallDetail', (data)=> {
        let sql = 'select * from t_player';
        connect.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return
            } else {
                socket.emit('hallDetail', result);
            }
        })
    })

    //用户进入房间
    socket.on('room', (data)=> {
        //let sql = 'select * from t_player where _id='+'"'+data.partyId+'"'; 
        let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id WHERE a.room_id = ' + data.roomId;
        connect.query(sql, (err, result)=> {
            if (err) {
                console.log(err.message);
                return;
            } else {
                if (result.length == 3) {
                    socket.emit('room', '该房间已满员，请换房间游戏，谢谢！');
                } else {
                    intoRoom(data);
                }
                return;
            }
        })
    })

    //快速匹配接口
    socket.on('fastMatching', (res)=> {
        var roomList = data.roomList;
        var item = searchRoomId(res.id);
        var userInfo = loginUserInfo[res.id];
        var id = res.id;
        if (typeof item.index == 'undefined') {
            joinRoom(userInfo);
        }
        console.log('---------fastMatching-----------');
        socket.join(item.index, function (res) {
            var newItem = searchRoomId(id);
            getUserInfoFun(newItem, newItem.index, '1000', false);//向前端发送房间信息
            /*newData.p1.card=[];
             newData.p2.card=[];
             newData.p3.card=[];
             io.to(item.index).emit('getUserInfo', {
             data: newData,
             position: item.position
             });*/
        }); // join(房间名)加入房间
    });

    function intoRoom(data) {
        let sql = "update t_player set room_id = " + data.roomId + ",player_seat = '" + data.playerSeat + "' WHERE party_id = '" + data.partyId + "'"
        connect.query(sql, (err, result)=> {
            if (err) {
                console.log(err.message);
                return;
            } else {
                console.log(result);
                socket.emit('room', true);
            }
        })
    }

    //游戏界面
    socket.on('gamePage', (data)=> {
        let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id WHERE a.room_id = ' + data.roomId;
        connect.query(sql, (err, result)=> {
            if (err) {
                console.log(err.message);
                return;
            } else {
                if (result.length == 3) {
                    socket.emit('room', '该房间已满员，请换房间游戏，谢谢！');
                } else {
                    intoRoom(data);
                }
                return;
            }
        })
    })

    //发牌
    socket.on('dealCards', (data)=> {
        let options = dealCards();
        //let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id WHERE a.room_id = '+data.room_id//查room_id=1的 
        //let sql = 'update t_player set player_name = 'QW2' WHERE player_id = 1' //改player_id = 1 的 数据
        let p1 = JSON.stringify(one);
        let p2 = JSON.stringify(two);
        let p3 = JSON.stringify(three);
        let sql = "UPDATE t_player AS tp set tp.player_card =  case tp.player_id in (1,2,3) WHEN tp.player_id = 1 then '" + p1 + "' WHEN tp.player_id = 2 then '" + p2 + "' WHEN tp.player_id = 3 then '" + p3 + "' END where tp.room_id = 1"
        // let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id'//查所有的
        //查
        connect.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }

            console.log('发牌')
            console.log(result);
            socket.emit('dealCards', options);

        });
    })

    //获取大厅数据
    socket.on('getHallInfo', (res)=> {
        let roomList = cloneFun(data.roomList);
        roomList.forEach((item, i)=> {
            roomList[i] = {
                "roomId": i,
                "roomNum": "room1",
                "leftSit": roomList[i].p1,
                "bottomSit": roomList[i].p2,
                "rightSit": roomList[i].p3,
            }
        });
        socket.emit('getHallInfo', roomList);
    });

    //选择房间座位
    socket.on('sit', function (res) {
        var roomIndex = res.roomId;
        var userInfo = loginUserInfo[res.id];
        var newBlankData = cloneFun(blankData);
        var position = res.location;
        newBlankData.id = userInfo.id;
        newBlankData.account = userInfo.account;
        newBlankData.password = userInfo.password;
        newBlankData.beanNum = userInfo.beanNum;
        newBlankData.headImg = userInfo.headImg;
        newBlankData.locationSit = position;
        newBlankData.roomId = roomIndex;
        data.roomList[roomIndex][position] = newBlankData;
        let roomList1 = cloneFun(data.roomList);
        roomList1.forEach((item, i)=> {
            roomList1[i] = {
                "roomId": i,
                "roomNum": "room1",
                "leftSit": roomList1[i].p1,
                "bottomSit": roomList1[i].p2,
                "rightSit": roomList1[i].p3,
            }
        });
        io.sockets.emit("getHallInfo", roomList1);
    })

    //退出大厅
    socket.on('exitHall', (data)=> {
        let sql = 'SELECT * FROM users,gamehall where users.roomId=gamehall.roomId and id=' + Number(data.userId);
        connect.query(sql, (err, result)=> {
            if (result.length > 0) {
                let bearing = '';
                if (result[0].locationSit === 'p1') {
                    bearing = 'leftSit';
                } else if (result[0].locationSit === 'p2') {
                    bearing = 'bottomSit';
                } else if (result[0].locationSit === 'p3') {
                    bearing = 'rightSit';
                }
                let upDataSql = 'update gamehall set ' + bearing + ' =?  where roomId =?';
                let upDateValue = ['', Number(result[0].roomId)];

                connect.query(upDataSql, upDateValue, (err, result)=> {
                    let userSql = 'update users set locationSit=? where id =?';
                    let val = ['', Number(data.userId)];
                    connect.query(userSql, val, (err, result)=> {
                        let roomSql = 'SELECT * FROM gamehall';
                        connect.query(roomSql, (err, result)=> {

                            io.sockets.emit('getHallInfo', result);
                            socket.emit('exitHall', Number(data.userId));
                        });
                    });
                });
            } else {
                socket.emit('exitHall', Number(data.userId));
            }

        });
    });

    //当前玩家离开页面销毁当前 socket
    socket.on('leave-hall', function () {
        //socket.close();
    });

    /*socket.on('disconnect', function () {
     console.log('断开连接');
     });*/


    /*游戏界面  相关接口 start--------------------   */
    socket.on('enterRoom', function (res) {
        console.log('-----------后端接收到进入房间的消息--------------');
        var roomList = data.roomList;
        var item = searchRoomId(res.id);
        let rooms = Object.keys(socket.rooms);
        socket.join(item.index, function (res) {
            console.log('----------')
            let rooms = Object.keys(socket.rooms);
            getUserInfoFun(item, item.index, '1000', true);//向前端发送房间信息
            /*io.to(item.index).emit('getUserInfo', {
             roomId: item.index,
             data: data.roomList[item.index],
             position: item.position
             });*/
        }); // join(房间名)加入房间
        let roomList1 = cloneFun(data.roomList);
        roomList1.forEach((item, i)=> {
            roomList1[i] = {
                "roomId": i,
                "roomNum": "room1",
                "leftSit": roomList1[i].p1,
                "bottomSit": roomList1[i].p2,
                "rightSit": roomList1[i].p3,
            }
        });
        io.sockets.emit("getHallInfo", roomList1);
    });

    //用户点击开始游戏--接口
    socket.on('ready-action', (res)=> {
        let item = searchRoomId(res.id);
        let index = item.index;
        let position = item.position;
        data.roomList[index][position].isReady = 'readyEd';
        checkAllReady(data.roomList[index], index);//判断当前房间玩家是否都已经准备--如果都准备开始发牌
        let rooms = Object.keys(socket.rooms);
        getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
        /*io.to(index).emit('getUserInfo', {
         getCard:true,
         code:1000,
         roomId: item.index,
         data: data.roomList[item.index],
         position: item.position
         });*/
    });

    //向前端发送房间信息方法
    function getUserInfoFun(item, index, code, getCard, winId) {
        let newData = cloneFun(data.roomList[index]);
        newData.p1.card = [];
        newData.p2.card = [];
        newData.p3.card = [];
        newData.topCard = [];
        if (typeof winId != 'undefined') {
            io.to(index).emit('getUserInfo', {
                winId: winId,
                getCard: getCard,
                code: code,
                roomId: item.index,
                data: newData,
                position: item.position
            });
        } else {
            io.to(index).emit('getUserInfo', {
                getCard: getCard,
                code: code,
                roomId: item.index,
                data: newData,
                position: item.position
            });
        }

    }

    //叫地主或者不叫地主
    socket.on('call-landlord', function (res) {
        let item = searchRoomId(res.id);
        let index = item.index;
        let type = res.type;//叫地主  不叫
        if(roomRobTime[index]){

        }else{
            roomRobTime[index]={
                robTime:null,
                robTimeCount:30,
            }
        }
        clearInterval(roomRobTime[index].robTime);
        callOrNo(res.id, res.type);
    });

    //叫或者不叫地主方法
    function callOrNo(id, type) {
        let item = searchRoomId(id);
        let position = item.position;
        let index = item.index;
        data.roomList[index].count++;
        //callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫
        if (type == 'callLan') {
            data.roomList[index][position].callOrNo = 'callLan';//叫地主状态
            data.roomList[index][position].isReady = 'callLan';//叫地主状态
        } else {//不叫
            data.roomList[index][position].callOrNo = 'noCallLan';//叫地主状态
            data.roomList[index][position].isReady = 'noCallLan';//叫地主状态
        }
        let p1_call = data.roomList[index].p1.isReady;
        let p2_call = data.roomList[index].p2.isReady;
        let p3_call = data.roomList[index].p3.isReady;
        //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
        // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
        // hasDisCard--已出牌

        if (p1_call == 'noCallLan' && p2_call == 'noCallLan' && p3_call == 'noCallLan') {//（3）1 不叫  2 不叫  3 不叫   --重新发牌
            console.log('全部不叫--重新发牌', data.roomList[index]);
            data.roomList[index].p1.isReady = 'readyEd';
            data.roomList[index].p2.isReady = 'readyEd';
            data.roomList[index].p3.isReady = 'readyEd';
            roomRobTime[index].robTimeCount=30;
            roomRobTime[index].robTime=null;
            data.roomList[index].count = 0;
            checkAllReady(data.roomList[index], index);
            getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
        } else {
            let newPosition = '';
            let sPosition = '';
            let newId = '';
            let sId = '';
            if (position == 'p1') {
                newPosition = 'p2';
                sPosition = 'p3';
            } else if (position == 'p2') {
                newPosition = 'p3';
                sPosition = 'p1';
            } else if (position == 'p3') {
                newPosition = 'p1';
                sPosition = 'p2';
            }
            newId = data.roomList[index][newPosition].id;
            sId = data.roomList[index][sPosition].id;
            if (type == 'callLan') {
                if (data.roomList[index].count >= 3) {//叫地主--抢地主结束开始出牌
                    data.roomList[index].p1.isReady = 'discard';
                    data.roomList[index].p2.isReady = 'discard';
                    data.roomList[index].p3.isReady = 'discard';
                    data.roomList[index][position].isReady = 'discardOrNo';
                    //playType: 'farmer',//Landlord 地主  farmer 农民
                    data.roomList[index][position].playType = 'landlord';
                    data.roomList[index][position].card = data.roomList[index][position].card.concat(data.roomList[index].topCard);
                    data.roomList[index][position].card = sortFun(data.roomList[index][position].card);
                    data.roomList[index][position].cardNum = data.roomList[index][position].card.length;
                    outCardTimer(id, 2000);
                    setTopCard(index);//向前端发送底牌
                    getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
                } else {
                    data.roomList[index][newPosition].isReady = 'robAndNo';
                    robTimeFun(sId, 'noRob');//调用--抢地主定时器
                    getUserInfoFun(item, index, '1000', false);//向前端发送房间信息
                }
            } else {
                data.roomList[index][newPosition].isReady = 'callOrNo';
                callLanTime(newId, 'noCallLan');
                getUserInfoFun(item, index, '1000', false);//向前端发送房间信息
            }
        }
    }

    //叫地主定时器
    function callLanTime(id) {
        let item = searchRoomId(id);
        let index = item.index;
        console.log('-------叫地主定时器被触发---------');
        if(roomRobTime[index]){
            clearInterval(roomRobTime[index].robTime);
        }else{
            roomRobTime[index]={
                robTime:null,
                robTimeCount:30,
            }
        }
        roomRobTime[index].robTimeCount = 30;
        roomRobTime[index].robTime = setInterval(function () {
            roomRobTime[index].robTimeCount--;
            console.log('------robTimeCount--------', roomRobTime[index].robTimeCount);
            if (roomRobTime[index].robTimeCount <= 0) {
                clearInterval(roomRobTime[index].robTime);
                console.log('------30秒时间到------', id);
                callOrNo(id, 'noCallLan');
            }
            setTimerNum(id, roomRobTime[index].robTimeCount);
        }, 1000)
    }

    //获取当前玩家牌--监听方法
    socket.on('get-my-card', function (res) {
        let item = searchRoomId(res.id);
        let index = item.index;
        let position = item.position;
        socket.emit('get-my-card', {
            code: 1000,
            card: data.roomList[index][position].card,
        })
    });

    //用户点击不抢按钮
    socket.on('not-rob', function (res) {
        robLandlordFun(res.id, res.type);
    });

    //用户点击抢地主
    //抢地主定时器方法
    function robTimeFun(id, type) {
        let item = searchRoomId(id);
        let index = item.index;
        console.log('-------抢地主定时器被触发---------');
        if (roomRobTime[index].robTime) {
            clearInterval(roomRobTime[index].robTime);
        }
        roomRobTime[index].robTimeCount = 30;
        roomRobTime[index].robTime = setInterval(function () {
            roomRobTime[index].robTimeCount--;
            console.log('------robTimeCount--------', roomRobTime[index].robTimeCount);
            if (roomRobTime[index].robTimeCount <= 0) {
                clearInterval(roomRobTime[index].robTime);
                console.log('------30秒时间到------', id);
                robLandlordFun(id, 'noCallLan');
            }
            setTimerNum(id, roomRobTime[index].robTimeCount);
        }, 1000)
    }

    socket.on('rob-landlord', function (res) {
        robLandlordFun(res.id, res.type);
    });

    //抢地主方法
    function robLandlordFun(id, type) {
        let item = searchRoomId(id);
        let index = item.index;
        clearInterval(roomRobTime[index].robTime);
        let position = item.position;
        let oldIsReady = data.roomList[index][position].isReady;//当前玩家--赋值前--状态
        data.roomList[index][position].isReady = type;
        data.roomList[index].count += 1;
        let newPosition = '';
        let sPosition = '';
        let newId = '';
        let sId = '';
        if (position == 'p1') {
            newPosition = 'p2';
            sPosition = 'p3';
        } else if (position == 'p2') {
            newPosition = 'p3';
            sPosition = 'p1';
        } else if (position == 'p3') {
            newPosition = 'p1';
            sPosition = 'p2';
        }
        newId = data.roomList[index][newPosition].id;
        sId = data.roomList[index][sPosition].id;
        //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
        // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
        // hasDisCard--已出牌

        function setVal(index, position, isReady) {
            data.roomList[index].p1.isReady = 'discard';
            data.roomList[index].p2.isReady = 'discard';
            data.roomList[index].p3.isReady = 'discard';
            data.roomList[index][position].isReady = isReady;
            //playType: 'farmer',//Landlord 地主  farmer 农民
            data.roomList[index][position].playType = 'landlord';
            data.roomList[index][position].card = data.roomList[index][position].card.concat(data.roomList[index].topCard);
            data.roomList[index][position].card = sortFun(data.roomList[index][position].card);
            data.roomList[index][position].cardNum = data.roomList[index][position].card.length;
        }

        let callCount = 0;//不叫地主玩家--数量
        if (data.roomList[index].p1.isReady == 'noCallLan') {
            callCount++;
        } else if (data.roomList[index].p2.isReady == 'noCallLan') {
            callCount++;
        } else if (data.roomList[index].p3.isReady == 'noCallLan') {
            callCount++;
        }
        if (callCount == 1) {//第一家   不叫地主
            if (data.roomList[index].count == 3) {
                if (type == 'rob') {//抢地主结束--开始出牌
                    setVal(index, position, 'discardOrNo');
                    outCardTimer(id, 2000);
                    setTopCard(index);//向前端发送底牌
                    getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
                } else {
                    setVal(index, sPosition, 'discardOrNo');
                    outCardTimer(sId, 2000);
                    setTopCard(index);//向前端发送底牌
                    getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
                }
            } else {
                data.roomList[index][newPosition].isReady = 'robAndNo';
                getUserInfoFun(item, index, '1000', false);//向前端发送房间信息
                robTimeFun(newId, 'noRob');
            }
        } else {
            let isReady = data.roomList[index][position].isReady;
            if (data.roomList[index].count == 3 && data.roomList[index][position].isReady == 'noRob' && data.roomList[index][sPosition].isReady == 'noRob') {
                setVal(index, newPosition, 'discardOrNo');//上上家（即下家）为地主
                outCardTimer(newId, 2000);//调用出牌定时器
                setTopCard(index);//向前端发送底牌
                getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
            } else if (data.roomList[index].count >= 4) {//抢地主回到开始叫地主的玩家时  ---抢地主结束  开始出牌
                let lanId = '';
                if (isReady == 'rob') {
                    setVal(index, position, 'discardOrNo');//当前玩家为地主
                    lanId = id;
                } else {
                    if (data.roomList[index][sPosition].isReady == 'rob') {
                        setVal(index, sPosition, 'discardOrNo');//上家
                        lanId = sId;
                    } else if (data.roomList[index][newPosition].isReady == 'rob') {
                        setVal(index, newPosition, 'discardOrNo');//上上家（即下家）为地主
                        lanId = newId;
                    } else {
                        setVal(index, position, 'discardOrNo');//当前玩家为地主
                        lanId = id;
                    }
                }
                outCardTimer(lanId, 2000);//调用出牌定时器
                setTopCard(index);//向前端发送底牌
                getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
            } else {
                data.roomList[index][newPosition].isReady = 'robAndNo';
                getUserInfoFun(item, index, '1000', false);//向前端发送房间信息
                robTimeFun(newId, 'noRob');
            }
        }
    }

    //用户离开房间
    socket.on('leave-room', function (res) {
        console.log('-----------leave-room触发-----------');
        let roomList = data.roomList;
        let item = searchRoomId(res.id);
        let index = item.index;
        let position = item.position;
        console.log(res, index, position, item, roomList);
        if (roomList[index][position].isReady == 'ready' || roomList[index][position].isReady == 'readyEd') {
            roomList[index][position] = cloneFun(blankData);
        } else {
            roomList[index][position].isLogin = false;
        }
        if (roomList[index].p1.id === '' && roomList[index].p2.id === "" && roomList[index].p3.id === '') {
            data.roomList.splice(index, 1);
        }

        let rooms = Object.keys(socket.rooms);
        getUserInfoFun(item, index, '1000', true);//向前端发送房间信息
        /* io.to(index).emit('getUserInfo', {
         roomId: item.index,
         data: data.roomList[item.index],
         position: item.position
         });*/
        let roomList1 = cloneFun(data.roomList);
        roomList1.forEach((item, i)=> {
            roomList1[i].leftSit = roomList1[i].p1;
            roomList1[i].bottomSit = roomList1[i].p2;
            roomList1[i].rightSit = roomList1[i].p3;
        });
        io.sockets.emit("getHallInfo", roomList1);
        //socket.close();
    });

    //用户出牌 或者不出
    socket.on('emit-card', function (res) {
        let roomList = data.roomList;
        let item = searchRoomId(res.id);
        let index = item.index;
        let position = item.position;
        let code = res.code;
        //1000 出牌 2000不出
        outCardFun(res.id, res.code, res.outCard);
    });

    //获取三张底牌
    function setTopCard(index) {
        io.to(index).emit('get-top-card', {
            code: 2000,
            topCard: data.roomList[index].topCard,
        })
    }

    //出牌或者不出定时器
    function outCardTimer(id) {
        let item = searchRoomId(id);
        let index = item.index;
        console.log('-------出牌定时器被触发---------');
        clearInterval(roomRobTime[index].robTime);
        roomRobTime[index].robTimeCount = 30;
        roomRobTime[index].robTime = setInterval(function () {
            roomRobTime[index].robTimeCount--;
            console.log('------robTimeCount--------', roomRobTime[index].robTimeCount);
            if (roomRobTime[index].robTimeCount <= 0) {
                clearInterval(roomRobTime[index].robTime);
                console.log('------30秒时间到------', id);
                outCardFun(id, 2000);
            }
            setTimerNum(id, roomRobTime[index].robTimeCount);
        }, 1000)
    }

    //出牌方法
    function outCardFun(id, code, outCard) {
        let roomList = data.roomList;
        let item = searchRoomId(id);
        let index = item.index;
        clearInterval(roomRobTime[index].robTime);
        let position = item.position;
        let newCode = code;
        //1000 出牌 2000不出
        let winId = '';
        let nextPosition = '';
        let nextId = '';
        let sPosition = '';
        let sId = '';
        if (!data.roomList[index].p1) {
            return;
        }
        let p1CardLen = data.roomList[index].p1.card.length;
        let p2CardLen = data.roomList[index].p2.card.length;
        let p3CardLen = data.roomList[index].p3.card.length;

        if (position == 'p1') {
            nextPosition = 'p2';
            sPosition = 'p3';
        } else if (position == 'p2') {
            nextPosition = 'p3';
            sPosition = 'p1';
        } else if (position == 'p3') {
            nextPosition = 'p1';
            sPosition = 'p2';
        }

        if (code == 2000) {
            data.roomList[index][position].isReady = 'noDiscard';
            data.roomList[index][position].outCard = [];

            if (position == 'p1') {
                nextPosition = 'p2';
                nextId = data.roomList[index].p2.id;
                if (data.roomList[index].p2.outCard.length <= 0 && data.roomList[index].p3.outCard.length <= 0) {
                    data.roomList[index][position].isReady = 'hasDisCard';
                    data.roomList[index][position].outCard = data.roomList[index][position].card.splice(p1CardLen - 1, 1);
                    data.roomList[index][position].cardNum = data.roomList[index][position].card.length;
                }
            } else if (position == 'p2') {
                nextPosition = 'p3';
                nextId = data.roomList[index].p3.id;
                if (data.roomList[index].p1.outCard.length <= 0 && data.roomList[index].p3.outCard.length <= 0) {
                    data.roomList[index][position].isReady = 'hasDisCard';
                    data.roomList[index][position].outCard = data.roomList[index][position].card.splice(p2CardLen - 1, 1);
                    data.roomList[index][position].cardNum = data.roomList[index][position].card.length;
                }
            } else if (position == 'p3') {
                nextPosition = 'p1';
                nextId = data.roomList[index].p1.id;
                if (data.roomList[index].p1.outCard.length <= 0 && data.roomList[index].p2.outCard.length <= 0) {
                    data.roomList[index][position].isReady = 'hasDisCard';
                    data.roomList[index][position].outCard = data.roomList[index][position].card.splice(p3CardLen - 1, 1);
                    data.roomList[index][position].cardNum = data.roomList[index][position].card.length;
                }
            }

        } else {
            data.roomList[index][position].isReady = 'hasDisCard';
            data.roomList[index][position].outCard = outCard;
            data.roomList[index][position].card = delFun(data.roomList[index][position].card, outCard);
            data.roomList[index][position].cardNum = data.roomList[index][position].card.length;
            nextId = data.roomList[index][nextPosition].id;
            sId = data.roomList[index][sPosition].id;
        }

        //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
        // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
        // hasDisCard--已出牌
        data.roomList[index][nextPosition].isReady = 'discardOrNo';
        data.roomList[index][nextPosition].outCard = [];

        if (data.roomList[index].p1.card.length <= 0 || data.roomList[index].p2.card.length <= 0 || data.roomList[index].p3.card.length <= 0) {
            newCode = 3000;
            data.roomList[index].gramPro = 'gramOver';//游戏状态-- getReady 准备中  running  进行中  gramOver  游戏结束
            winId = (data.roomList[index].p1.card.length <= 0 ? data.roomList[index].p1.id : winId);
            winId = (data.roomList[index].p2.card.length <= 0 ? data.roomList[index].p2.id : winId);
            winId = (data.roomList[index].p3.card.length <= 0 ? data.roomList[index].p3.id : winId);
            data.roomList[index].p1.card = [];
            data.roomList[index].p1.isReady = 'ready';
            data.roomList[index].p1.outCard = [];
            data.roomList[index].p1.cardNum = '';
            data.roomList[index].p1.playType = '';//Landlord 地主  farmer 农民

            data.roomList[index].p2.card = [];
            data.roomList[index].p2.isReady = 'ready';
            data.roomList[index].p2.outCard = [];
            data.roomList[index].p2.cardNum = '';
            data.roomList[index].p2.playType = '';//Landlord 地主  farmer 农民

            data.roomList[index].p3.card = [];
            data.roomList[index].p3.isReady = 'ready';
            data.roomList[index].p3.outCard = [];
            data.roomList[index].p3.cardNum = '';
            data.roomList[index].p3.playType = '';//Landlord 地主  farmer 农民
            clearInterval(roomRobTime[index].robTime);
        } else {
            outCardTimer(nextId, 2000);
        }
        getUserInfoFun(item, index, newCode, true, winId);//向前端发送房间信息
    }

    //发送后台定时器接口
    function setTimerNum(id, count) {
        let item = searchRoomId(id);
        let index = item.index;
        io.to(item.index).emit('set-timer-num', {
            count: roomRobTime[index].robTimeCount
        });
    }

    //创建房间方法
    function joinRoom(info) {
        /*
         * {
         *   id:'',
         *   account:'',
         *   password:'',
         *   roomId: '',
         *   beanNum: '',//豆子数量
         *
         * }
         *
         *
         *  id: '',
         account: '',
         isLogin: '',
         roomId: '',
         locationSit: '',
         password: '',
         headImg: 'https://pic.qqtn.com/up/2017-9/15063376742826581.jpg',
         //ready--准备按钮  readyEd--已准备  robAndNo--抢·不抢  rob--抢地主  noRob--不抢 discardOrNo--出牌·不出   discard--出牌  noDiscard--不出  hasDisCard--已出牌
         isReady: 'ready',
         card: [],//当前未出的牌
         outCard: [],//已出的牌
         beanNum: '',//豆子数量
         cardNum: '',//还有多少张牌
         playType: 'farmer',//Landlord 地主  farmer 农民
         *
         *
         * */
        let roomList = data.roomList;
        let len = roomList.length;
        let newBlankData = cloneFun(blankData);
        newBlankData.id = info.id;
        newBlankData.account = info.account;
        newBlankData.password = info.password;
        newBlankData.beanNum = info.beanNum;
        newBlankData.headImg = info.headImg;
        //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
        // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
        // hasDisCard--已出牌
        function setData(index, position, type) {
            newBlankData.locationSit = position;
            newBlankData.roomId = index;
            if (type == 'push') {
                roomList.push({
                    "roomId": index,
                    "roomNum": "room" + index,
                    position: '',
                    robCount: '1',
                    topCard: [],
                    gramPro: 'getReady',//游戏状态-- getReady 准备中  running  进行中  gramOver  游戏结束
                    callOrNo: {//callLan--叫地主 noCallLan--不叫
                        p1: 'callOrNo',
                        p2: 'callOrNo',
                        p3: 'callOrNo',
                    },//叫地主状态
                    robStatus: {
                        p1: 'callOrNo',//rob--抢地主// noRob--不抢
                        p2: 'callOrNo',
                        p3: 'callOrNo',
                    },//抢地主状态
                    p1: cloneFun(blankData),
                    p2: cloneFun(blankData),
                    p3: cloneFun(blankData),
                });
            }
            roomList[index][position] = newBlankData;
        }

        if (len <= 0) {
            setData(0, 'p1', 'push');
        } else {
            let current = roomList[len - 1];
            if (current.p1.id !== '' && current.p2.id !== '' && current.p3.id !== '') {
                setData(len, 'p1', 'push');
            } else {
                if (current.p3.id !== '' && current.p1.id === '') {
                    setData(len - 1, 'p1', 'join');
                } else if (current.p1.id !== '' && current.p2.id === '') {
                    setData(len - 1, 'p2', 'join');
                } else if (current.p2.id !== '' && current.p3.id === '') {
                    setData(len - 1, 'p3', 'join');
                }
            }
        }
    }

    //校验所有玩家是否都已准备
    function checkAllReady(item, index) {
        let roomList = data.roomList;
        console.log();
        //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
        // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
        // hasDisCard--已出牌
        if (item.p1.isReady == 'readyEd' && item.p2.isReady == 'readyEd' && item.p3.isReady == 'readyEd') {
            let newCard = creatCard();
            roomList[index].topCard = newCard.topCard;
            roomList[index].p1.card = newCard.p1;
            roomList[index].p1.isReady = 'discard';
            roomList[index].p1.cardNum = '17';
            roomList[index].p1.playType = '';

            roomList[index].p2.card = newCard.p2;
            roomList[index].p2.isReady = 'discard';
            roomList[index].p2.cardNum = '17';
            roomList[index].p2.playType = '';

            roomList[index].p3.card = newCard.p3;
            roomList[index].p3.isReady = 'discard';
            roomList[index].p3.cardNum = '17';
            roomList[index].p3.playType = '';
            let num = rnd(1, 3);
            //num = 2;

            roomList[index]['p' + num].isReady = 'callOrNo';
            roomList[index].position = 'p' + num;
            roomList[index].count = 0;
            roomList[index].gramPro = 'running';//游戏状态-- getReady 准备中  running  进行中  gramOver  游戏结束
            console.log('-------校验所有玩家是否都已经准备触发--------');
            callLanTime(roomList[index]['p' + num].id);
            return true;
        }
    }

    //随机创建三副牌的方法
    function creatCard() {
        if (obj.list.length <= 0) {
            var list = [];
            for (var i = 0; i < 54; i++) {
                list.push(i);
            }
        }
        for (var j = 0; j < 54; j++) {
            var index = rnd(0, 53);
            var one = list[j];
            var two = list[index];
            list[j] = two;
            list[index] = one;
        }
        var p1 = list.slice(0, 17);
        var p2 = list.slice(17, 34);
        var p3 = list.slice(34, 51);
        var topCard = list.slice(51, 54);
        return {
            list: list,
            p1: sortFun(p1),
            p2: sortFun(p2),
            p3: sortFun(p3),
            topCard: sortFun(topCard)
        }
    }

    //js 随机整数方法
    function rnd(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n)
    }

    //查找当前room方法
    function searchRoomId(id) {
        let roomList = data.roomList;
        let index = '', position = '', item = '';
        let obj = {};
        for (let i = 0, len = roomList.length; i < len; i++) {
            if (id == roomList[i].p1.id) {
                position = 'p1';
            } else if (id == roomList[i].p2.id) {
                position = 'p2';
            } else if (id == roomList[i].p3.id) {
                position = 'p3';
            }
            if (position !== '') {
                obj = {
                    index: i,
                    position: position,
                    item: cloneFun(roomList[i]),
                };
                break;
            }
        }
        return obj;
    }

    //排序方法
    function sortFun(list) {
        list = cloneFun(list);
        list.sort(function (a, b) {
            return b - a
        });
        return list;
    }

    //数组中是删除元素方法
    function delFun(list, del) {
        function getIndex(list, val) {
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i] == val) {
                    list.splice(i, 1);
                }
            }
        }

        list = cloneFun(list);
        for (var i = 0, len = del.length; i < len; i++) {
            getIndex(list, del[i]);
        }
        return list;
    }

    /*游戏界面  相关接口 end----------------------   */


    //判断牌型
    socket.on('typeJudge', (data)=> {
        let options = typeJudge(data);
        socket.emit('typeJudge', options);
    })
    //出牌（比较大小）
    socket.on('palyCard', (data)=> {
        let options;
        if (maxCard.length > 0) {
            maxCard.push(data);
            options = thanCard(maxCard[0], maxCard[1])
            socket.emit('palyCard', options)
            maxCard.splice(0, 1);
        } else {
            maxCard.push(data);
            options = true;
            socket.emit('palyCard', options)
        }
    })

    function dealCards() {

        let total = 17;
        let cards = Cards.slice(0);
        for (let i = 0; i < 3; i++) {
            hiddenCards[i] = getOneCard(cards);
        }
        for (let i = 0; i < total; i++) {
            one[i] = getOneCard(cards);
        }
        for (let i = 0; i < total; i++) {
            two[i] = getOneCard(cards);
        }
        for (let i = 0; i < total; i++) {
            three[i] = getOneCard(cards);
        }
        one = one.sort(cardSort);
        two = two.sort(cardSort);
        three = three.sort(cardSort);

        return {
            one,
            two,
            three
        }
    }

//随机取一张牌
    function getOneCard(cards) {
        return cards.splice(Math.ceil(Math.random() * cards.length - 1), 1)[0];
    }

//给牌排序
    function cardSort(a, b) {
        var va = parseInt(a.val);
        var vb = parseInt(b.val);
        if (va === vb) {
            return a.type > b.type ? 1 : -1;
        } else if (va > vb) {
            return -1;
        } else {
            return 1;
        }
    }

    let valCount = function (cards) {
        let result = [];
        let addCount = function (result, v) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].val == v) {
                    result[i].count++;
                    return;
                }
            }
            result.push({'val': v, 'count': 1});
        };
        for (let i = 0; i < cards.length; i++) {
            addCount(result, cards[i].val);
        }
        return result;
    };
//获取指定张数的最大牌值
    let getMaxVal = function (cards, n) {
        let c = valCount(cards);
        let max = 0;
        for (let i = 0; i < c.length; i++) {
            if (c[i].count === n && c[i].val > max) {
                max = c[i].val;
            }
        }
        return max;
    };
//是否是对子
    let isPairs = function (cards) {
        return cards.length == 2 && cards[0].val === cards[1].val
    }
//是否是三根
    let isThree = function (cards) {
        return cards.length == 3 && cards[0].val === cards[1].val && cards[1].val === cards[2].val
    }
//是否是三带一
    let isThreeWithOne = function (cards) {
        if (cards.length !== 4) return false;
        let c = valCount(cards);
        return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
    };
//是否是三带二
    let isThreeWithPairs = function (cards) {
        if (cards.length != 5) return false;
        var c = valCount(cards);
        return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
    };
//是否是顺子
    let isProgression = function (cards) {
        if (cards.length < 5 || cards[0].val === 15) return false;
        for (let i = 0; i < cards.length; i++) {
            if (i != (cards.length - 1) && (cards[i].val + 1) != cards[i + 1].val) {
                return false;
            }
        }
        return true;
    };
//是否是连对
    let isProgressionPairs = function (cards) {
        if (cards.length < 6 || cards.length % 2 != 0 || cards[0].val === 15) return false;
        for (let i = 0; i < cards.length; i += 2) {
            if (i != (cards.length - 2) && (cards[i].val != cards[i + 1].val || (cards[i].val + 1) != cards[i + 2].val)) {
                return false;
            }
        }
        return true;
    };
//是否是飞机
    let isPlane = function (cards) {
        if (cards.length < 6 || cards.length % 3 != 0 || cards[0].val === 15) return false;
        for (let i = 0; i < cards.length; i += 3) {
            if (i != (cards.length - 3) && (cards[i].val != cards[i + 1].val || cards[i].val != cards[i + 2].val || (cards[i].val + 1) != cards[i + 3].val)) {
                return false;
            }
        }
        return true;
    };
//是否是飞机带单
    let isPlaneWithOne = function (cards) {
        if (cards.length < 8 || cards.length % 4 != 0) return false;
        let c = valCount(cards),
            threeList = [],
            threeCount = cards.length / 4;
        for (let i = 0; i < c.length; i++) {
            if (c[i].count == 3) {
                threeList.push(c[i]);
            }
        }
        if (threeList.length != threeCount || threeList[0].val === 15) {//检测三根数量和不能为2
            return false;
        }
        for (i = 0; i < threeList.length; i++) {//检测三根是否连续
            if (i != threeList.length - 1 && threeList[i].val + 1 != threeList[i + 1].val) {
                return false;
            }
        }
        return true;
    };
//是否是飞机带对
    let isPlaneWithPairs = function (cards) {
        if (cards.length < 10 || cards.length % 5 != 0) return false;
        var c = valCount(cards),
            threeList = [],
            pairsList = [],
            groupCount = cards.length / 5;
        for (var i = 0; i < c.length; i++) {
            if (c[i].count == 3) {
                threeList.push(c[i]);
            }
            else if (c[i].count == 2) {
                pairsList.push(c[i]);
            } else {
                return false;
            }
        }
        if (threeList.length != groupCount || pairsList.length != groupCount || threeList[0].val === 15) {//检测三根数量和对子数量和不能为2
            return false;
        }
        for (let i = 0; i < threeList.length; i++) {//检测三根是否连续
            if (i != threeList.length - 1 && threeList[i].val + 1 != threeList[i + 1].val) {
                return false;
            }
        }
        return true;
    };
//是否是四带二
    let isFourWithTwo = function (cards) {
        var c = valCount(cards);
        if (cards.length != 6 || c.length > 3) return false;
        for (let i = 0; i < c.length; i++) {
            if (c[i].count === 4)
                return true;
        }
        return false;
    };
//是否是四带两个对
    let isFourWithPairs = function (cards) {
        if (cards.length != 8) return false;
        let c = valCount(cards);
        if (c.length != 3) return false;
        for (let i = 0; i < c.length; i++) {
            if (c[i].count != 4 && c[i].count != 2)
                return false;
        }
        return true;
    };
//是否是炸弹
    let isBomb = function (cards) {
        return cards.length === 4 && cards[0].val === cards[1].val && cards[0].val === cards[2].val && cards[0].val === cards[3].val;
    };
//是否是王炸
    let isKingBomb = function (cards) {
        return cards.length === 2 && cards[0].type == '0' && cards[1].type == '0';
    };
//判断牌型
    let typeJudge = function (cards) {
        let len = cards.length;
        switch (len) {
            case 1:
                return {'cardKind': self.ONE, 'val': cards[0].val, 'size': len};
            case 2:
                if (isPairs(cards))
                    return {'cardKind': self.PAIRS, 'val': cards[0].val, 'size': len};
                else if (isKingBomb(cards))
                    return {'cardKind': self.KING_BOMB, 'val': cards[0].val, 'size': len};
                else
                    return null;
            case 3:
                if (isThree(cards))
                    return {'cardKind': self.THREE, 'val': cards[0].val, 'size': len};
                else
                    return null;
            case 4:
                if (isThreeWithOne(cards)) {
                    return {'cardKind': self.THREE_WITH_ONE, 'val': getMaxVal(cards, 3), 'size': len};
                } else if (isBomb(cards)) {
                    return {'cardKind': self.BOMB, 'val': cards[0].val, 'size': len};
                }
                return null;
            default:
                if (isProgression(cards))
                    return {'cardKind': self.PROGRESSION, 'val': cards[0].val, 'size': len};
                else if (isProgressionPairs(cards))
                    return {'cardKind': self.PROGRESSION_PAIRS, 'val': cards[0].val, 'size': len};
                else if (isThreeWithPairs(cards))
                    return {'cardKind': self.THREE_WITH_PAIRS, 'val': getMaxVal(cards, 3), 'size': len};
                else if (isPlane(cards))
                    return {'cardKind': self.PLANE, 'val': getMaxVal(cards, 3), 'size': len};
                else if (isPlaneWithOne(cards))
                    return {'cardKind': self.PLANE_WITH_ONE, 'val': getMaxVal(cards, 3), 'size': len};
                else if (isPlaneWithPairs(cards))
                    return {'cardKind': self.PLANE_WITH_PAIRS, 'val': getMaxVal(cards, 3), 'size': len};
                else if (isFourWithTwo(cards))
                    return {'cardKind': self.FOUR_WITH_TWO, 'val': getMaxVal(cards, 4), 'size': len};
                else if (isFourWithPairs(cards))
                    return {'cardKind': self.FOUR_WITH_TWO_PAIRS, 'val': getMaxVal(cards, 4), 'size': len};
                else
                    return null;

        }

    };

//比较出牌大小
    function thanCard(maxCard, playCard) {
        let maxType = typeJudge(maxCard);
        let playType = typeJudge(playCard);
        switch (maxType.cardKind) {
            case 1:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 2:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 3:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 4:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 5:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 6:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 7:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 8:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 9:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 10:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 11:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 12:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 13 || playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }
            case 13:
                if (maxType == null || playType == null) return false;
                if (maxType.cardKind == playType.cardKind) {
                    if (playType.val > maxType.val) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (playType.cardKind == 14) {
                        return true
                    } else {
                        return false
                    }
                }

            default:
                break;
        }
    }

    function cloneFun(val) {
        return JSON.parse(JSON.stringify(val));
    }

};

