var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;

/**
 * 7. 动态生成测试用例集   Function.prototype.call
 *
 *
 *
 * */

describe('动态生成测试用例集',function(){
    var list=[
        {one:1,two:2,three:3},
        {one:2,two:4,three:6},
        {one:1,two:3,three:4},
        {one:1,two:2,three:4},
    ];
    function add(a,b){
        console.log(arguments,a,b);
        return a+b
    }
    describe('User', function() {
        describe('#save()', function() {
            list.forEach(function(test){
                it('should save without error', function() {
                    var newAdd=add.apply(null,[test.one,test.two]);
                    assert.equal(newAdd,test.three)
                });
            });
            it('-----------',function(){
                assert.equal(1,1);
            })
        });
    });
})