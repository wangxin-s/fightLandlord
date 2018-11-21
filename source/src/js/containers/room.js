/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux'
import card1 from '../../images/card/card_1061@2x.png';
import card2 from '../../images/card/card_1062@2x.png';
import card3 from '../../images/card/card_1063@2x.png';
import card4 from '../../images/card/card_1064@2x.png';
import card5 from '../../images/card/card_1065@2x.png';
import card6 from '../../images/card/card_1066@2x.png';
import card7 from '../../images/card/card_1066@2x.png';
import card8 from '../../images/card/card_1066@2x.png';
import card9 from '../../images/card/card_1066@2x.png';
import card10 from '../../images/card/card_1066@2x.png';
import card11 from '../../images/card/card_1066@2x.png';
import card12 from '../../images/card/card_1066@2x.png';
import card13 from '../../images/card/card_1066@2x.png';
import card14 from '../../images/card/card_1066@2x.png';
import card15 from '../../images/card/card_1066@2x.png';
import card16 from '../../images/card/card_1066@2x.png';
import card17 from '../../images/card/card_1066@2x.png';
import card_back from '../../images/card_back.png';

import Top from '../components/room/top';
import MyCard from '../components/room/myCard';
import MyPlayButton from '../components/room/myPlayButton';
import PlayLandlordButton from '../components/room/playLandlordButton';
import MyBeenOutCard from '../components/room/myBeenOutCard';
import LeftPlay from '../components/room/leftPlay';
import Bottom from '../components/room/bottom';
import {
    roomHandle, getCard
} from '../actions/room';

import {cardType, compareCard, cloneFun} from '../units/room';

//排序算法测试
import {
    sortBubble,
    orientSortBubble,
    sortSelect,
    sortInsert,
    sortHalfInsert,
    sortShell,
    sortMerge,
    countTime
} from '../units/sortAlgorithm';

let timer;//玩家操作倒计时
let timeTimer;//当前时间倒计时

const socket = require('socket.io-client')('http://localhost:3001');

class RoomMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 卡牌是否选择 及出牌控制  true：选中  'out'：出牌
            imgArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            // 出牌&不出  控制隐藏显示
            isShow_playCard: true,
            // 抢地主&不抢  控制隐藏显示
            isShow_playLandlord: false,
            // 已出的牌   控制隐藏显示
            isShow_beenOut: false,
            // 卡牌 数据源
            brandArr: [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17,],
            // 已出牌 的数据源
            outData: [],
            // 一号玩家数据源
            playerOneData: [],
            // 二号玩家数据源
            playerTwoData: [],
            // 玩家操作倒计时  控制隐藏显示
            isTimer: 1,
            // 玩家操作倒计时 时间
            count: 20,
            // 当前时间
            newTime: '',
            // 地主牌  翻转控制
            isRevers: false,
            //地主牌数据源
            list: [card_back, card_back, card_back],
            //抢地主的个数
            grabList : [],
            noGradList : [],
            //抢地主的名字
            grabName : '',
            //抢地主玩家所在位置
            landlordSit : '',
            //叫地主/抢地主显示(默认叫地主)
            landlordStatus : false,
            //抢地主图标显示
            grabImg : false,
            //当前牌面上最大的牌
            maxCard : [],
            //不出的显示隐藏
            noOutStatus : false,
            //地主图片显示隐藏
            landlordImg : false,
            //地主所在位置
            landlordShow : '',
            //时钟显示隐藏
            timerImg : '',
            //不出文字显示隐藏
            landlordText : '',
            noOutText : [],
            //重新发牌
            newDealStatus : false,
        }
    }

    //判断牌型 牌分值大小比较测试
    // scoreComparisonTest() {
    //     console.log('单牌', cardType([53]));
    //     console.log('火箭', cardType([52, 53]));
    //     console.log('单顺', cardType([1, 5, 9, 13, 17, 21, 25]));
    //     console.log('单顺', cardType([30, 34, 38, 42, 46, 50]));
    //     console.log('双顺', cardType([0, 1, 5, 6, 9, 10, 13, 15, 16, 19]));
    //     console.log('三顺', cardType([0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15]));
    //     console.log('三顺', cardType([47, 46, 45, 43, 42, 41, 39, 38, 37, 33, 35, 34]));
    //     console.log('对牌', cardType([0, 2]));
    //     console.log('三牌', cardType([0, 3, 2]));
    //     console.log('炸弹', cardType([8, 10, 11, 9]));
    //     console.log('三带一', cardType([0, 1, 2, 12]));
    //     console.log('三带二', cardType([16, 17, 19, 20, 21]));
    //     console.log('四带二', cardType([24, 25, 26, 27, 28, 31]));
    //     console.log('四带二', cardType([24, 25, 26, 27, 28, 29, 30, 31]));
    //     console.log('飞机带翅膀 true', cardType([0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 45]));
    //     console.log('飞机带翅膀 false', cardType([0, 1, 2, 5, 6, 7, 16, 17, 18, 20, 23, 45]));
    //     console.log('飞机带翅膀 false', cardType([0, 1, 2, 5, 6, 7, 12, 14, 15, 20, 23, 22]));
    //     console.log('飞机带翅膀  333 444 555 999 true', cardType([0, 1, 2, 5, 6, 7, 8, 10, 9, 20, 23, 22]));
    //     console.log('飞机带翅膀 true', cardType([0, 1, 2, 5, 6, 7, 8, 10, 9, 20, 23, 28]));


    //     //牌大小比较测试

    //     //单牌比较
    //     console.log('单牌', compareCard([53],
    //         [12]));
    //     console.log('单牌', compareCard([12],
    //         [13]));

    //     //火箭与其他牌比较
    //     console.log('火箭--单牌', compareCard([52, 53],
    //         [12]));
    //     console.log('火箭--对牌', compareCard([52, 53],
    //         [12, 13]));
    //     console.log('火箭--三牌', compareCard([52, 53],
    //         [12, 13, 14]));
    //     console.log('火箭--炸弹', compareCard([52, 53],
    //         [12, 13, 14, 15]));
    //     console.log('火箭--单顺', compareCard([52, 53],
    //         [12, 16, 20, 24, 28]));
    //     console.log('火箭--双顺', compareCard([52, 53],
    //         [16, 17, 20, 21, 24, 25, 28, 29]));
    //     console.log('火箭--三顺', compareCard([52, 53],
    //         [16, 17, 18, 20, 21, 22, 24, 25, 26]));
    //     console.log('火箭--三带一', compareCard([52, 53],
    //         [12, 13, 14, 30]));
    //     console.log('火箭--三带二', compareCard([52, 53],
    //         [12, 13, 14, 20, 21]));
    //     console.log('火箭--四带二', compareCard([52, 53],
    //         [12, 13, 14, 15, 0, 48]));
    //     console.log('火箭--四带二', compareCard([52, 53],
    //         [12, 13, 14, 15, 16, 17]));
    //     console.log('火箭--飞机带翅膀', compareCard([52, 53],
    //         [12, 13, 14, 16, 17, 18, 20, 21, 20, 4, 8, 39]));


    //     //单顺比较
    //     console.log('单顺--单顺', compareCard([6, 10, 14, 18, 22, 26, 28],
    //         [1, 5, 9, 13, 17, 21, 25]));

    //     //双顺比较
    //     console.log('双顺', compareCard([4, 7, 8, 11, 12, 14, 17, 18, 20, 21],
    //         [0, 1, 5, 6, 9, 10, 13, 15, 16, 19]));

    //     //三顺比较
    //     console.log('三顺', compareCard([16, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30],
    //         [0, 1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 15]));

    //     //对牌比较
    //     console.log('对牌', compareCard([13, 14],
    //         [0, 2]));

    //     //三牌比较
    //     console.log('三牌--三牌', compareCard([12, 13, 14],
    //         [0, 3, 2]));

    //     //炸弹比较
    //     console.log('炸弹--火箭', compareCard([0, 1, 2, 3],
    //         [52, 53]));
    //     console.log('炸弹--炸弹', compareCard([12, 13, 14, 15],
    //         [0, 1, 2, 3]));
    //     console.log('炸弹--单牌', compareCard([0, 1, 2, 3],
    //         [12]));
    //     console.log('炸弹--对牌', compareCard([0, 1, 2, 3],
    //         [12, 13]));
    //     console.log('炸弹--三牌', compareCard([0, 1, 2, 3],
    //         [12, 13, 14]));
    //     console.log('炸弹--单顺', compareCard([0, 1, 2, 3],
    //         [12, 16, 20, 24, 28]));
    //     console.log('炸弹--双顺', compareCard([0, 1, 2, 3],
    //         [16, 17, 20, 21, 24, 25, 28, 29]));
    //     console.log('炸弹--三顺', compareCard([0, 1, 2, 3],
    //         [16, 17, 18, 20, 21, 22, 24, 25, 26]));
    //     console.log('炸弹--三带一', compareCard([0, 1, 2, 3],
    //         [12, 13, 14, 30]));
    //     console.log('炸弹--三带二', compareCard([0, 1, 2, 3],
    //         [12, 13, 14, 20, 21]));
    //     console.log('炸弹--四带二', compareCard([0, 1, 2, 3],
    //         [12, 13, 14, 15, 0, 48]));
    //     console.log('炸弹--四带二', compareCard([0, 1, 2, 3],
    //         [12, 13, 14, 15, 16, 17]));
    //     console.log('炸弹--飞机带翅膀', compareCard([0, 1, 2, 3],
    //         [12, 13, 14, 16, 17, 18, 20, 21, 20, 4, 8, 39]));

    //     //三带一比较
    //     console.log('三带一', compareCard([12, 13, 14, 45],
    //         [0, 1, 2, 12]));
    //     /*console.log('三带一--三带二', compareCard([12,13,14,45],
    //      [0, 1, 2, 12,13]));*/

    //     //三带二比较
    //     console.log('三带二--三带二', compareCard([16, 17, 19, 20, 21],
    //         [0, 1, 2, 23, 22]));

    //     //四带二比较
    //     console.log('四带二--四带二', compareCard([24, 25, 26, 27, 28, 31],
    //         [4, 5, 6, 7, 45, 34]));

    //     //飞机带翅膀比较--
    //     console.log('飞机带翅膀 -- 三飞带翅膀', compareCard([12, 13, 14, 16, 17, 19, 20, 21, 22, 34, 35, 36],
    //         [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23, 45]));
    //     /*console.log('飞机带翅膀 -- (三飞带单--三飞带双)', compareCard([12,13,14,16,17,19,20,21,22,34,35,36],
    //      [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23,24,45,46]));
    //      console.log('飞机带翅膀 -- (三飞带单--双飞带单)', compareCard([12,13,14,16,17,19,20,21,22,34,35,36],
    //      [0, 1, 2, 5, 6, 7, 8, 9, 11, 18, 23,24,45,46]));*/
    // }

    // redux 参数重置
    resetRedux() {
        this.props._roomHandle({
            myCard: [],//我的牌
            mySelectCard: {},//当前玩家选中的牌
            left: [],//左侧玩家的牌
            right: [],//右侧玩家的牌
        })

        this.setState({
            // 出牌&不出  控制隐藏显示
            isShow_playCard: false,
            // 抢地主&不抢  控制隐藏显示
            isShow_playLandlord: false,
            isTimer: 1,
            landlordStatus:false,
            landlordImg : false,
            landlordShow : '',
            grabList : [],
            noGradList : [],
        })
    }

    //初始化生命周期函数
    componentDidMount() {
        clearInterval(timer);
        this.resetRedux();
        let room = window.location.href.split('&')[0].split('=')[1];
        let name = window.location.href.split('&')[1].split('=')[1];  
        let roomId = {
            room,
            name
        }
        this.props._roomHandle({
            roomId 
        });    
        socket.emit('getCards',roomId);    
        //进入房间
        // socket.on('toRoom',(data)=>{
        //     data.map((item,i)=>{
        //         if(room == item.room){                
        //             if(item.playerList.every(function(val){ return val.isFull})){
        //                 firstLandlord = landlord.splice(Math.ceil(Math.random()*landlord.length - 1) ,1)[0];                                                
        //                 // socket.emit('getCards',roomId);
        //             }                    
        //         }
        //     })
        //     this.props._roomHandle({
        //         roomData : data
        //     })
        // })
        //退出房间
        socket.on('outRoom',(data)=>{
           data.map((item , i)=>{
                if(room == item.room){
                    if(item.outRoom !== ''){
                        clearInterval(timer);
                        console.log(item.outRoom+'已离开');
                        this.setState({
                            newDealStatus : false,
                            isShow_beenOut : false,
                            landlordImg : false,
                            noOutStatus : false,
                            isShow_playLandlord: false,
                            isShow_playCard: false,
                            isRevers:false,
                            isTimer: 1,
                            count: 20,
                            timerImg : '',
                            noOutText : [],
                            landlordShow : ''
                        });
                        this.props._roomHandle({
                            myCardOut : []
                        });
                        return false; 
                    }
                }
           })                      
           this.props._roomHandle({
                roomData : data
            })
        })
        
        //排序算法时间测试
        let list = [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28];
        countTime(sortBubble, '冒泡排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
        countTime(orientSortBubble, '定向冒泡排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
        countTime(sortSelect, '选择排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
        countTime(sortInsert, '插入排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
        countTime(sortHalfInsert, '二分插入排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
        countTime(sortShell, '希尔排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
        countTime(sortMerge, '归并排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
        
        //调用接口获取发牌内容
        socket.on('getCards', (data) => {
            let bottomCard,myCard=[],left=[],right=[],isShow_playLandlord='',landlordSit='',grabName='';
            data.map((item,i)=>{
                if(room == item.room){ 
                     clearInterval(timer);
                     bottomCard = item.headCard              
                     for(let j in item.playerList){
                         if(item.playerList[j].isLandlord === 'Y'){
                            this.setState({
                                timerImg : item.playerList[j].name,
                                landlordSit : item.playerList[j].site,
                                count : this.state.count,
                                grabName : item.playerList[j].name,
                                newDealStatus : false
                            });                            
                            this.robTimer();
                         }
                        if(name == item.playerList[j].name){
                            myCard = item.playerList[j].cardsList;                                                   
                            if(item.playerList[j].isLandlord == 'Y'){                                
                                isShow_playLandlord = 'Y'; 
                                landlordSit = item.playerList[j].site;
                                grabName = item.playerList[j].name;
                            }                       
                        }                         
                     }                 
                }
            })                   
            if(isShow_playLandlord == 'Y'){
                this.setState({
                    isShow_playLandlord,
                    isTimer: 1,
                    count: 20,
                    landlordSit,
                    grabName                    
                })            
            }
            this.props._roomHandle({
                bottomCard,//顶部中间的底牌
                myCard,//我的牌
                roomData : data,
                left,
                right
            })
         });

         //抢地主
         socket.on('robHost',(data)=>{
            console.log(data);
            let  bottomCard,myCard=[],isShow_playLandlord='',landlordSit='',isShow_playCard=false;
            let grabList=[];
            data.map((item,i)=>{
                if(room == item.room){
                    clearInterval(timer);                    
                    this.setState({
                        landlordStatus : true,                        
                    })
                    if(item.landlordIn == 'Y'){
                        clearInterval(timer);
                        this.revers();
                        this.setState({
                            grabImg : false,                           
                        })
                    } 
                     bottomCard = item.headCard                           
                    for(let j in item.playerList){
                        if(item.playerList[j].isGrad == 'Y'){
                            grabList.push(item.playerList[j].name);
                            this.setState({
                                grabList
                            })
                        }
                        if(item.playerList[j].showCard == 'Y'){
                            let length = item.playerList[j].cardsList.length;
                            let key = item.playerList[j].cardsList[length-1].icon;
                            let mySelectCard = {};
                            mySelectCard[key] = true;
                            this.props._roomHandle({
                                mySelectCard
                            });
                            this.setState({
                                landlordShow : item.playerList[j].name,
                                timerImg : item.playerList[j].name,
                                landlordSit : item.playerList[j].site,
                                count : this.state.count,
                                noGradList : [],
                                grabList : []                                
                            });
                            clearInterval(timer);
                            this.playCardTimer(2);
                         }
                         if(item.playerList[j].isLandlord === 'Y'){                            
                            this.setState({
                                timerImg : item.playerList[j].name,
                                landlordSit : item.playerList[j].site,
                                count : this.state.count
                            });                            
                            this.robTimer();
                         }                        
                        if(name == item.playerList[j].name){ 
                            myCard = item.playerList[j].cardsList;                                                                             
                            if(item.playerList[j].isLandlord == 'Y'){                                
                                isShow_playLandlord = 'Y'; 
                                landlordSit = item.playerList[j].site
                            } 
                            if(item.playerList[j].showCard == 'Y'){
                                isShow_playCard = true;
                                landlordSit = item.playerList[j].site;                                                                
                                this.revers();                                
                            }
                            if(item.playerList[j].isRob == 'Y'){
                                this.setState({
                                    grabImg : false
                                })
                            }else{
                                this.setState({
                                    grabImg : true
                                })
                            }                     
                        }                         
                     }                 
                }
            }) 
            this.props._roomHandle({
                roomData : data,                    
            }) 
            if(isShow_playCard){
                this.setState({
                    isShow_playCard,
                    isShow_playLandlord :'',
                    isTimer: 1,
                    count: 20, 
                    landlordSit,
                    noOutStatus: true,  
                    landlordImg : true,                                     
                }) 
                this.props._roomHandle({
                    bottomCard,//顶部中间的底牌
                    myCard,//我的牌
                    roomData : data,                    
                })                                            
            }else{
                if(isShow_playLandlord == 'Y'){
                    this.setState({
                        isShow_playLandlord,
                        isShow_playCard: false,  
                        isTimer: 1,
                        count: 20,
                        landlordSit,                    
                    })            
                }else{
                    this.setState({
                        isShow_playLandlord: false,
                        isShow_playCard: false,
                        isTimer: 1,                     
                        count: 20, 
                        landlordSit                                
                    })
                }
               
            }                  
            
            
         })

         //不抢
         socket.on('notRobbing',(data)=>{
             console.log(data);
             console.log('--------------');          
            let bottomCard,myCard=[],isShow_playLandlord='',landlordSit='',isShow_playCard=false; 
            let grabList = this.state.grabList;   
            let noGradList = [];   
            data.map((item,i)=>{
                if(room == item.room){
                    clearInterval(timer);
                    if(item.newDeal === 'Y'){ 
                        clearInterval(timer);
                        this.props._roomHandle({
                            roomData : data,                    
                        });
                        this.setState({
                            timerImg : '',
                            isRevers:false,
                            newDealStatus : true
                        }) 
                        //重新发牌
                        // if(name == 'YH8022'){
                        //     socket.emit('getCards',roomId);
                        // }
                        return false;                    
                    }else{

                    if(grabList.length > 0){
                        this.setState({
                            landlordStatus : true
                        })
                    }else{
                        this.setState({
                            landlordStatus : false
                        })
                    }
                    if(item.landlordIn == 'Y'){
                        clearInterval(timer);
                        this.revers();
                        this.setState({
                            grabImg : false,                          
                        })
                    }                      
                     bottomCard = item.headCard                         
                     for(let j in item.playerList){
                         if(item.playerList[j].isRob == 'Y'){
                            noGradList.push(item.playerList[j].name);
                            this.setState({
                                noGradList
                            })
                        }
                        if(item.playerList[j].showCard == 'Y'){
                            let length = item.playerList[j].cardsList.length;
                            let key = item.playerList[j].cardsList[length-1].icon;
                            let mySelectCard = {};
                            mySelectCard[key] = true;
                            this.props._roomHandle({
                                mySelectCard
                            });
                            this.setState({
                                landlordShow : item.playerList[j].name,
                                timerImg : item.playerList[j].name,
                                landlordSit : item.playerList[j].site,
                                count : this.state.count,
                                noGradList : [],
                                grabList : []                                
                            });
                            clearInterval(timer);
                            this.playCardTimer(2);
                         }
                        if(item.playerList[j].isLandlord === 'Y'){
                            this.setState({
                                timerImg : item.playerList[j].name,
                                landlordSit : item.playerList[j].site,
                                count : this.state.count
                            });
                            this.robTimer();
                         }
                        if(name == item.playerList[j].name){                              
                             myCard = item.playerList[j].cardsList;                                                                           
                            if(item.playerList[j].isLandlord == 'Y'){                                
                                isShow_playLandlord = 'Y'; 
                                landlordSit = item.playerList[j].site;
                            } 
                            if(item.playerList[j].showCard == 'Y'){
                                isShow_playCard = true;  
                                landlordSit = item.playerList[j].site;
                            }
                            if(item.playerList[j].isRob == 'Y'){
                                this.setState({
                                    grabImg : false
                                })
                            }else{
                                this.setState({
                                    grabImg : true
                                })
                            }                    
                        }                         
                     } 
                    }

                }
            });                            
            this.props._roomHandle({
                roomData : data,                    
            });
            if(isShow_playCard){
                this.setState({
                    isShow_playCard,
                    isShow_playLandlord : '',
                    isTimer: 1,
                    count: 20, 
                    landlordSit,
                    noOutStatus: true,
                    landlordImg : true,                                                
                })  
                this.props._roomHandle({
                    bottomCard,//顶部中间的底牌
                    myCard,//我的牌
                    roomData : data,                    
                })                                          
            }else{
                if(isShow_playLandlord == 'Y'){
                    this.setState({
                        isShow_playLandlord,
                        isShow_playCard: false,
                        isTimer: 1,
                        count: 20,
                        landlordSit,                    
                    })            
                }else{
                    this.setState({
                        isShow_playLandlord: false, 
                        isShow_playCard: false, 
                        isTimer: 1,                 
                        count: 20, 
                        landlordSit                                
                    })
                }
            }                 
            
         })
        //玩家出牌
        socket.on('emitCard',(data)=>{
            console.log(data);  
            let bottomCard,myCard=[],isShow_playCard,landlordSit;
            data.map((item,i)=>{
                if(room == item.room){                    
                     clearInterval(timer);
                     if(item.gameOver == 'Y'){
                        clearInterval(timer);
                        alert('gameOver');
                        this.setState({
                            newDealStatus : true,
                            isShow_beenOut : false,
                            landlordImg : false,
                            noOutStatus : false,
                            isRevers:false,
                            timerImg : '',
                            noOutText : [],
                            landlordShow : ''
                        });
                        this.props._roomHandle({
                            myCardOut : []
                        });                        
                        return false;
                     }else{

                        if(item.maxCard !== undefined){
                            if(item.maxCard.length > 0){
                                this.props._roomHandle({
                                    myCardOut : item.maxCard
                                });
                                this.setState({
                                    isShow_beenOut : true,
                                    maxCard : item.maxCard,
                                    noOutText : []
                                })
                                console.log(item.maxCard);
                            }else{
                                this.props._roomHandle({
                                    myCardOut : item.maxCard
                                });
                                this.setState({
                                    isShow_beenOut : false,
                                    maxCard : item.maxCard
                                })
                                // alert('不符合出牌规则');
                            }                        
                        }
                        bottomCard = item.headCard              
                        for(let j in item.playerList){
                            if(item.playerList[j].showCard == 'Y'){
                                this.setState({                                
                                    timerImg : item.playerList[j].name,
                                    landlordSit : item.playerList[j].site,
                                    count : this.state.count                                
                                });
                                this.props._roomHandle({
                                    mySelectCard : {}
                                });
                                this.playCardTimer(1);
                            } 
                            if(name == item.playerList[j].name){
                                myCard = item.playerList[j].cardsList;                                                                                                    
                                if(item.playerList[j].showCard == 'Y'){
                                    isShow_playCard = true;
                                    landlordSit = item.playerList[j].site;                                                                
                                }                        
                            } 
                        } 
                     }                     

                }
            });
            if(isShow_playCard){
                this.setState({
                    isShow_playCard,
                    landlordSit,
                    isTimer: 1,
                    count: 20,                    
                })        
            }else{
                this.setState({
                    isShow_playCard:false,
                    isTimer: 1,
                    count: 20,                    
                }) 
            };
            this.props._roomHandle({
                bottomCard,//顶部中间的底牌
                myCard,//我的牌
                roomData : data,
            });
        })
        //玩家不出牌
        socket.on('notPlayCard',(data)=>{
            clearInterval(timer);
            console.log(data);              
            let bottomCard,myCard=[],isShow_playCard,landlordSit;
            data.map((item,i)=>{
                if(room == item.room){
                     bottomCard = item.headCard 
                     if(item.maxCard !== undefined){
                         if(item.maxCard.length > 0){
                            this.props._roomHandle({
                                myCardOut : item.maxCard
                            });                            
                         }else{
                            this.props._roomHandle({
                                myCardOut : item.maxCard
                            });                           
                         }                        
                     }             
                     for(let j in item.playerList){
                        if(item.playerList[j].showCard == 'Y'){
                            this.setState({                                
                                timerImg : item.playerList[j].name,
                                landlordSit : item.playerList[j].site, 
                                count : this.state.count                               
                            });                            
                            clearInterval(timer);
                            this.playCardTimer(1);
                        }
                        if(item.playerList[j].noOut == 'Y'){                            
                            let noOutText = this.state.noOutText;
                            if(noOutText.length > 0){
                                if(noOutText[0] !== item.playerList[j].name ){
                                    noOutText.push(item.playerList[j].name);  
                                }                            
                            }else{
                                noOutText.push(item.playerList[j].name);
                            }
                            this.setState({
                                noOutText
                            })                          
                        }
                        
                        if(item.playerList[j].firstCard == 'Y'){
                            let length = item.playerList[j].cardsList.length;
                            let key = item.playerList[j].cardsList[length-1].icon;
                            let mySelectCard = {};
                            mySelectCard[key] = true;
                            this.setState({                                
                                timerImg : item.playerList[j].name,
                                landlordSit : item.playerList[j].site, 
                                count : this.state.count,                             
                            });
                            if(name == item.playerList[j].name){
                                this.props._roomHandle({
                                    mySelectCard
                                });
                            }
                            clearInterval(timer);
                            this.playCardTimer(2);
                        }
                        if(name == item.playerList[j].name){
                            myCard = item.playerList[j].cardsList;                                                                                                    
                            if(item.playerList[j].showCard == 'Y'){
                                isShow_playCard = true;
                                landlordSit = item.playerList[j].site;                                                                
                            }
                            if(item.playerList[j].firstCard == 'Y'){
                               this.setState({
                                    noOutStatus : true,
                                    maxCard : [],
                               })                                                                                              
                            }else{
                               this.setState({
                                   noOutStatus : false
                               }) 
                            }                        
                        } 
                     }                 
                }
            });
            this.props._roomHandle({
                bottomCard,//顶部中间的底牌
                myCard,//我的牌
                roomData : data,
            });
            if(isShow_playCard){
                this.setState({
                    isShow_playCard,
                    landlordSit,
                    isTimer: 1,
                    count: 20,                    
                })        
            }else{
                 this.setState({
                    isShow_playCard:false,
                    isTimer: 1,
                    count: 20,                    
                })
            };  
        })

        //左侧玩家出牌接口
        socket.on('leftPushCards', (data) => {
            this.props._roomHandle({
                leftList: data.leftList,//左侧玩家出的牌
            })
        });
        //右侧玩家出牌接口
        socket.on('rightPushCards', (data) => {
            this.props._roomHandle({
                rightList: data.rightList,//右侧玩家出的牌
            })
        });
        /*// 获取当前时间  倒计时
         timeTimer = setInterval(() => {
         let date = new Date();
         let hours = date.getHours();
         let minutes = date.getMinutes();
         let seconds = date.getSeconds();
         let newTime = hours + ':' + minutes + ':' + seconds;
         this.setState({
         newTime: newTime
         })
         }, 1000)

         // 玩家操作  倒计时
         timer = setInterval(() => {
         if (this.state.count == 1) {
         let isTimer = 1;
         if (this.state.isTimer == 1) {
         isTimer = 2;
         }
         if (this.state.isTimer == 2) {
         isTimer = 3;
         }
         this.setState({
         isShow_playLandlord: false,
         isTimer: isTimer,
         count: 10,
         })
         } else {
         console.log('timer')
         this.setState({
         count: this.state.count -= 1
         })
         }
         }, 1000)*/
    }

    componentWillUnmount() {
        clearInterval(timeTimer);
        clearInterval(timer);
    }

    //退出房间
    outRoom(data){
        clearInterval(timer);
        socket.emit('outRoom',data)
        this.props.history.push("/hall/"+data.name); 
    }   

    //当牌被点击时
    imgClick = (index) => {
        let myCard = this.props.room.myCard;
        let mySelectCard = this.props.room.mySelectCard;
        let check = false;
        mySelectCard[myCard[index].icon] = mySelectCard[myCard[index].icon] ? false : true;
        this.props._roomHandle({
            mySelectCard
        })
    };

    //不出
    notOut() {        
        let roomId = this.props.room.roomId;
        roomId.landlordSit = this.state.landlordSit;
        //告诉后台--不出牌
        socket.emit('notPlayCard', roomId);
        let state = this.state.imgArr;
        state.forEach((item, index) => {
            state[index] = false;
        });
        this.setState({
            imgArr: state,
            noOutStatus : false,
            isTimer : 1,
            count : 20
        })
    }

    // 出牌
    playCard() {
        let room = this.props.room;
        let roomId = room.roomId;
        let mySelectCard = room.mySelectCard;
        let myCard = cloneFun(room.myCard);//去掉玩家已出的牌后玩家现有的牌
        let maxCard = this.state.maxCard;
        let list = [];//当前玩家出的牌
        for (let key in mySelectCard) {
            if (mySelectCard[key]) {
                list.push(key);
                myCard.splice(myCard.findIndex(item =>item.icon == key), 1)
            }
        }
        if (list.length <= 0) {
            alert('请选择要出的牌');
        }
        // console.log(list, myCard);
        // //判断牌型
        // console.log('上家的牌', cardType(cloneFun(room.left)));
        // console.log('玩家选中的牌', cardType(cloneFun(list)));

        // //比较牌的大小
        // let check = compareCard(list, room.left);
        // console.log('上家和当前玩家出的牌--比较', check);
        // if (!check) {
        //     return false
        // }

        this.props._roomHandle({
            myCard, myCardOut: list, mySelectCard: {}
        });
        // this.setState({
        //     isShow_playCard: false,
        //     // isTimer: 1,
        //     // count:20,
        //     isShow_beenOut: true,
        //     noOutStatus : false
        // });
        // return false;
        roomId.maxCard = maxCard;
        roomId.outCard = list;
        roomId.landlordSit = this.state.landlordSit;
        //调用接口出牌
        socket.emit('emitCard', roomId);
    }

    // 不抢
    noLandlord() {
        console.log(2222);
        clearInterval(timer);
        let roomId = this.props.room.roomId;
        let landlordStatus = this.state.landlordStatus;
        let text = '';
        if(landlordStatus){
            text = '不抢'
        }else{
            text = '不叫'
        }
        roomId.landlordSit = this.state.landlordSit;
        roomId.text = text
        socket.emit('notRobbing', roomId);
        // this.setState({
        //     isShow_playLandlord: false,
        //     isTimer: 1,
        //     count: 20,
        //     landlordStatus : true
        // }, () => {
        //     console.log(1111);
        //     this.robTimer();
        // })
    }

    //抢地主
    playLandlord() {
        clearInterval(timer);
        //告诉后台抢地主
        let roomId = this.props.room.roomId;
        let landlordStatus = this.state.landlordStatus;
        let text = '';
        if(landlordStatus){
            text = '抢地主'
        }else{
            text = '叫地主'
        }        
        roomId.landlordSit = this.state.landlordSit;
        roomId.text = text;
        socket.emit('robHost', roomId);
        // this.setState({
        //     isShow_playLandlord: false,
        //     isTimer: 1,
        //     count: 20,
        //     landlordStatus : true
        // }, () => {
        //     this.robTimer();
        // })
    }

    //抢地主定时器
    robTimer() {
        let roomId = this.props.room.roomId;  
        let timerImg = this.state.timerImg; 
        let landlordStatus = this.state.landlordStatus;
        let text = '';
        console.log(timerImg)        
        if(landlordStatus){
            text = '不抢'
        }else{
            text = '不叫'
        }     
        roomId.landlordSit = this.state.landlordSit;
        roomId.text = text;
        timer = setInterval(() => {
            let obj = this.state;
            if (this.state.count == 1 && timerImg == roomId.name) {              
                clearInterval(timer);
                socket.emit('notRobbing', roomId);                       
                if (obj.isTimer == 1) {
                    this.setState({
                        isShow_playLandlord: false,
                        isTimer: obj.isTimer + 1,
                        count: 20,
                    })
                } else if (obj.isTimer >= 3) {
                    clearInterval(timer);
                    this.setState({
                        isShow_playCard: true,
                        isTimer: 1,
                        count: 20,
                    })
                } else {
                    this.setState({
                        count: 20,
                        isTimer: obj.isTimer + 1,

                    })
                }
            } else {
                this.setState({
                    count: this.state.count - 1,
                });
                console.log(this.state.count);
            }
        }, 1000)
    }

    //出牌定时器
    playCardTimer(type) {
        let roomId = this.props.room.roomId;  
        let timerImg = this.state.timerImg;                   
        timer = setInterval(() => {
            let obj = this.state;
            if (this.state.count == 1 && timerImg == roomId.name) {
                clearInterval(timer);
                if(type == 1){
                    this.notOut();
                }
                if(type == 2){
                    this.playCard();
                }
                if (obj.isTimer == 1) {
                    this.setState({
                        isShow_playCard: false,
                        isTimer: obj.isTimer + 1,
                        count: 20,
                        isShow_beenOut: true,
                    })
                } else if (obj.isTimer >= 3) {
                    this.setState({
                        isShow_playCard: true,
                        isTimer: 1,
                        count: 20,
                        isShow_beenOut: false,
                    })
                } else {
                    this.setState({
                        count: 20,
                        isTimer: obj.isTimer + 1,
                    })
                }
            } else {
                this.setState({
                    count: this.state.count - 1,
                })
            }
        }, 1000)
    }

    //地主牌翻转 
    revers() {
        let bottomCard = this.props.room.bottomCard;
        this.setState({
            isRevers: true,
        }, ()=> {
            this.setState({
                list: bottomCard,
                brandArr: this.state.brandArr.concat(bottomCard),
            })
        })
    }

    //开始发牌点击事件
    startCard = ()=> {
        socket.emit('getCards', '发送消息--发牌');
        this.setState({
            isShow_playCard: true,
            isTimer: 1,
            count: 20,
        })
    }

    newDealFun(){
        let roomId = this.props.room.roomId;        
        socket.emit('getCards',roomId);        
    }

    render() {
        let room = this.props.room;
        return (
            <div id="landlord-room">
                {/*顶部展示区域 start*/}
                <Top
                    list={this.state.list}
                    newTime={this.state.newTime}
                    isRevers={this.state.isRevers}
                    revers={this.revers.bind(this)}
                    outRoom={this.outRoom.bind(this)}
                    roomId={room.roomId}
                />
                {/*顶部展示区域 end*/}

                <div className="room-container">
                    {/*其他玩家区域 start*/}
                    <LeftPlay
                        leftList={room.left}
                        rightList={room.right}
                        bottomList={room.myCard}
                        grabImg={this.state.grabImg}
                        noOutText={this.state.noOutText}
                        landlordShow={this.state.landlordShow}
                        grabList={this.state.grabList}
                        noGradList={this.state.noGradList}
                        isTimer={this.state.isTimer}
                        timerImg={this.state.timerImg}
                        count={this.state.count}
                        roomId = {room.roomId}
                        roomData = {room.roomData}
                    />
                    {/*其他玩家区域 end*/}

                    <div className="my-show-brand">
                        {/* 不出&出牌 按钮 start */}
                        <MyPlayButton
                            show={this.state.isShow_playCard}
                            isTimer={this.state.isTimer}
                            noOutStatus={this.state.noOutStatus}
                            count={this.state.count}
                            notOut={this.notOut.bind(this)}
                            playCard={this.playCard.bind(this)}
                        />
                        {/* 不出&出牌 按钮 end */}

                        {/* 不抢&抢地主 按钮 start */}
                        <PlayLandlordButton
                            show={this.state.isShow_playLandlord}
                            noLandlord={this.noLandlord.bind(this)}
                            landlordStatus={this.state.landlordStatus}
                            playLandlord={this.playLandlord.bind(this)}
                            isTimer={this.state.isTimer}
                            count={this.state.count}
                        />
                        {/* 不抢&抢地主 按钮 end */}
                        {this.state.newDealStatus && 
                            <div className="newDeal" onClick={this.newDealFun.bind(this)}>重新发牌</div>
                        }
                        {/* 已出的牌  start*/}
                        <MyBeenOutCard
                            show={this.state.isShow_beenOut}
                            list={room.myCardOut}
                        />
                        {/* 已出的牌  end*/}                        
                        {this.state.noOutText.length == 1 &&                        
                            <div className="noOut" style={{display:this.state.noOutText[0] == room.roomId.name ? 'inline-block' :'none'}}></div>
                        }
                        {this.state.noOutText.length == 2 &&                        
                            <div className="noOut" style={{display:this.state.noOutText[0] !== room.roomId.name && this.state.noOutText[1] !== room.roomId.name ? 'none' :'inline-block'}}></div>
                        }
                        {/* 我的卡牌  start*/}
                        <MyCard
                            list={room.myCard}
                            imgArr={room.mySelectCard}
                            imgClick={this.imgClick}
                        />
                        {/* 我的卡牌  end*/}

                        {/* 我的头像 */}
                        <div className="my-head" title="点击头像发牌" onClick={this.startCard}></div>

                        {/* 地主农民身份 */}
                        <div className={this.state.landlordImg ? 'my-identity-Y' : 'my-identity-N'}></div>
                    </div>                    
                    {/*底部静态文件 start*/}
                    <Bottom 
                        roomId = {room.roomId}
                        roomData = {room.roomData}                        
                    />
                    {/*底部静态文件 end*/}
                    {/*<div onClick={this.getCardFun.bind(this)}>开始发牌</div>*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        _roomHandle: (options) => {
            dispatch(roomHandle(options))
        },
        _getCard: (options) => {
            dispatch(getCard(options))
        }
    }
};

const Room = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomMain);

export default Room;