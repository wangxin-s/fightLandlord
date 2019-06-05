var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;
var cardType = require('../../server/routes/units/room').cardType;
var compareCard = require('../../server/routes/units/room').compareCard;

/**
 * 3.测试钩子方法
 * 1.before  用例集执行前 调用
 * 2.after   用例集执行后调用
 * 3.beforeEach  用例集内 单个用例测试前调用
 * 4.afterEach   用例集内 单个用例测试后调用
 *
 *
 * */
describe('mocha 测试钩子方法使用',function(){
    // var list=[0,1,2,3,4,5];
    before(function(){//当前用例集 执行前调用
        console.log('当前用例集 执行前调用');
    });
    after(function(){// 当前用例集 执行后调用
        console.log('当前用例集 执行后调用');
    });
    beforeEach(function(){ //当前用例集 每个用例执行前调用
        console.log('当前用例集 每个用例执行前调用');
    });
    afterEach(function(){  //当前用例集  每个用例执行后调用
        console.log('当前用例集 每个用例执行后调用');
    });
    it('单牌 比较--- [53]>[12]', function () {
        expect(
            compareCard([53], [12])
        ).to.be.equal(true);
    });
    it('火箭--单牌--- [52,53]>[12]', function () {
        expect(
            compareCard([52, 53], [12])
        ).to.be.equal(true);
    });
});

