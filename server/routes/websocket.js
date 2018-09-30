/**
 * Created by ex-wangxin on 2018/9/13.
 */
var connect = require("./connect");
var moduleData = {
    code: 200,
    msg: '成功'
}
exports.websocket = function websocket(socket) {
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
};