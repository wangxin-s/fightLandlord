var assert = require('../node_modules/chai/index').assert;
var expect = require('../node_modules/chai/index').expect;

/**
 *  1.断言库  chai
 *
 * */

describe('断言库 chai常规用法',function(){
    describe('expect 使用',function(){
        //to
        it('to 相等',function(){
            expect(3+4).to.be.equal(7);
        });
        it('.not 断言取反 不相等',function(){
            expect(3+4).to.be.not.equal(8)
        });
        it('.deep + equal  递归比较对象的健值 ',function(){
            expect({name:123}).to.be.deep.equal({name:123})
        });
        it('.deep + property 比较对象的某个健值',function(){
            expect({name:{age:'123'}}).to.have.deep.property('name.age','123')
        });
        it('.any 在keys断言之前使用 any标记',function(){
            expect({name:'libai',age:'12',time:'ss'}).to.have.any.keys('name','age')
        });
        it('.all 在keys断言之前使用 all标记',function(){
            expect({name:'libai',age:'12',time:'ss'}).to.have.all.keys('name','age','time')
        });

        describe('.a(type)/.an(type)  测试值的类型',function(){
            it('.a(type)/.an(type)  测试值的类型 --string',function(){
                expect('123').to.be.a('string');
            });
            it('.a(type)/.an(type)  测试值的类型 --string',function(){
                expect('123').to.be.an('string');
            });

            it('.a(type)/.an(type)  测试值的类型 --number',function(){
                expect(123).to.be.a('number');
            });
            it('.a(type)/.an(type)  测试值的类型 --number',function(){
                expect(123).to.be.an('number');
            });

            it('.a(type)/.an(type)  测试值的类型--对象',function(){
                expect({ foo: 'bar' }).to.be.a('object');
            });
            it('.a(type)/.an(type)  测试值的类型--对象',function(){
                expect({ foo: 'bar' }).to.be.an('object');
            });

            it('.a(type)/.an(type)  测试值的类型--null',function(){
                expect(null).to.be.a('null');
            });
            it('.a(type)/.an(type)  测试值的类型--null',function(){
                expect(null).to.be.an('null');
            });

            it('.a(type)/.an(type)  测试值的类型--undefined',function(){
                expect(undefined).to.be.a('undefined');
            });
            it('.a(type)/.an(type)  测试值的类型--undefined',function(){
                expect(undefined).to.be.an('undefined');
            });
        });

        describe('.include/contains',function(){
            it('include 判断数组字符串 中是否包含某个值',function(){
                expect([1,2,3]).to.include(2);
            })
            it('include 判断数组字符串 中是否包含某个值',function(){
                expect('123123').to.include(2);
            })
            it('include 判断对象 中是否包含某个key值',function(){
                expect({name:'123',age:'234',age:'sdfsd'}).to.include.keys('name');
            })

            it('include 判断数组字符串 中是否包含某个值',function(){
                expect([1,2,3]).to.contains(2);
            })
            it('include 判断数组字符串 中是否包含某个值',function(){
                expect('123123').to.contains(2);
            })
            it('include 判断对象 中是否包含某个key值',function(){
                expect({name:'123',age:'234',age:'sdfsd'}).to.contains.keys('name');
            })
        });

        describe('.ok 断言目标为真值',function(){
            it('string 是真值',function(){
                expect('everything').to.be.ok;
            })
            it('number 是真值',function(){
                expect(123).to.be.ok;
            })
            it('0 是真值--反例',function(){
                expect(0).to.be.ok;
            })
            it('{} 是真值',function(){
                expect({}).to.be.ok;
            })
            it('[] 是真值',function(){
                expect([]).to.be.ok;
            })
            it('false 是真值',function(){
                expect(false).to.be.ok;
            })
            it('null 是真值',function(){
                expect(null).to.be.ok;
            })
            it('1 是真值',function(){
                expect(1).to.be.ok;
            })
        });

        describe('.true 断言目标为true 注：在比较时不会进行类型转换',function(){
            it('true 为 true',function(){
                expect(true).to.be.true;
            });
            it('1 为 true',function(){
                expect(1).to.be.not.true;
            });
        })

        describe('.false 断言目标为true 注：在比较时不会进行类型转换',function(){
            it('true 为 true',function(){
                expect(false).to.be.false;
            });
            it('0 不为 false',function(){
                expect(0).to.be.not.false;
            });
        })

        describe('.null 断言目标为null 注：在比较时不会进行类型转换',function(){
            it('null 为 null',function(){
                expect(null).to.be.null;
            });
            it('0 不为 null',function(){
                expect(0).to.be.not.null;
            });
        })

        describe('.undefined 断言目标为undefined 注：在比较时不会进行类型转换',function(){
            it('undefined 为 undefined',function(){
                expect(undefined).to.be.undefined;
            });
            it('0 不为 undefined',function(){
                expect(0).to.be.not.undefined;
            });
        })

        describe('match----断言匹配方法',function(){
            it('北京欢迎你 中  包含  欢迎',function(){
                expect('北京欢迎你').to.match(/欢迎/);
            })
        })
    })

    context('context specify 使用',function(){
        specify('判断对象中是否有某个健值',function(){
            //expect({name:{age:'123'}}).to.have.deep.property('name');
            expect({name:{age:'123'}}).to.have.deep.property('name.age','123');
        })
        specify('判断对象中是否有某个健值',function(){
            expect({name:{age:'123'}}).to.have.any.keys('name');
        })
        specify('判断对象中是否有某个健值',function(){
            expect({name:{age:'123'}}).to.have.any.keys('age')
        })
    });
});
