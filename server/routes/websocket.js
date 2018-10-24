/**
 * Created by ex-wangxin on 2018/9/13.
 */
var connect = require("./connect");
var moduleData = {
    code: 200,
    msg: '成功'
}
exports.websocket = function websocket(socket,io) {
    console.log('websocket')
    // socket.emit('news', {hello: 'world1'});
    socket.on('news', function (data) {
        console.log(data);
        //socket.emit('news', data);

        var  sql = 'SELECT * FROM users';

        //查
        connect.query(sql,function (err, result) {
            console.log('------');
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            socket.emit('news', result);
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
        });

    });
    var obj={
        list:[],
        myCard:[],
        left:[],
        right:[],
        bottomCard:[]
    };
    socket.on('getCards',function(data){
        if(obj.list.length<=0){
            var list=[];
            for(var i=0;i<54;i++){
                list.push(i);
            }
            creatCard();
        }
        console.log(data);
        //js 随机整数方法
        function rnd(n, m){
            return Math.floor(Math.random()*(m-n+1)+n)
        }
        function creatCard(){
            for(var j=0;j<54;j++){
                var index=rnd(0,53);
                var one=list[j];
                var two=list[index];
                list[j]=two;
                list[index]=one;
            }
            var myCard=list.slice(0,17);
            myCard.sort(function(a,b){return b-a});
            obj= {
                list:list,
                myCard:myCard,
                left:obj.list.slice(17,34),
                right:obj.list.slice(34,51),
                bottomCard:obj.list.slice(51,54)
            }
        }

        socket.emit('getCards', obj);
    });

    //接收当前人出牌
    socket.on('emitCard',function(data){
        socket.emit('emitCard', {
            code:'0000',
            message:'出牌成功'
        });
        //向前端--发送最新的纸牌
        socket.emit('getCards', obj);
    });
    // 登录
    socket.on('login',(data)=> {
        var sql = 'select * from users where account='+'"'+data.account+'"';
        connect.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            // let serverData = {...moduleData};
            var serverData = {
                code: 200,
                msg: '成功'
            }
            if(result.length) {
                if(result[0].password===data.password) {
                    serverData.data = result[0]
                    socket.emit('login', serverData);
                    return;
                }else {
                    serverData.code = 202;
                    serverData.msg = '密码错误';
                    socket.emit('login', serverData);
                    return;
                }
                
            }else {
                serverData.code = 201;
                serverData.msg = '用户不存在';
                socket.emit('login', serverData);
                return;
            }
            
        });
    })
    //获取大厅数据
    socket.on('getHallInfo',(data)=>{
        let roomSql='SELECT * FROM gamehall';
        connect.query(roomSql,(err, result)=> {

            socket.emit('getHallInfo',result); 
        });
    });

    //选择房间座位
    socket.on('sit',function(data){
        let user_id=Number(data.userId);
        let userSql = 'SELECT * FROM users where id='+user_id;
        let updateUser= 'update users set roomId=?,locationSit =?  where id =?';
        let val=[data.id,data.location,user_id];
        connect.query(userSql,(err, result)=> {
             
            let sql = 'SELECT * FROM gamehall';
            if(result[0].locationSit===''){
                connect.query(updateUser,val,(err,result)=>{
                    connect.query(userSql,(err, result)=> {
                        let location="";
                        if(data.location==='p1'){
                            location='leftSit';
                        }else if(data.location==='p2'){
                            location='bottomSit';
                        }else if(data.location==='p3'){
                            location='rightSit';
                        }
                        let upDataSql = 'update gamehall set '+location+' =?  where roomId =?';
                        let upDateValue=[`${JSON.stringify(result[0])}`,Number(data.id)];
                        
                        connect.query(upDataSql,upDateValue,(err,result)=>{
                            connect.query(sql,(err,result)=>{
                                io.sockets.emit('getHallInfo',result);
                            });
                        }); 
                    });
                });
                
            }
            
        });
        
       
    })

    //退出大厅

    socket.on('exitHall',(data)=>{
        let sql = 'SELECT * FROM users,gamehall where users.roomId=gamehall.roomId and id='+Number(data.userId);
        connect.query(sql,(err,result)=>{
            if(result.length>0){
                let bearing='';
                if(result[0].locationSit==='p1'){
                   bearing= 'leftSit';
                }else if(result[0].locationSit==='p2'){
                   bearing= 'bottomSit';
                }else if(result[0].locationSit==='p3'){
                   bearing='rightSit';
                }
                let upDataSql = 'update gamehall set '+bearing+' =?  where roomId =?';
                let upDateValue=['',Number(result[0].roomId)];
                
                connect.query(upDataSql,upDateValue,(err,result)=>{
                    let userSql='update users set locationSit=? where id =?';
                    let val = ['',Number(data.userId)];
                    connect.query(userSql,val,(err,result)=>{
                        let roomSql='SELECT * FROM gamehall';
                        connect.query(roomSql,(err, result)=> {

                            io.sockets.emit('getHallInfo',result);
                             socket.emit('exitHall',Number(data.userId));
                        });
                    });
                });
            }else{
                socket.emit('exitHall',Number(data.userId));
            }
            
        });
    });
};