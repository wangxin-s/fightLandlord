/**
 * Created by ex-wangxin on 2018/9/13.
 */
var mysql = require("mysql");

<<<<<<< HEAD
=======
// var pool = mysql.createConnection({
//     host     : 'localhost',
//     port: '3306',
//     user     : 'root',
//     password : '123456',
//     database: 'wx',
//     typeCast: true             // 是否把结果值转换为原生的 javascript 类型
// });
// var pool = mysql.createConnection({
//     host     : 'localhost',
//     port: '3306',
//     user     : 'root',
//     password : '123',
//     database: 'test',
//     typeCast: true,             // 是否把结果值转换为原生的 javascript 类型
// });

/*var pool = mysql.createConnection({
    host     : '172.16.15.205',
    port: '3306',
    user     : 'root',
    password : '123456',
    database: 'wx',
    typeCast: true,             // 是否把结果值转换为原生的 javascript 类型
});*/
>>>>>>> e7aad519d1e9704fc8a643eb3f51fd4fb666e376
var pool = mysql.createConnection({
    host     : '172.16.12.145',
    port: '3306',
    user     : 'root',
    password : '123456',
    database: 'test',
    typeCast: true,             // 是否把结果值转换为原生的 javascript 类型
});



pool.connect(function(err,connection){
    if(err){
        console.log("链接失败");
        console.log("新增打印");
        console.log(err);
        // throw(err)
    }else{
		console.log("链接成功");
		//console.log(connection)
    }
});
function query(sql,callback){
    pool.query(sql, function (err,rows) {
        callback(err,rows);
        //pool.end();
    });
}

exports.query =query;