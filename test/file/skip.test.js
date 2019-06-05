var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;
var cardType = require('../../server/routes/units/room').cardType;
var compareCard = require('../../server/routes/units/room').compareCard;

/**
 * 5. .skip 跳过某些测试用力
 *
 * */

describe('.skip 跳过某些测试用例',function(){
    describe('运行指定的用例集',function(){
        //describe.only('运行指定的用例集',function(){
        it.skip('[53] 单牌', function () {
            expect(
                cardType([53])
            ).to.be.equal('单牌');
        });
        it('[52,53] 火箭', function () {
            expect(
                cardType([52,53])
            ).to.be.equal('火箭');
        });
    })
    describe.skip('当前用例集不会被执行',function(){
        it('[0, 2] 火箭', function () {
            expect(
                cardType([0, 2])
            ).to.be.equal('对牌');
        });
    })
})

