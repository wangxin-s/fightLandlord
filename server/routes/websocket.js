/**
 * Created by ex-wangxin on 2018/9/13.
 */
var connect = require("./connect");
exports.websocket = function websocket(socket) {
    socket.emit('news', {hello: 'world1'});
    socket.on('news', function (data) {
        console.log(data);
        //socket.emit('news', data);
<<<<<<< HEAD
        var  sql = 'SELECT * FROM detail';
=======
        var  sql = 'SELECT * FROM test_tbl';
>>>>>>> 64f31a376507990fa704323407e3c0c29f871ee4
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
};