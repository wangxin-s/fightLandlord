/**
 * Created by ex-wangxin on 2018/9/13.
 */
var connect = require("./connect");
var moduleData = {
    code: 200,
    msg: '成功'
}
let Cards = [
        {icon: 'j1.jpg', type: '0', val: 17},
        {icon: 'j2.jpg', type: '0', val: 16},
        {icon: 't1.jpg', type: '1', val: 14},
        {icon: 't2.jpg', type: '1', val: 15},
        {icon: 't3.jpg', type: '1', val: 3},
        {icon: 't4.jpg', type: '1', val: 4},
        {icon: 't5.jpg', type: '1', val: 5},
        {icon: 't6.jpg', type: '1', val: 6},
        {icon: 't7.jpg', type: '1', val: 7},
        {icon: 't8.jpg', type: '1', val: 8},
        {icon: 't9.jpg', type: '1', val: 9},
        {icon: 't10.jpg', type: '1', val: 10},
        {icon: 't11.jpg', type: '1', val: 11},
        {icon: 't12.jpg', type: '1', val: 12},
        {icon: 't13.jpg', type: '1', val: 13},
        {icon: 'x1.jpg', type: '2', val: 14},
        {icon: 'x2.jpg', type: '2', val: 15},
        {icon: 'x3.jpg', type: '2', val: 3},
        {icon: 'x4.jpg', type: '2', val: 4},
        {icon: 'x5.jpg', type: '2', val: 5},
        {icon: 'x6.jpg', type: '2', val: 6},
        {icon: 'x7.jpg', type: '2', val: 7},
        {icon: 'x8.jpg', type: '2', val: 8},
        {icon: 'x9.jpg', type: '2', val: 9},
        {icon: 'x10.jpg', type: '2', val: 10},
        {icon: 'x11.jpg', type: '2', val: 11},
        {icon: 'x12.jpg', type: '2', val: 12},
        {icon: 'x13.jpg', type: '2', val: 13},
        {icon: 'h1.jpg', type: '3', val: 14},
        {icon: 'h2.jpg', type: '3', val: 15},
        {icon: 'h3.jpg', type: '3', val: 3},
        {icon: 'h4.jpg', type: '3', val: 4},
        {icon: 'h5.jpg', type: '3', val: 5},
        {icon: 'h6.jpg', type: '3', val: 6},
        {icon: 'h7.jpg', type: '3', val: 7},
        {icon: 'h8.jpg', type: '3', val: 8},
        {icon: 'h9.jpg', type: '3', val: 9},
        {icon: 'h10.jpg', type: '3', val: 10},
        {icon: 'h11.jpg', type: '3', val: 11},
        {icon: 'h12.jpg', type: '3', val: 12},
        {icon: 'h13.jpg', type: '3', val: 13},
        {icon: 'k1.jpg', type: '4', val: 14},
        {icon: 'k2.jpg', type: '4', val: 15},
        {icon: 'k3.jpg', type: '4', val: 3},
        {icon: 'k4.jpg', type: '4', val: 4},
        {icon: 'k5.jpg', type: '4', val: 5},
        {icon: 'k6.jpg', type: '4', val: 6},
        {icon: 'k7.jpg', type: '4', val: 7},
        {icon: 'k8.jpg', type: '4', val: 8},
        {icon: 'k9.jpg', type: '4', val: 9},
        {icon: 'k10.jpg', type: '4', val: 10},
        {icon: 'k11.jpg', type: '4', val: 11},
        {icon: 'k12.jpg', type: '4', val: 12},
        {icon: 'k13.jpg', type: '4', val: 13}
    ];
