var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;

/**
 * 6. this.retries 当前测试用例执行多次   注释：仅失败的用例才会重复调用
 *
 *
 * */

describe('当前测试用例通过 retries方法重复执行多次',function(){
    beforeEach(function(){
        console.log('beforeEach');
    })
    afterEach(function(){
        console.log('afterEach');
    })
    it('retries方法重复执行多次', function () {
        this.retries(3);
        /**
         * 失败的用例才会被执行多次 重新测试 单个用例生命周期开始结束方法为被执行
         *
         * */
        expect(3).to.be.equal(4);
    })
});