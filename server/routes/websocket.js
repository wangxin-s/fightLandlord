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

    // 登录
    socket.on('login',(data)=> {
        let sql = 'select * from users where account='+'"'+data.account+'"';
        connect.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            let serverData = {...moduleData};
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