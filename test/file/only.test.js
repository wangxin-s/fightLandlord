var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;

var cardType = require('../../server/routes/units/room').cardType;
var compareCard = require('../../server/routes/units/room').compareCard;

/**
 * 4.  .only 测试使用 运行指定测试用例或者用例集
 *
 *
 * */

describe('.only 运行指定的测试用例集／测试用例',function(){
    describe('运行指定的用例集',function(){
        //describe.only('运行指定的用例集',function(){
        //it.only('[53] 单牌', function () {
        it('[53] 单牌', function () {
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
    describe('当前用例集不会被执行',function(){
    //describe.only('当前用例集不会被执行',function(){
        it('[0, 2] 火箭', function () {
            expect(
                cardType([0, 2])
            ).to.be.equal('对牌');
        });
    })
})