var assert = chai.assert;
var expect = chai.expect;
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
        it('3.依赖window的ajax 异步测试',function(done){
            $.ajax({
                url:'http://192.168.121.159:7300/mock/5af2be71a4a6200e34678105/mock_cxg_copy/member/itemdiscussionlist.json',
                success:function(res){
                    console.log(res);
                    expect(true).to.be.equal(true);
                    expect(res.body).to.be.an('object');
                    expect(res.body.pages).to.be.equal(16);
                    //done();
                    done('接口返错误');
                }
            })
        });
    })
});
