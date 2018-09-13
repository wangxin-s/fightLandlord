/**
 * Created by ex-wangxin on 2018/9/13.
 */
var mysql  = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    port: '3306',
    user     : 'root',
    password : '123456',
    database: 'wx',
    typeCast: true,             // 是否把结果值转换为原生的 javascript 类型
});

connection.connect(
    function(err){
        if(err){
            console.log("链接失败");
            throw(err)
        }else{
            console.log("链接成功");
        }
    }
);

var  sql = 'SELECT * FROM websites';
//查
connection.query(sql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();