let cards = Cards.slice(0);
let self = {
    ONE : 1,
    PAIRS : 2,
    THREE : 3,
    THREE_WITH_ONE : 4,
    THREE_WITH_PAIRS : 5,
    PROGRESSION : 6,
    PROGRESSION_PAIRS : 7,
    PLANE : 8,
    PLANE_WITH_ONE : 9,    
    PLANE_WITH_PAIRS : 10,
    FOUR_WITH_TWO : 11,
    FOUR_WITH_TWO_PAIRS : 12,
    BOMB : 13,
    KING_BOMB : 14,
}
let maxCard = [];//当前牌面上最大的牌
let one = [] , two = [] , three = [] , hiddenCards = [];
exports.websocket = function websocket(socket) {

    console.log('websocket')
    // socket.emit('news', {hello: 'world1'});
    // socket.on('news', function (data) {
    //     console.log(data);
    //     //socket.emit('news', data);

    //     var  sql = 'SELECT * FROM users';

    //     //查
    //     connect.query(sql,function (err, result) {
    //         console.log('------');
    //         if(err){
    //             console.log('[SELECT ERROR] - ',err.message);
    //             return;
    //         }
    //         socket.emit('news', result);
    //         console.log('--------------------------SELECT----------------------------');
    //         console.log(result);
    //         console.log('------------------------------------------------------------\n\n');
    //     });

    // });

    // 登录
    // socket.on('login',(data)=> {
    //     let sql = 'select * from users where account='+'"'+data.account+'"';
    //     connect.query(sql,function (err, result) {
    //         if(err){
    //             console.log('[SELECT ERROR] - ',err.message);
    //             return;
    //         }
    //         // let serverData = {...moduleData};
    //         if(result.length) {
    //             if(result[0].password===data.password) {
    //                 serverData.data = result[0]
    //                 socket.emit('login', serverData);
    //                 return;
    //             }else {
    //                 serverData.code = 202;
    //                 serverData.msg = '密码错误';
    //                 socket.emit('login', serverData);
    //                 return;
    //             }
                
    //         }else {
    //             serverData.code = 201;
    //             serverData.msg = '用户不存在';
    //             socket.emit('login', serverData);
    //             return;
    //         }
            
    //     });
    // });
   //发牌
   socket.on('dealCards',(data)=>{
        let options = dealCards();
        //let sql = 'SELECT * FROM detail';
        //let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id WHERE a.room_id = '+data.room_id//查room_id=1的 
        //let sql = 'update t_player set player_name = 'QW2' WHERE player_id = 1' //改player_id = 1 的 数据
        let p1=JSON.stringify(one);
        let p2=JSON.stringify(two);
        let p3=JSON.stringify(three);        
        let sql = "UPDATE t_player AS tp set tp.player_card =  case tp.player_id in (1,2,3) WHEN tp.player_id = 1 then '"+p1+"' WHEN tp.player_id = 2 then '"+p2+"' WHEN tp.player_id = 3 then '"+p3+"' END where tp.room_id = 1"
        // let sql = 'select * FROM t_room a INNER JOIN t_player b on a.room_id = b.room_id'//查所有的
        //查
        connect.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }

            console.log('发牌') 
            console.log(result);
            socket.emit('dealCards',options);
            
        });
        
   });
   //判断牌型
   socket.on('typeJudge',(data)=>{
       let options = typeJudge(data);
       socket.emit('typeJudge', options);
   })
   //出牌（比较大小）
   socket.on('palyCard',(data)=>{
       let options;
       if(maxCard.length>0){
           maxCard.push(data);          
           options = thanCard(maxCard[0],maxCard[1])
           socket.emit('palyCard',options)
           maxCard.splice(0,1);           
       }else{
           maxCard.push(data);
           options = true;
           socket.emit('palyCard',options)
       }
   })
   function dealCards (){
    
    let total = 17;
    let cards = Cards.slice(0);
    for(let i=0;i<3;i++){
        hiddenCards[i] = getOneCard(cards);
    }
    for(let i=0;i<total;i++){
        one[i] = getOneCard(cards);
    }
    for(let i=0;i<total;i++){
        two[i] = getOneCard(cards);
    }
    for(let i=0;i<total;i++){
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
function getOneCard (cards){
    return cards.splice(Math.ceil(Math.random()*cards.length - 1) ,1)[0];
}
//给牌排序
function cardSort  (a , b){
    var va = parseInt(a.val);
    var vb = parseInt(b.val);
    if(va === vb){
        return a.type > b.type ? 1 : -1;
    } else if(va > vb){
        return -1;
    } else {
        return 1;
    }
}
let valCount = function(cards){
    let result = [];
    let addCount = function(result , v){
        for (let i = 0; i < result.length; i++) {
            if(result[i].val == v){
                result[i].count ++;
                return;
            }
        }
        result.push({'val': v, 'count': 1});
    };
    for (let i = 0; i < cards.length; i++){
        addCount(result, cards[i].val);
    }
    return result;
};
//获取指定张数的最大牌值
let getMaxVal = function(cards, n){    
    let c = valCount(cards);  
    let max = 0;
    for (let i = 0; i < c.length; i++) {
        if(c[i].count === n && c[i].val > max){
            max = c[i].val;
        }
    }
    return max;
};
//是否是对子
let isPairs = function(cards){
    return cards.length == 2 && cards[0].val === cards[1].val
}
//是否是三根
let isThree = function(cards){
    return cards.length == 3 && cards[0].val === cards[1].val && cards[1].val === cards[2].val
}
//是否是三带一
let isThreeWithOne = function(cards){
    if(cards.length !==4) return false;
    let c = valCount(cards);
    return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
};
//是否是三带二
let isThreeWithPairs = function(cards) {
    if(cards.length != 5) return false;
    var c = valCount(cards);
    return c.length === 2 && (c[0].count === 3 || c[1].count === 3);
};
//是否是顺子
let isProgression = function(cards) {
    if(cards.length < 5 || cards[0].val === 15) return false;
    for (let i = 0; i < cards.length; i++) {
        if(i != (cards.length - 1) && (cards[i].val + 1) != cards[i + 1].val){
            return false;
        }
    }
    return true;
};
//是否是连对
let isProgressionPairs = function(cards) {
    if(cards.length < 6 || cards.length % 2 != 0 || cards[0].val === 15) return false;
    for (let i = 0; i < cards.length; i += 2) {
        if(i != (cards.length - 2) && (cards[i].val != cards[i + 1].val || (cards[i].val + 1) != cards[i + 2].val)){
            return false;
        }
    }
    return true;
};
//是否是飞机
let isPlane = function(cards) {
    if(cards.length < 6 || cards.length % 3 != 0 || cards[0].val === 15) return false;
    for (let i = 0; i < cards.length; i += 3) {
        if(i != (cards.length - 3) && (cards[i].val != cards[i + 1].val || cards[i].val != cards[i + 2].val || (cards[i].val + 1) != cards[i + 3].val)){
            return false;
        }
    }
    return true;
};
//是否是飞机带单
let isPlaneWithOne = function(cards) {
    if(cards.length < 8 || cards.length % 4 != 0) return false;
    let c = valCount(cards),
        threeList = [],
        threeCount = cards.length / 4;
    for (let i = 0; i < c.length; i++) {
        if(c[i].count == 3){
            threeList.push(c[i]);
        }
    }
    if(threeList.length != threeCount || threeList[0].val === 15){//检测三根数量和不能为2
        return false;
    }
    for (i = 0; i < threeList.length; i++) {//检测三根是否连续
        if(i != threeList.length - 1 && threeList[i].val + 1 != threeList[i + 1].val){
            return false;
        }
    }
    return true;
};
//是否是飞机带对
let isPlaneWithPairs = function(cards) {
    if(cards.length < 10 || cards.length % 5 != 0) return false;
    var c = valCount(cards),
        threeList = [],
        pairsList = [],
        groupCount = cards.length / 5;
    for (var i = 0; i < c.length; i++) {
        if(c[i].count == 3){
            threeList.push(c[i]);
        }
        else if(c[i].count == 2){
            pairsList.push(c[i]);
        } else {
            return false;
        }
    }
    if(threeList.length != groupCount || pairsList.length != groupCount || threeList[0].val === 15){//检测三根数量和对子数量和不能为2
        return false;
    }
    for (let i = 0; i < threeList.length; i++) {//检测三根是否连续
        if(i != threeList.length - 1 && threeList[i].val + 1 != threeList[i + 1].val){
            return false;
        }
    }
    return true;
};
//是否是四带二
let isFourWithTwo = function(cards) {
    var c = valCount(cards);
    if(cards.length != 6 || c.length > 3) return false;
    for (let i = 0; i < c.length; i++) {
        if(c[i].count === 4)
            return true;
    }
    return false;
};
//是否是四带两个对
let isFourWithPairs = function(cards) {
    if(cards.length != 8) return false;
    let c = valCount(cards);
    if(c.length != 3) return false;
    for (let i = 0; i < c.length; i++) {
        if(c[i].count != 4 && c[i].count != 2)
            return false;
    }
    return true;
};
//是否是炸弹
let isBomb = function(cards) {
    return cards.length === 4 && cards[0].val === cards[1].val && cards[0].val === cards[2].val && cards[0].val === cards[3].val;
};
//是否是王炸
let isKingBomb = function(cards) {
    return cards.length === 2 && cards[0].type == '0' && cards[1].type == '0';
};
//判断牌型
let typeJudge = function(cards){
    let len = cards.length;
    switch (len) {
        case 1:
            return {'cardKind': self.ONE, 'val': cards[0].val, 'size': len};
        case 2:
            if(isPairs(cards))
                return {'cardKind': self.PAIRS, 'val': cards[0].val, 'size': len};
            else if (isKingBomb(cards))
                return {'cardKind': self.KING_BOMB, 'val': cards[0].val, 'size': len};
            else
                return null;
        case 3:
            if(isThree(cards))
                return {'cardKind': self.THREE, 'val': cards[0].val, 'size': len};
            else
                return null;
        case 4:
            if(isThreeWithOne(cards)){
                return {'cardKind': self.THREE_WITH_ONE, 'val': getMaxVal(cards, 3), 'size': len};
            } else if (isBomb(cards)) {
                return {'cardKind': self.BOMB, 'val': cards[0].val, 'size': len};
            }
            return null;
        default:
            if(isProgression(cards))
                return {'cardKind': self.PROGRESSION, 'val': cards[0].val, 'size': len};
            else if(isProgressionPairs(cards))
                return {'cardKind': self.PROGRESSION_PAIRS, 'val': cards[0].val, 'size': len};
            else if(isThreeWithPairs(cards))
                return {'cardKind': self.THREE_WITH_PAIRS, 'val': getMaxVal(cards, 3), 'size': len};
            else if(isPlane(cards))
                return {'cardKind': self.PLANE, 'val': getMaxVal(cards, 3), 'size': len};
            else if(isPlaneWithOne(cards))
                return {'cardKind': self.PLANE_WITH_ONE, 'val': getMaxVal(cards, 3), 'size': len};
            else if(isPlaneWithPairs(cards))
                return {'cardKind': self.PLANE_WITH_PAIRS, 'val': getMaxVal(cards, 3), 'size': len};
            else if(isFourWithTwo(cards))
                return {'cardKind': self.FOUR_WITH_TWO, 'val': getMaxVal(cards, 4), 'size': len};
            else if(isFourWithPairs(cards))
                return {'cardKind': self.FOUR_WITH_TWO_PAIRS, 'val': getMaxVal(cards, 4), 'size': len};
            else
                return null;

    }

};
//比较出牌大小
function thanCard(maxCard , playCard){
    let maxType = typeJudge(maxCard);
    let playType = typeJudge(playCard);
    switch (maxType.cardKind) {
        case 1:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }
        case 2:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 3:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }           
        case 4:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 5:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 6:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 7:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 8:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 9:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 10:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 11:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 12:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 13 || playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        case 13:
            if(maxType == null || playType == null) return false;
            if(maxType.cardKind == playType.cardKind){
                if(playType.val > maxType.val){
                    return true
                }else{
                    return false
                }
            }else{
                if(playType.cardKind == 14){
                    return true
                }else{
                    return false
                }
            }            
        
        default:
            break;
    }
}

};