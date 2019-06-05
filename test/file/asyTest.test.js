var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;
var request=require('supertest')('http://192.168.121.159:7300');
var request1=require('supertest')('localhost:3000');
/**
 *
 * 2.异步测试
 *
 * */
describe('异步测试', function () {
    it('1.异步测试结果全局设置延迟4000ms后超时', function (done) {
        this.timeout(4000);
        var m = function () {
            setTimeout(function(){
                done();
            },3000)
            return true
        };
        m();
    });
    it('2.异步测试结果单个用例集设置4000ms后超时', function (done) {
        setTimeout(function () {
            done();//测试结束
        }, 3000)
    }).timeout(4000)

    describe('promise',function(){
        var testFun=function(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve();
                    //reject();
                },300)
            })
        };
        it('1.promise 异步测试 返回promise 对象 让 promise 触发结果',function(){
            return testFun();
        });

        it('2.promise done()',function(done){
            new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve()
                },300)
            }).then(function(){
                expect(true).to.be.equal(true);
                //expect(true).to.be.equal(false);
                done();
            })
        })
    })

    describe('supertest 测试 mock 接口', function(){
        it('supertest example', function(done){
            request.get('/mock/5af2be71a4a6200e34678105/mock_cxg_copy/member/itemdiscussionlist.json')
                .expect(200)
                .end(function(err, res) {
                    expect(res).to.be.an('object');
                    //expect(res.body.body.pages).to.be.equal(17);
                    expect(res.body.body.pages).to.be.equal(16);
                    //console.log(res.body);
                    done();
                })
        })
    })

    describe('supertest1 测试 express 启动的本地 接口', function(){
        it('supertest example', function(done){
            request1.get('/user')
                .expect(200)
                .end(function(err, res) {
                    console.log(res.body);
                    expect(res).to.be.an('object');
                    //expect(res.body.body.pages).to.be.equal(17);
                    expect(res.body.code).to.be.equal('0000');
                    //console.log(res.body);
                    done();
                })
        })
    })
});
