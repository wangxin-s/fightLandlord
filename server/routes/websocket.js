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
var self = {
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
var landlordList = ['left','right','bottom'];
var one = [] , two = [] , three = [] , hiddenCards = [],firstLandlord,landlordNum=0,noRobArr=[],noOut=[],ringNum=0,firstOut,
grabList = [],noGrabList = [];
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
                    serverData.code = 200;
                    serverData.msg = '登录成功';
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
        firstLandlord='';
        landlordNum=0;
        noOut=[];
        ringNum=0;
        firstOut='';
        landlordNum = 0;
        noRobArr = [];
        hiddenCards = [];
       desk.deskList.map((item , index)=>{
            if(data.room == item.room){
                item.playerList.map((val,i)=>{
                    if(data.name == val.name){  
                        item.outRoom = val.name;                     
                        item.playerList[i] = {imgUrl:'',name:'',isFull:false}
                    }else{
                        noOut = [];
                        item.maxCard = [];
                        firstOut='';
                        landlordNum = 0;noRobArr=[];hiddenCards = [];                        
                        delete val.isRob;
                        delete val.showCard;
                        delete val.isGrad;
                        delete val.cardsList;
                        delete val.text;
                        delete val.firstCard;
                        delete val.noOut;
                        delete val.isLandlord; 
                        delete val.landowner;                       
                        delete item.headCard;
                        delete item.landlordIn;
                        delete item.newDeal;
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
        let landlord = landlordList.slice(0);
        firstLandlord = '';   
            desk.deskList.map((item , index)=>{
                if(data.room == item.room){ 
                    if(item.gameOver == 'Y'){
                        delete item.gameOver;
                    }  
                    if(item.newDeal == 'Y'){
                        delete item.newDeal;
                    }               
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
                        console.log(landlord+'---------------');
                        firstLandlord = getOneCard(landlord);
                        console.log(firstLandlord+'---------------');
                        //当前房间的底牌                   
                        item.headCard = obj.headCard;
                        item.playerList.map((val,i)=>{
                            if(val.landowner == 'Y'){
                                delete item.playerList[i].landowner;
                            }
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
    });
      
    //抢地主
    socket.on('robHost',(data)=>{
       if(landlordNum == 4){
            landlordNum = 0;
            noRobArr = []
       }
       landlordNum++;
       console.log(landlordNum);
       desk.deskList.map((item , index)=>{
            if(data.room == item.room){
                if(item.newDeal == 'Y'){
                    delete item.newDeal;
                }                                                           
                item.playerList.map((val,i)=>{
                    if(data.landlordSit == 'left'){
                        // if(grabList.length == 0){
                        //     grabList.push(val.name);                                 
                        // }else{
                        //     for(let v in grabList){
                        //         if(val.name !== grabList[v]){
                        //             grabList.push(val.name);    
                        //         }
                        //     }
                        // } 
                        // item.grabList = grabList;
                        if(val.site == 'left'){
                            item.playerList[i].isGrad = 'Y';
                            item.playerList[i].text = data.text; 
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
                            item.playerList[i].isGrad = 'Y';
                            item.playerList[i].text = data.text;                         
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
                            item.playerList[i].isGrad = 'Y';
                            item.playerList[i].text = data.text;                        
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

        if(landlordNum == 4){
           let arr=noRobArr;
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   if(item.playerList.every(function(val){ return val.isRob == undefined})){
                      item.playerList.map((val,i)=>{
                          if(val.isLandlord == 'Y'){                                
                                delete item.playerList[i].isLandlord;                                
                          }
                          if(val.text !== ''){                                
                                delete item.playerList[i].text;                                
                          }                          
                          if(arr.length == 0){
                                if(data.landlordSit == val.site){
                                    item.playerList[i].showCard = 'Y';
                                    item.playerList[i].landowner = 'Y';                                  
                                    item.landlordIn = 'Y';
                                    for(let k in hiddenCards){
                                            item.playerList[i].cardsList.push(hiddenCards[k]);
                                            item.playerList[i].cardsList = item.playerList[i].cardsList.sort(cardSort)
                                        }
                                }
                            } 
                      }) 
                   }else{
                        item.playerList.map((val,i)=>{
                            if(val.isLandlord == 'Y'){ 
                                delete item.playerList[i].isLandlord;                                             
                            }
                            if(val.text !== ''){                                
                                delete item.playerList[i].text;                                
                            }
                            if(arr.length == 1){
                                if(data.landlordSit == val.site){
                                    item.playerList[i].showCard = 'Y'; 
                                    item.playerList[i].landowner = 'Y';                                    
                                    item.landlordIn = 'Y';
                                    for(let k in hiddenCards){
                                        item.playerList[i].cardsList.push(hiddenCards[k]);
                                        item.playerList[i].cardsList = item.playerList[i].cardsList.sort(cardSort)
                                    }
                                }
                            }
                        })
                   }
                
               }
           }) 
        }
        if(landlordNum == 3){
           let arr=noRobArr;
           desk.deskList.map((item , index)=>{
                if(data.room == item.room){
                    if(!item.playerList.every(function(val){ return val.isRob == undefined})){
                        item.playerList.map((val,i)=>{ 
                                if(arr.length == 2){                                    
                                    if(val.isRob !== 'Y'){    
                                        item.playerList[i].showCard = 'Y';
                                        item.playerList[i].landowner = 'Y'; 
                                        item.landlordIn = 'Y';
                                        for(let k in hiddenCards){
                                            item.playerList[i].cardsList.push(hiddenCards[k]);
                                            item.playerList[i].cardsList = item.playerList[i].cardsList.sort(cardSort)
                                        }
                                    }
                                    if(val.isLandlord == 'Y'){
                                        delete item.playerList[i].isLandlord;
                                    }
                                    if(val.text !== ''){                                
                                            delete item.playerList[i].text;                                
                                    }
                                 }                                                   
                        })
                    }
               }
           }) 
        }
        io.sockets.emit('robHost',desk.deskList); 
    })
    //不抢
    socket.on('notRobbing',(data)=>{
       if(landlordNum == 4){
            landlordNum = 0;
            noRobArr = []
       }
       landlordNum++; 
       console.log(landlordNum);      
       noRobArr.push(data.landlordSit);   
       desk.deskList.map((item , index)=>{
            if(data.room == item.room){ 
                if(item.newDeal == 'Y'){
                    delete item.newDeal;
                }                                                 
                item.playerList.map((val,i)=>{
                    if(data.landlordSit == 'left'){                                               
                        if(val.site == 'left'){                        
                            delete item.playerList[i].isLandlord;
                            item.playerList[i].isRob = 'Y';
                            item.playerList[i].text = data.text;
                        }
                        if(val.site == 'bottom'){
                            item.playerList[i].isLandlord = 'Y';
                        }
                    }
                    if(data.landlordSit == 'right'){                                                     
                        if(val.site == 'right'){                        
                            delete item.playerList[i].isLandlord;
                            item.playerList[i].isRob = 'Y';
                            item.playerList[i].text = data.text;
                        }
                        if(val.site == 'left'){
                            item.playerList[i].isLandlord = 'Y';
                        }
                    }
                    if(data.landlordSit == 'bottom'){                        
                        if(val.site == 'bottom'){                        
                            delete item.playerList[i].isLandlord;
                            item.playerList[i].isRob = 'Y';
                            item.playerList[i].text = data.text;
                        }
                        if(val.site == 'right'){
                            item.playerList[i].isLandlord = 'Y';
                        }
                    }                    
                })
            }
        }); 
        if(landlordNum == 4){
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   item.playerList.map((val,i)=>{
                        if(val.isLandlord == 'Y'){
                            delete item.playerList[i].isLandlord;
                        }
                        if(val.text !== ''){                                
                                delete item.playerList[i].text;                                
                        }
                        if(data.landlordSit == 'left'){
                            item.playerList[2].showCard = 'Y';
                            item.playerList[2].landowner = 'Y'; 
                            item.landlordIn = 'Y';
                            for(let k in hiddenCards){
                                    item.playerList[2].cardsList.push(hiddenCards[k]);
                                    item.playerList[2].cardsList = item.playerList[2].cardsList.sort(cardSort)
                                }  
                        }
                        if(data.landlordSit == 'bottom'){
                            item.playerList[0].showCard = 'Y';
                            item.playerList[0].landowner = 'Y'; 
                            item.landlordIn = 'Y';
                            for(let k in hiddenCards){
                                    item.playerList[0].cardsList.push(hiddenCards[k]);
                                    item.playerList[0].cardsList = item.playerList[0].cardsList.sort(cardSort)
                                }  
                        }
                        if(data.landlordSit == 'right'){
                            item.playerList[1].showCard = 'Y';
                            item.playerList[1].landowner = 'Y'; 
                            item.landlordIn = 'Y';
                            for(let k in hiddenCards){
                                    item.playerList[1].cardsList.push(hiddenCards[k]);
                                    item.playerList[1].cardsList = item.playerList[1].cardsList.sort(cardSort)
                                }  
                        }                       
                                                
                   })
               }
           }) 
        }        
        if(landlordNum == 3){
           let arr=noRobArr;
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   item.playerList.map((val,i)=>{                        
                        if(arr.length == 3){
                            landlordNum = 0;noRobArr=[];hiddenCards = []
                            item.newDeal = 'Y';
                            delete val.isRob;
                            delete val.showCard;
                            delete val.isGrad;
                            delete val.cardsList;
                            delete val.text;
                            delete val.isLandlord;
                            delete val.landowner;
                            delete item.headCard;
                            delete item.landlordIn;
                        }
                        if(arr.length == 2){
                            if(val.isRob !== 'Y'){    
                                item.playerList[i].showCard = 'Y';
                                item.playerList[i].landowner = 'Y'; 
                                item.landlordIn = 'Y';
                                for(let k in hiddenCards){
                                        item.playerList[i].cardsList.push(hiddenCards[k]);
                                        item.playerList[i].cardsList = item.playerList[i].cardsList.sort(cardSort)
                                    }
                            }
                            if(val.isLandlord == 'Y'){
                                delete item.playerList[i].isLandlord;
                            }
                            if(val.text !== ''){                                
                                delete item.playerList[i].text;                                
                            } 
                        }
                   })
               }
           }) 
        }
        
        io.sockets.emit('notRobbing',desk.deskList);         
    })
    //出牌
    socket.on('emitCard',(data)=>{
        console.log('出牌',data);
        console.log(firstOut);
        firstOut = data.landlordSit;
        console.log(firstOut,data.landlordSit);
        if(firstOut == data.landlordSit){
            noOut = [];
        }        
        let maxCard = data.maxCard;//当前牌面上最大的牌
        let outCard = data.outCard;//当前玩家出的牌
        if(maxCard.length == 0){//删除当前玩家的牌  
            let outData=[];
            for(let k in outCard){                                    
                cards.map((list,j)=>{
                    if(outCard[k]*1 == list.icon*1){
                        outData.push(list);
                    }
                })
            };
            console.log(typeJudge(outData));
            if(typeJudge(outData) !== null){
                desk.deskList.map((item , index)=>{
                    if(data.room == item.room){
                        if(item.gameOver == 'Y'){
                            delete item.gameOver;
                        }                     
                        item.maxCard = outCard;
                        item.playerList.map((val,i)=>{
                            if(val.noOut == 'Y'){
                               delete item.playerList[i].noOut; 
                            }  
                            if(data.landlordSit == 'left'){ 
                                    item.playerList[1].showCard = 'Y';                                                       
                                    if(val.site == 'left'){
                                        delete item.playerList[i].showCard;
                                        delete item.playerList[i].noOut;
                                        delete item.playerList[i].firstCard;
                                    }
                                    //if(val.site == 'bottom'){
                                        
                                        // if(val.noOut !== 'Y'){
                                        // item.playerList[i].showCard = 'Y'; 
                                        // }else{
                                        // item.playerList[2].showCard = 'Y'; 
                                        // }
                                    //}                        
                                    
                                }
                                if(data.landlordSit == 'right'){  
                                    item.playerList[0].showCard = 'Y';                     
                                    if(val.site == 'right'){                        
                                        delete item.playerList[i].showCard;
                                        delete item.playerList[i].noOut;
                                        delete item.playerList[i].firstCard;
                                    }
                                    //if(val.site == 'left'){
                                        
                                        // if(val.noOut !== 'Y'){
                                        // item.playerList[i].showCard = 'Y'; 
                                        // }else{
                                        // item.playerList[1].showCard = 'Y'; 
                                        // }
                                    //}   
                                    
                                }
                                if(data.landlordSit == 'bottom'){ 
                                    item.playerList[2].showCard = 'Y';                      
                                    if(val.site == 'bottom'){                        
                                        delete item.playerList[i].showCard;
                                        delete item.playerList[i].noOut;
                                        delete item.playerList[i].firstCard;
                                    }
                                    //if(val.site == 'right'){
                                        
                                        // if(val.noOut !== 'Y'){
                                        // item.playerList[i].showCard = 'Y'; 
                                        // }else{
                                        // item.playerList[0].showCard = 'Y'; 
                                        // }
                                    //}
                                    
                                }                                                                
                            if(val.site == data.landlordSit){                                                 
                                for(let k in outCard){                                    
                                    val.cardsList.map((list,j)=>{
                                            if(outCard[k]*1 == list.icon*1){
                                                item.playerList[i].cardsList.splice(j,1);
                                            }
                                    })
                                }                                
                            }
                        })
                        if(!item.playerList.every(function(val){ return val.cardsList.length>0})){
                            item.gameOver = 'Y';
                            noOut = [];
                            item.maxCard = [];
                            firstOut='';
                            landlordNum = 0;noRobArr=[];hiddenCards = [];
                            item.playerList.map((val,i)=>{
                                delete val.isRob;
                                delete val.showCard;
                                delete val.isGrad;
                                delete val.cardsList;
                                delete val.text;
                                delete val.firstCard;
                                delete val.noOut;
                                delete val.isLandlord;
                                // delete val.landowner;                                
                            })
                            delete item.headCard;
                            delete item.landlordIn;                            
                        }
                    }
                });
            }          
        }else{
            let maxData=[],outData=[];                      
            for(let z in maxCard){                                    
                cards.map((lists,h)=>{
                    if(maxCard[z]*1 == lists.icon*1){
                        maxData.push(lists);
                    }
                })
            }
            for(let k in outCard){                                    
                cards.map((list,j)=>{
                    if(outCard[k]*1 == list.icon*1){
                        outData.push(list);
                    }
                })
            }  
            console.log(maxData,outData);
            console.log(thanCard(maxData,outData));
            if(thanCard(maxData,outData)){ 
             desk.deskList.map((item , index)=>{
                if(data.room == item.room){                                       
                    item.playerList.map((val,i)=>{ 
                                if(val.noOut == 'Y'){
                                    delete item.playerList[i].noOut; 
                                } 
                                item.maxCard = outCard;                               
                                if(data.landlordSit == 'left'){ 
                                    item.playerList[1].showCard = 'Y';                    
                                    if(val.site == 'left'){
                                        delete item.playerList[i].showCard;
                                        delete item.playerList[i].noOut;
                                        delete item.playerList[i].firstCard;                                                   
                                    }
                                    //if(val.site == 'bottom'){
                                        
                                        // if(val.noOut !== 'Y'){
                                        // item.playerList[i].showCard = 'Y'; 
                                        // }else{
                                        // item.playerList[2].showCard = 'Y'; 
                                        // }
                                    //}                        
                                    
                                }
                                if(data.landlordSit == 'right'){  
                                    item.playerList[0].showCard = 'Y';                    
                                    if(val.site == 'right'){                        
                                        delete item.playerList[i].showCard;
                                        delete item.playerList[i].noOut;
                                        delete item.playerList[i].firstCard;
                                    }
                                    //if(val.site == 'left'){
                                        
                                        // if(val.noOut !== 'Y'){
                                        // item.playerList[i].showCard = 'Y'; 
                                        // }else{
                                        // item.playerList[1].showCard = 'Y'; 
                                        // }
                                    //}   
                                    
                                }
                                if(data.landlordSit == 'bottom'){ 
                                    item.playerList[2].showCard = 'Y';                     
                                    if(val.site == 'bottom'){                        
                                        delete item.playerList[i].showCard;
                                        delete item.playerList[i].noOut;
                                        delete item.playerList[i].firstCard;
                                    }
                                    //if(val.site == 'right'){
                                        
                                        // if(val.noOut !== 'Y'){
                                        // item.playerList[i].showCard = 'Y'; 
                                        // }else{
                                        // item.playerList[0].showCard = 'Y'; 
                                        // }
                                    //}
                                    
                                }                            
                                if(val.site == data.landlordSit){                                                 
                                    for(let k in outCard){                                    
                                        val.cardsList.map((list,j)=>{
                                                if(outCard[k]*1 == list.icon*1){
                                                    item.playerList[i].cardsList.splice(j,1);
                                                }
                                        })
                                    }                                
                                }                                                       
                    });
                    if(!item.playerList.every(function(val){ return val.cardsList.length>0})){
                        item.gameOver = 'Y';
                        noOut = [];
                        item.maxCard = [];
                        firstOut='';
                        landlordNum = 0;noRobArr=[];hiddenCards = [];
                        item.playerList.map((val,i)=>{
                            delete val.isRob;
                            delete val.showCard;
                            delete val.isGrad;
                            delete val.cardsList;
                            delete val.text;
                            delete val.firstCard;
                            delete val.noOut;
                            delete val.isLandlord;
                            // delete val.landowner;
                        })
                        delete item.headCard;
                        delete item.landlordIn;
                    }
                }
            });
            }                    
                  
        }               
        io.sockets.emit('emitCard',desk.deskList);
    });
    //不出
    socket.on('notPlayCard',(data)=>{ 
        console.log('不出',data);       
        noOut.push(data.landlordSit);
        desk.deskList.map((item , index)=>{
            if(data.room == item.room){                                               
                item.playerList.map((val,i)=>{
                    if(data.landlordSit == 'left'){                        
                        if(val.site == 'left'){                        
                            delete item.playerList[i].showCard;
                            item.playerList[i].noOut = 'Y';
                        }
                        if(val.site == 'bottom'){
                            item.playerList[i].showCard = 'Y';
                        }
                    }
                    if(data.landlordSit == 'right'){                        
                        if(val.site == 'right'){                        
                            delete item.playerList[i].showCard;
                            item.playerList[i].noOut = 'Y';
                        }
                        if(val.site == 'left'){
                            item.playerList[i].showCard = 'Y';
                        }
                    }
                    if(data.landlordSit == 'bottom'){                        
                        if(val.site == 'bottom'){                        
                            delete item.playerList[i].showCard;
                            item.playerList[i].noOut = 'Y';
                        }
                        if(val.site == 'right'){
                            item.playerList[i].showCard = 'Y';
                        }
                    }                    
                })
            }
        });
        if(noOut.length == 2){
           desk.deskList.map((item , index)=>{
               if(data.room == item.room){
                   item.playerList.map((val,i)=>{                            
                            if(val.noOut !== 'Y'){    
                                item.playerList[i].showCard = 'Y';
                                item.playerList[i].firstCard = 'Y';
                                noOut = [];
                                item.maxCard = [];
                                firstOut='';
                            }                
                   })
               }
           }) 
        } 
        io.sockets.emit('notPlayCard',desk.deskList);
    })

//聊天
socket.on('chat',(data)=>{
   console.log(data);
   desk.deskList.map((item , index)=>{
            if(data.room == item.room){                                               
                item.playerList.map((val,i)=>{
                    if(data.name == val.name){
                        item.playerList[i].chatText = data.chatText;
                    }              
                })
            }
        });
    io.sockets.emit('chat',desk.deskList);
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
    one = [] ; two = [] ; three = [] ; hiddenCards = [];
    let cards = Cards.slice(0);
    for(let i=0;i<3;i++){
        hiddenCards[i] = getOneCard(cards);
    }
    for(let j=0;j<17;j++){
        one[j] = getOneCard(cards);
    }
    for(let k=0;k<17;k++){
        two[k] = getOneCard(cards);
    }
    for(let z=0;z<17;z++){
        three[z] = getOneCard(cards);
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

