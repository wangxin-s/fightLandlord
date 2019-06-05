var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;

/**
 * 8.    this.slow定义超过多少时间  当前测试案例可被认为slow
 *
 *
 * */

describe('.slow方法定义 当前测试用例多久会被认为慢',function(){
    this.slow(10);
    it('js运行耗时时间较长--超过10ms会认为慢',function(){
        var m=function(){
            var i=0;
            while(i<100000000){
                i++
            }
            return true;
        };
        expect(m()).to.be.equal(true);
    })

    describe('异步对象返回结果慢--超过3000ms被认为慢',function(){
        var testFun=function(t){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve();
                    //reject();
                },t)
            })
        };
        it('promise 异步测试 testFun 300ms',function(){
            this.slow(200);
            return testFun(300);
        });
        it('promise 异步测试 testFun 3000ms',function(){
            this.slow(2000);
            return testFun(3000);
        });
    })
})

