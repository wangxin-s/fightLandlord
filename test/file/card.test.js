// https://mochajs.cn/  中文文档
//http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html  阮一峰mocha详解

var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;
var cardType = require('../../server/routes/units/room').cardType;
var compareCard = require('../../server/routes/units/room').compareCard;

describe('牌型判断方法测试', function () {
    function scoreComparisonTest() {
        console.log('单牌', cardType([53]));
        console.log('火箭', cardType([52, 53]));
        console.log('单顺', cardType([1, 5, 9, 13, 17, 21, 25]));
        console.log('单顺', cardType([30, 34, 38, 42, 46, 50]));
        console.log('双顺', cardType([0, 1, 5, 6, 9, 10, 13, 15, 16, 19]));
        console.log('三顺', cardType([0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15]));
        console.log('三顺', cardType([47, 46, 45, 43, 42, 41, 39, 38, 37, 33, 35, 34]));
        console.log('对牌', cardType([0, 2]));
        console.log('三牌', cardType([0, 3, 2]));
        console.log('炸弹', cardType([8, 10, 11, 9]));
        console.log('三带一', cardType([0, 1, 2, 12]));
        console.log('三带二', cardType([16, 17, 19, 20, 21]));
        console.log('四带二', cardType([24, 25, 26, 27, 28, 31]));
        console.log('四带二', cardType([24, 25, 26, 27, 28, 29, 30, 31]));
        console.log('飞机带翅膀 true', cardType([0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 45]));
        console.log('飞机带翅膀 false', cardType([0, 1, 2, 5, 6, 7, 16, 17, 18, 20, 23, 45]));
        console.log('飞机带翅膀 false', cardType([0, 1, 2, 5, 6, 7, 12, 14, 15, 20, 23, 22]));
        console.log('飞机带翅膀  333 444 555 999 true', cardType([0, 1, 2, 5, 6, 7, 8, 10, 9, 20, 23, 22]));
        console.log('飞机带翅膀 true', cardType([0, 1, 2, 5, 6, 7, 8, 10, 9, 20, 23, 28]));


        //牌大小比较测试

        //单牌比较
        console.log('单牌', compareCard([53],
            [12]));
        console.log('单牌', compareCard([12],
            [13]));

        //火箭与其他牌比较
        console.log('火箭--单牌', compareCard([52, 53],
            [12]));
        console.log('火箭--对牌', compareCard([52, 53],
            [12, 13]));
        console.log('火箭--三牌', compareCard([52, 53],
            [12, 13, 14]));
        console.log('火箭--炸弹', compareCard([52, 53],
            [12, 13, 14, 15]));
        console.log('火箭--单顺', compareCard([52, 53],
            [12, 16, 20, 24, 28]));
        console.log('火箭--双顺', compareCard([52, 53],
            [16, 17, 20, 21, 24, 25, 28, 29]));
        console.log('火箭--三顺', compareCard([52, 53],
            [16, 17, 18, 20, 21, 22, 24, 25, 26]));
        console.log('火箭--三带一', compareCard([52, 53],
            [12, 13, 14, 30]));
        console.log('火箭--三带二', compareCard([52, 53],
            [12, 13, 14, 20, 21]));
        console.log('火箭--四带二', compareCard([52, 53],
            [12, 13, 14, 15, 0, 48]));
        console.log('火箭--四带二', compareCard([52, 53],
            [12, 13, 14, 15, 16, 17]));
        console.log('火箭--飞机带翅膀', compareCard([52, 53],
            [12, 13, 14, 16, 17, 18, 20, 21, 20, 4, 8, 39]));


        //单顺比较
        console.log('单顺--单顺', compareCard([6, 10, 14, 18, 22, 26, 28],
            [1, 5, 9, 13, 17, 21, 25]));

        //双顺比较
        console.log('双顺', compareCard([4, 7, 8, 11, 12, 14, 17, 18, 20, 21],
            [0, 1, 5, 6, 9, 10, 13, 15, 16, 19]));

        //三顺比较
        console.log('三顺', compareCard([16, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30],
            [0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15]));

        //对牌比较
        console.log('对牌', compareCard([13, 14],
            [0, 2]));

        //三牌比较
        console.log('三牌--三牌', compareCard([12, 13, 14],
            [0, 3, 2]));

        //炸弹比较
        console.log('炸弹--火箭', compareCard([0, 1, 2, 3],
            [52, 53]));
        console.log('炸弹--炸弹', compareCard([12, 13, 14, 15],
            [0, 1, 2, 3]));
        console.log('炸弹--单牌', compareCard([0, 1, 2, 3],
            [12]));
        console.log('炸弹--对牌', compareCard([0, 1, 2, 3],
            [12, 13]));
        console.log('炸弹--三牌', compareCard([0, 1, 2, 3],
            [12, 13, 14]));
        console.log('炸弹--单顺', compareCard([0, 1, 2, 3],
            [12, 16, 20, 24, 28]));
        console.log('炸弹--双顺', compareCard([0, 1, 2, 3],
            [16, 17, 20, 21, 24, 25, 28, 29]));
        console.log('炸弹--三顺', compareCard([0, 1, 2, 3],
            [16, 17, 18, 20, 21, 22, 24, 25, 26]));
        console.log('炸弹--三带一', compareCard([0, 1, 2, 3],
            [12, 13, 14, 30]));
        console.log('炸弹--三带二', compareCard([0, 1, 2, 3],
            [12, 13, 14, 20, 21]));
        console.log('炸弹--四带二', compareCard([0, 1, 2, 3],
            [12, 13, 14, 15, 0, 48]));
        console.log('炸弹--四带二', compareCard([0, 1, 2, 3],
            [12, 13, 14, 15, 16, 17]));
        console.log('炸弹--飞机带翅膀', compareCard([0, 1, 2, 3],
            [12, 13, 14, 16, 17, 18, 20, 21, 20, 4, 8, 39]));

        //三带一比较
        console.log('三带一', compareCard([12, 13, 14, 45],
            [0, 1, 2, 12]));
        /*console.log('三带一--三带二', compareCard([12,13,14,45],
         [0, 1, 2, 12,13]));*/

        //三带二比较
        console.log('三带二--三带二', compareCard([16, 17, 19, 20, 21],
            [0, 1, 2, 23, 22]));

        //四带二比较
        console.log('四带二--四带二', compareCard([24, 25, 26, 27, 28, 31],
            [4, 5, 6, 7, 45, 34]));

        //飞机带翅膀比较--
        console.log('飞机带翅膀 -- 三飞带翅膀', compareCard([12, 13, 14, 16, 17, 19, 20, 21, 22, 34, 35, 36],
            [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 45]));
        /*console.log('飞机带翅膀 -- (三飞带单--三飞带双)', compareCard([12,13,14,16,17,19,20,21,22,34,35,36],
         [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23,24,45,46]));
         console.log('飞机带翅膀 -- (三飞带单--双飞带单)', compareCard([12,13,14,16,17,19,20,21,22,34,35,36],
         [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23,24,45,46]));*/
    }

    it('[53] 单牌', function () {
        expect(
            cardType([53])
        ).to.be.equal('单牌');
    });
    it('[52, 53] 火箭', function () {
        expect(
            cardType([52, 53])
        ).to.be.equal('火箭');
    });
    it('[1, 5, 9, 13, 17, 21, 25]---- 单顺', function () {
        expect(
            cardType([1, 5, 9, 13, 17, 21, 25])
        ).to.be.equal('单顺');
    });
    it('[30, 34, 38, 42, 46, 50]---- 单顺', function () {
        expect(
            cardType([30, 34, 38, 42, 46, 50])
        ).to.be.equal('单顺');
    });
    it('[0, 1, 5, 6, 9, 10, 13, 15, 16, 19]---- 双顺', function () {
        expect(
            cardType([0, 1, 5, 6, 9, 10, 13, 15, 16, 19])
        ).to.be.equal('双顺');
    });
    it('[0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15]---- 双顺', function () {
        expect(
            cardType([0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15])
        ).to.be.equal('三顺');
    });
    var list = [
        {
            list: [53],
            value: '单牌'
        },
        {
            list: [52, 53],
            value: '火箭'
        }, {
            list: [1, 5, 9, 13, 17, 21, 25],
            value: '单顺'
        }, {
            list: [30, 34, 38, 42, 46, 50],
            value: '单顺'
        }, {
            list: [0, 1, 5, 6, 9, 10, 13, 15, 16, 19],
            value: '双顺'
        }, {
            list: [0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15],
            value: '三顺'
        }, {
            list: [47, 46, 45, 43, 42, 41, 39, 38, 37, 33, 35, 34],
            value: '三顺'
        }, {
            list: [0, 2],
            value: '对牌'
        }, {
            list: [0, 3, 2],
            value: '三牌'
        }, {
            list: [8, 10, 11, 9],
            value: '炸弹'
        }, {
            list: [0, 1, 2, 12],
            value: '三带一'
        }, {
            list: [16, 17, 19, 20, 21],
            value: '三带二'
        }, {
            list: [24, 25, 26, 27, 28, 31],
            value: '四带二'
        }, {
            list: [24, 25, 26, 27, 28, 29, 30, 31],
            value: '四带二'
        }, {
            list: [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 45],
            value: '飞机带翅膀'
        }, {
            list: [0, 1, 2, 5, 6, 7, 16, 17, 18, 20, 23, 45],
            value: '飞机带翅膀'
        }, {
            list: [0, 1, 2, 5, 6, 7, 12, 14, 15, 20, 23, 22],
            value: '飞机带翅膀'
        }, {
            list: [0, 1, 2, 5, 6, 7, 8, 10, 9, 20, 23, 22],
            value: '飞机带翅膀'
        }, {
            list: [0, 1, 2, 5, 6, 7, 8, 10, 9, 20, 23, 28],
            value: '飞机带翅膀'
        }
    ]
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        it('[' + item.list.toString() + ']----' + item.value, function () {
            expect(
                cardType(item.list)
            ).to.be.equal(item.value);
        })
    }

});
describe('牌型比较方法测试', function () {
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
    var list = [
        {
            list1: [53],
            list2: [12],
            type: '单牌比较',
            value: true
        },
        {
            list1: [52, 53],
            list2: [13],
            type: '火箭--单牌',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 13],
            type: '火箭--对牌',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 13, 14],
            type: '火箭--三牌',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 13, 14, 15],
            type: '火箭--炸弹',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 16, 20, 24, 28],
            type: '火箭--单顺',
            value: true
        }, {
            list1: [52, 53],
            list2: [16, 17, 20, 21, 24, 25, 28, 29],
            type: '火箭--双顺',
            value: true
        }, {
            list1: [52, 53],
            list2: [16, 17, 18, 20, 21, 22, 24, 25, 26],
            type: '火箭--三顺',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 13, 14, 30],
            type: '火箭--三带一',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 13, 14, 20, 21],
            type: '火箭--三带二',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 13, 14, 15, 0, 48],
            type: '火箭--四带二',
            value: true
        }, {
            list1: [52, 53],
            list2: [12, 13, 14, 16, 17, 18, 20, 21, 20, 4, 8, 39],
            type: '火箭--飞机带翅膀',
            value: true
        }, {
            list1: [6, 10, 14, 18, 22, 26, 28],
            list2: [1, 5, 9, 13, 17, 21, 25],
            type: '单顺--单顺',
            value: true
        }, {
            list1: [4, 7, 8, 11, 12, 14, 17, 18, 20, 21],
            list2: [0, 1, 5, 6, 9, 10, 13, 15, 16, 19],
            type: '双顺--双顺',
            value: true
        }, {
            list1: [16, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30],
            list2: [0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15],
            type: '三顺--三顺',
            value: true
        }, {
            list1: [13, 14],
            list2: [0, 2],
            type: '对牌--对牌',
            value: true
        }, {
            list1: [12, 13, 14],
            list2: [0, 3, 2],
            type: '三牌--三牌',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [52, 53],
            type: '炸弹--火箭',
            value: true
        }, {
            list1: [12, 13, 14, 15],
            list2: [0, 1, 2, 3],
            type: '炸弹--炸弹',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12],
            type: '炸弹--单牌',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 13],
            type: '炸弹--对牌',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 13, 14],
            type: '炸弹--三牌',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 16, 20, 24, 28],
            type: '炸弹--单顺',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [16, 17, 20, 21, 24, 25, 28, 29],
            type: '炸弹--双顺',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [16, 17, 18, 20, 21, 22, 24, 25, 26],
            type: '炸弹--三顺',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 13, 14, 30],
            type: '炸弹--三带一',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 13, 14, 20, 21],
            type: '炸弹--三带二',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 13, 14, 15, 0, 48],
            type: '炸弹--四带二',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 13, 14, 15, 16, 17],
            type: '炸弹--四带二',
            value: true
        }, {
            list1: [0, 1, 2, 3],
            list2: [12, 13, 14, 16, 17, 18, 20, 21, 20, 4, 8, 39],
            type: '炸弹--飞机带翅膀',
            value: true
        }, {
            list1: [12, 13, 14, 45],
            list2: [0, 1, 2, 12],
            type: '三带一--三带一',
            value: true
        }, {
            list1: [12, 13, 14, 45],
            list2: [0, 1, 2, 12, 13],
            type: '三带一--三带二',
            value: true
        }, {
            list1: [16, 17, 19, 20, 21],
            list2: [0, 1, 2, 23, 22],
            type: '三带二--三带二',
            value: true
        }, {
            list1: [24, 25, 26, 27, 28, 31],
            list2: [4, 5, 6, 7, 45, 34],
            type: '四带二--四带二',
            value: true
        }, {
            list1: [12, 13, 14, 16, 17, 19, 20, 21, 22, 34, 35, 36],
            list2: [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 45],
            type: '飞机带翅膀 -- 三飞带翅膀',
            value: true
        }, {
            list1: [12, 13, 14, 16, 17, 19, 20, 21, 22, 34, 35, 36],
            list2: [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 24, 45, 46],
            type: '飞机带翅膀 -- (三飞带单--三飞带双)',
            value: true
        }, {
            list1: [12, 13, 14, 16, 17, 19, 20, 21, 22, 34, 35, 36],
            list2: [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 24, 45, 46],
            type: '飞机带翅膀 -- (三飞带单--双飞带单)',
            value: true
        },
    ]
    list.forEach(function (item) {
        it(item.type + '-----[' + item.list1 + ']>[' + item.list2 + ']', function () {
            expect(
                compareCard(item.list1, item.list2)
            ).to.be.equal(item.value);
        })
    });
});
