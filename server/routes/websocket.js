/**
 * Created by ex-wangxin on 2018/9/13.
 */
var connect = require("./connect");
var serverData = {
    code: 200,
    msg: '成功'
};
var imgList = [
    {imgUrl : 'https://cdn02.xianglin.cn/1fa6214258dfe26646dc0cd20e42212e-5865.png'},
    {imgUrl : 'https://cdn02.xianglin.cn/6f6130780518b0fc0369878e2ee7b359-140520.jpg'},
    {imgUrl : 'https://cdn02.xianglin.cn/5278c4b6a3bbc5fa71b241ba02ffb3fb-86641.jpg'},
    {imgUrl : 'https://cdn02.xianglin.cn/80b7f78292f4ea156bcd5d871195fdb8-149167.jpg'},
    {imgUrl : 'https://cdn02.xianglin.cn/747ae069e5070bc470a255df36c0b5a3-18804.png'},
    {imgUrl : 'https://cdn02.xianglin.cn/1c084e8f9ea089ccf0670f63ae440d39-7793.png'}
]

var desk = {//桌子
    deskList : [
        {room : '1', playerList : [{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false}]},
        {room : '2', playerList : [{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false}]},
        {room : '3', playerList : [{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false}]},
        {room : '4', playerList : [{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false}]},
    ]
};
var Cards = [
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
var cards = Cards.slice(0);
var landlord = ['left','right','bottom'].slice(0);
var one = [] , two = [] , three = [] , hiddenCards = [],firstLandlord,landlordNum=0;
exports.websocket = function websocket(socket,io) {
    // 登录
    socket.on('login',(data)=> {
        let num = parseInt(Math.random()*10000);//随机
        let sql = 'select * from t_player where player_name='+'"'+data.account+'"';
        let insert = "INSERT INTO `test`.`t_player` (`party_id`, `player_name`, `player_card`, `room_id`, `player_pwd` ,`player_status`) VALUES ('YH"+num+"', '"+data.account+"', null, null, '"+data.password+"','Y')";
        connect.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }           
            if(result.length>0) {
                if(result[0].player_pwd===data.password) {
                    serverData.data = result[0]
                    socket.emit('login', serverData);
                    return;
                }else {
                    serverData.code = 202;
                    serverData.msg = '密码错误';
                    socket.emit('login', serverData);
                    return;
                }
            }else{
                connect.query(insert,function(err , result){
                    if(err){
                        console.log('[SELECT ERROR] - ',err.message);
                        return;
                    }else{
                        serverData.data = 'YH'+num;
                        serverData.player_img = 'https://cdn02.xianglin.cn/1fa6214258dfe26646dc0cd20e42212e-5865.png';                        
                        socket.emit('login', serverData);
                        return;
                    }
                })
            }
        })
    });   
    //大厅桌子
    socket.on('desk',(data)=>{
        //默认四张桌子
        socket.emit('desk',desk.deskList);
    });
    //大厅创建房间（桌子）
    socket.on('createDesk',(data)=>{
        let num = parseInt(Math.random()*10000);//随机
        desk.deskList.push(
            {room : 'YH'+num, playerList : [{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false},{imgUrl:'',name:'',isFull:false}]}
        );
        io.sockets.emit('createDesk',desk.deskList);
    })
    //进入房间选择座位
    socket.on('toRoom',(data)=>{                    
        desk.deskList.map((item , index)=>{
            if(data.room == item.room){
                if(data.sit == 'left'){
                    item.playerList[0] = {name : data.name,imgUrl : data.imgUrl,site : data.sit,isFull:true};
                }
                if(data.sit == 'bottom'){
                    item.playerList[1] = {name : data.name,imgUrl : data.imgUrl,site : data.sit,isFull:true};
                }
                if(data.sit == 'right'){
                    item.playerList[2] = {name : data.name,imgUrl : data.imgUrl,site : data.sit,isFull:true};
                }
                 
            }
        });
        socket.join(data.room);
        io.sockets.emit('toRoom',desk.deskList);
    });
    //退出房间
    socket.on('outRoom',(data)=>{
       desk.deskList.map((item , index)=>{
            if(data.room == item.room){
                item.playerList.map((val,i)=>{
                    if(data.name == val.name){                        
                        item.playerList[i] = {imgUrl:'',name:'',isFull:false}
                    }
                })
            }
        }); 
        socket.leave(data.room);
        io.sockets.emit('outRoom',desk.deskList);
    });

    //发牌
    socket.on('getCards',(data)=>{
        let obj = dealCards();              
        desk.deskList.map((item , index)=>{
            if(data.room == item.room){
                if(data.sit == 'left'){
                    item.playerList[0] = {name : data.name,imgUrl : data.imgUrl,site : data.sit,isFull:true};
                }
                if(data.sit == 'bottom'){
                    item.playerList[1] = {name : data.name,imgUrl : data.imgUrl,site : data.sit,isFull:true};
                }
                if(data.sit == 'right'){
                    item.playerList[2] = {name : data.name,imgUrl : data.imgUrl,site : data.sit,isFull:true};
                }  
                 if(item.playerList.every(function(val){ return val.isFull})){
                    firstLandlord = getOneCard(landlord);
                    console.log(firstLandlord);
                    //当前房间的底牌                   
                    item.headCard = obj.headCard;
                    item.playerList.map((val,i)=>{
                        if(val.site == 'left'){                        
                            item.playerList[i].cardsList = obj.left;
                        }
                        if(val.site == 'right'){                        
                            item.playerList[i].cardsList = obj.right;
                        }
                        if(val.site == 'bottom'){                        
                            item.playerList[i].cardsList = obj.bottom;
                        }
                        if(firstLandlord == val.site){
                            item.playerList[i].isLandlord = 'Y';
                        }
                    })
                 }              
            }
        });
       io.sockets.emit('getCards',desk.deskList); 
    })  
    //抢地主
    socket.on('robHost',(data)=>{
       if(landlordNum == 4){
            landlordNum = 0;
       }
       landlordNum++;
       desk.deskList.map((item , index)=>{
            if(data.room == item.room){                                               
                item.playerList.map((val,i)=>{
                    if(data.landlordSit == 'left'){                        
                        if(val.site == 'left'){
                            delete item.playerList[i].isLandlord                                                   
                        }
                        if(val.site == 'bottom'){
                            if(val.isRob !== 'Y'){
                               item.playerList[i].isLandlord = 'Y'; 
                            }else{
                               item.playerList[2].isLandlord = 'Y'; 
                            }
                        }                        
                        
                    }
                    if(data.landlordSit == 'right'){                        
                        if(val.site == 'right'){                        
                            delete item.playerList[i].isLandlord
                        }
                        if(val.site == 'left'){
                            if(val.isRob !== 'Y'){
                               item.playerList[i].isLandlord = 'Y'; 
                            }else{
                               item.playerList[1].isLandlord = 'Y'; 
                            }
                        }   
                        
                    }
                    if(data.landlordSit == 'bottom'){                        
                        if(val.site == 'bottom'){                        
                            delete item.playerList[i].isLandlord
                        }
                        if(val.site == 'right'){
                            if(val.isRob !== 'Y'){
                               item.playerList[i].isLandlord = 'Y'; 
                            }else{
                               item.playerList[0].isLandlord = 'Y'; 
                            }
                        }
                        
                    }                    
                })
            }
        }); 
        console.log(landlordNum);
        if(landlordNum == 3){
           let arr=[];
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   item.playerList.map((val,i)=>{
                        if(val.isLandlord == 'Y'){
                            if(val.site == 'left'){
                                item.playerList[2].showCard = 'Y';
                            }
                            if(val.site == 'bottom'){
                                item.playerList[0].showCard = 'Y';
                            }
                            if(val.site == 'right'){
                                item.playerList[1].showCard = 'Y';
                            }
                        }
                        
                   })
               }
           }) 
        }
        if(landlordNum == 2){
           let arr=[];
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   item.playerList.map((val,i)=>{
                        if(val.isRob !== 'Y' && val.isRob !== undefined){
                            item.playerList[i].showCard = 'Y';
                        }
                        
                   })
               }
           }) 
        }
        io.sockets.emit('robHost',desk.deskList); 
    })
    //不抢
    socket.on('notRobbing',(data)=>{
       if(landlordNum == 4){
            landlordNum = 0;
       }
       landlordNum++;
       desk.deskList.map((item , index)=>{
            if(data.room == item.room){                                               
                item.playerList.map((val,i)=>{
                    if(data.landlordSit == 'left'){                        
                        if(val.site == 'left'){                        
                            delete item.playerList[i].isLandlord;
                            item.playerList[i].isRob = 'Y';
                        }
                        if(val.site == 'bottom'){
                            item.playerList[i].isLandlord = 'Y';
                        }
                    }
                    if(data.landlordSit == 'right'){                        
                        if(val.site == 'right'){                        
                            delete item.playerList[i].isLandlord;
                            item.playerList[i].isRob = 'Y';
                        }
                        if(val.site == 'left'){
                            item.playerList[i].isLandlord = 'Y';
                        }
                    }
                    if(data.landlordSit == 'bottom'){                        
                        if(val.site == 'bottom'){                        
                            delete item.playerList[i].isLandlord;
                            item.playerList[i].isRob = 'Y';
                        }
                        if(val.site == 'right'){
                            item.playerList[i].isLandlord = 'Y';
                        }
                    }                    
                })
            }
        }); 
        console.log(landlordNum);
        if(landlordNum == 4){
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   item.playerList.map((val,i)=>{
                        if(val.isLandlord == 'Y'){
                            item.playerList[i].showCard = 'Y';
                        }
                        
                   })
               }
           }) 
        }        
        if(landlordNum == 3){
           let arr=[];
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   item.playerList.map((val,i)=>{
                        if(val.isRob == 'Y'){
                            arr.push(val);
                        }
                        if(arr.length == 3){
                            console.log('重新发牌');
                        }else{
                            if(val.isLandlord == 'Y'){
                                item.playerList[i].showCard = 'Y';
                            } 
                        }
                   })
               }
           }) 
        }
        
        io.sockets.emit('notRobbing',desk.deskList);         
    })
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
        left : one,
        right : two,
        bottom : three,
        headCard : hiddenCards
    }
}   


};

