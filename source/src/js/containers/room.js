/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import {connect} from 'react-redux'
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
import BalancePanel from '../components/room/balancePanel';
import {
    roomHandle, getCard
} from '../actions/room';

import {cardType, compareCard, cloneFun} from '../units/room';
//import socket from '../units/socket';
var socket = require('socket.io-client')('http://localhost:3001');

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
            isReady: false,//当前用户是否准备开始 false 显示准备按钮  true 显示已准备汉字  started 玩家都已准备 开始发牌
            // 卡牌 数据源
            brandArr: [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17,],
            // 已出牌 的数据源
            outData: [],
            // 一号玩家数据源
            playerOneData: [],
            // 二号玩家数据源
            playerTwoData: [],
            // 玩家操作倒计时  控制隐藏显示
            position: 2,
            // 玩家操作倒计时 时间
            count: 20,
            // 当前时间
            newTime: '',
            // 地主牌  翻转控制
            isRevers: false,
            //地主牌数据源
            list: [card_back, card_back, card_back],
            doubleBeanNum:1,//当前倍数

            //结算弹框显示隐藏
            panelShow:false,
            title:'',
            beanObj:{

            },
        }
    }

    //判断牌型 牌分值大小比较测试
    scoreComparisonTest() {
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
        })
    }

    //初始化生命周期函数
    componentDidMount() {
        //排序算法时间测试
        /* let list = [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28];
         countTime(sortBubble, '冒泡排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
         countTime(orientSortBubble, '定向冒泡排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
         countTime(sortSelect, '选择排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
         countTime(sortInsert, '插入排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
         countTime(sortHalfInsert, '二分插入排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
         countTime(sortShell, '希尔排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);
         countTime(sortMerge, '归并排序', [23, 21, 23, 4, 35, 9, 54, 40, 39, 2, 49, 30, 59, 34, 28]);*/


        this.resetRedux();
        let id = this.props.login.id;

        //告诉后台当前登陆人 id 通知后端发送相关信息
        socket.emit('enterRoom', {
            message: '获取当前房间用户信息',
            id: id,
            roomId: '',
        });

        //获取当前房间用户信息
        socket.on('getUserInfo', (data) => {
            console.log('getUserInfo监听触发',data);
            clearInterval(timer);
            let leftData, rightData, bottomData,id=this.props.login.id;
            let position='';
            if(id==data.data.p1.id){
                position=data.data.p1.locationSit
            }else if(id==data.data.p2.id){
                position=data.data.p2.locationSit
            }else{
                position=data.data.p3.locationSit
            }
            this.setState({
                doubleBeanNum:data.doubleBeanNum,
            })

            if (position == 'p1') {
                leftData = data.data.p3;
                bottomData = data.data.p1;
                rightData = data.data.p2;
            } else if (position == 'p2') {
                leftData = data.data.p1;
                bottomData = data.data.p2;
                rightData = data.data.p3;
            } else if (position == 'p3') {
                leftData = data.data.p2;
                bottomData = data.data.p3;
                rightData = data.data.p1;
            }
            let isReady=bottomData.isReady;
            if(data.getCard){
                console.log('触发事件--向后台获取自己的牌');
                socket.emit('get-my-card',{id:id});
            }

            let room=this.props.room;

            if(data.code&&data.code==3000){
                let title='';
                //判断牌局是否结束
                if(room.leftData.card.length==0||room.bottomData.card.length==0||room.rightData.card.length==0){
                    if(data.winId&&data.winId!==''){
                        if(room.bottomData.playType=='landlord'){
                            if(data.winId==bottomData.id){
                                console.log('地主--恭喜你赢了');
                                title='地主--恭喜你赢了';
                            }else{
                                console.log('地主--恭喜你输了');
                                title='地主--恭喜你输了';
                            }
                        }else{
                            if(data.winId==room.bottomData.id){
                                console.log('农民--恭喜你赢了');
                                title='农民--恭喜你赢了';
                            }else{
                                if(room.leftData.playType=='farmer'&&room.leftData.id==data.id){
                                    console.log('农民--恭喜你赢了');
                                    title='农民--恭喜你赢了';
                                }else if(room.rightData.playType=='farmer'&&room.rightData.id==data.id){
                                    console.log('农民--恭喜你赢了');
                                    title='农民--恭喜你赢了';
                                }else{
                                    console.log('农民--恭喜你输了');
                                    title='农民--恭喜你输了';
                                }
                            }
                        }
                    }
                }
                this.setState({
                    panelShow:true,
                    title:title,
                });
                this.props._roomHandle({
                    topCard:[],
                });
            }

            this.props._roomHandle({
                leftData,
                rightData,
                bottomData,
                roomId:data.roomId,
                //topCard:data.data.topCard
            });
        });

        //获取当前玩家牌--监听方法
        socket.on('get-my-card',(res)=>{
            console.log('当前玩家牌',res);
            let myCard=res.card;
            this.props._roomHandle({
                myCard
            });
        });

        //启动定时器方法----监听事件
        socket.on('start-timer', (data) => {
            let leftData, rightData, bottomData,id=this.props.login.id;
            let position='';
            if(id==data.data.p1.id){
                position=data.data.p1.locationSit
            }else if(id==data.data.p2.id){
                position=data.data.p2.locationSit
            }else{
                position=data.data.p3.locationSit
            }
            if (position == 'p1') {
                leftData = data.data.p3;
                bottomData = data.data.p1;
                rightData = data.data.p2;
            } else if (position == 'p2') {
                leftData = data.data.p1;
                bottomData = data.data.p2;
                rightData = data.data.p3;
            } else if (position == 'p3') {
                leftData = data.data.p2;
                bottomData = data.data.p3;
                rightData = data.data.p1;
            }
            this.props._roomHandle({
                leftData,
                rightData,
                bottomData,
            });

            if (leftData.isReady == 'robAndNo' || rightData.isReady == 'robAndNo' || bottomData.isReady == 'robAndNo') {
                this.robTimer();
            }
        });

        //获取三张底牌
        socket.on('get-top-card', (data) => {
            console.log('获取三张底牌',data);
            this.props._roomHandle({
                topCard:data.topCard,
            });
            this.setState({
                isRevers:true,
            })
        });

        socket.on('set-timer-num',(data)=>{
            this.setState({
                count:data.count,
            })
        })
        socket.on('game-over',(data)=>{
            let beanObj=this.state.beanObj;
            beanObj[data.position]=data;
            this.setState({
                beanObj
            },()=>{
                console.log(this.state.beanObj);
            })
        })

    }

    //生命周期销毁方法
    componentWillUnmount() {
        clearInterval(timeTimer);
        clearInterval(timer);
        //告诉后台离开了，销毁当前 socket
        //socket.close();
        socket.emit('leave-room', {
            message: '销毁当前socket',
            id: this.props.login.id,
            roomId: '',
        });
        socket.removeAllListeners('getUserInfo');
        socket.removeAllListeners('start-timer');
        socket.removeAllListeners('get-my-card');
    }

    //当牌被点击时
    imgClick = (index) => {
        let room = this.props.room;
        let card = room.myCard;
        let mySelectCard = room.mySelectCard;
        let check = false;
        mySelectCard[card[index]] = mySelectCard[card[index]] ? false : true;
        this.props._roomHandle({
            mySelectCard
        })
    };

    //不出
    notOut() {
        //告诉后台--不出牌
        socket.emit('notPlayCard', '发送消息--不出牌');
        let state = this.state.imgArr;
        state.forEach((item, index) => {
            state[index] = false;
        });
        this.setState({
            imgArr: state,
        })
    }

    // 出牌  --  不出
    playCard(code) {
        let id=this.props.login.id;
        //1000出牌   2000不出
        if(code==2000){
            //调用接口出牌
            socket.emit('emit-card', {
                id:id,
                code:code,
            });
            return false;
        }
        let room = this.props.room;
        let bottomData = room.bottomData;
        let leftData = room.leftData;
        let rightData = room.rightData;
        let card = room.myCard;
        let mySelectCard = room.mySelectCard;
        let myCard = cloneFun(card);//去掉玩家已出的牌后玩家现有的牌
        let list = [];//当前玩家出的牌
        let upList=[];//上家或者下家出的牌
        upList=(rightData.outCard.length>0)?rightData.outCard:upList;
        upList=(leftData.outCard.length>0)?leftData.outCard:upList;
        for (let key in mySelectCard) {
            if (mySelectCard[key]) {
                list.push(key);
                myCard.splice(myCard.findIndex(item =>item == key), 1)
            }
        }
        if (list.length <= 0) {
            alert('请选择要出的牌');
        }
        console.log(list, myCard);
        //判断牌型
        console.log('上家的牌', cardType(cloneFun(upList)));
        console.log('玩家选中的牌', cardType(cloneFun(list)));

        //比较牌的大小
        let cType=cardType(list);
        if(!cType){
            alert('牌型不对');
            return false;
        }
        let check = compareCard(list,upList);
        if (!check) {
            alert('当前牌小与上家的牌或与上家牌型不同');
            return false
        }

        bottomData.outCard=list;
        bottomData.card=myCard;
        this.props._roomHandle({
            myCard, mySelectCard: {}
        });
        //调用接口出牌
        socket.emit('emit-card', {
            id:id,
            code:code,
            outCard:list,
        });
    }

    // 不抢
    noLandlord() {
        let id=this.props.login.id;
        let room=this.props.room;
        if(this.state.position=='p1'){
            this.setState({
                position:'p2'
            });
        }else if(this.state.position=='p2'){
            this.setState({
                position:'p3'
            });
        }else{
            this.setState({
                position:'p1'
            });
        }
        clearInterval(timer);
        //告诉后端当前用户不抢
        socket.emit('rob-landlord',{
            type:'noRob',
            id:id
        })
    }

    //抢地主
    playLandlord() {
        clearInterval(timer);
        //告诉后台抢地主
        socket.emit('rob-landlord',{
            type:'rob',
            id:this.props.login.id
        });
    }

    //抢地主定时器
    robTimer(code) {
        this.setState({
            count: 30,
        });
        timer = setInterval(() => {
            var id=this.props.login.id;
            let room=this.props.room;
            this.setState({
                count: this.state.count - 1,
            });
            if(this.state.count<=0){
                if(this.state.position=='p1'){
                    this.setState({
                        position:'p2'
                    });
                }else if(this.state.position=='p2'){
                    this.setState({
                        position:'p3'
                    });
                }else{
                    this.setState({
                        position:'p1'
                    });
                }
                clearInterval(timer);
                /*if(code&&(code==1000||code==2000)){
                    //告诉后端当前用户--不出
                    socket.emit('emit-card',{
                        id:id,
                        code:2000,
                    })
                }else{
                    //告诉后端当前用户不抢
                    socket.emit('not-rob',{
                        id:id
                    })
                }*/
            }
        }, 1000)
    }

    //出牌定时器
    playCardTimer() {
        let count = 5;
        clearInterval(timer);
        timer = setInterval(() => {
            let obj = this.state;
            if (this.state.count <= 1) {
                if (obj.isTimer == 1) {
                    this.setState({
                        isShow_playCard: false,
                        isTimer: obj.isTimer + 1,
                        count: count,
                        isShow_beenOut: true,
                    })
                } else if (obj.isTimer >= 3) {
                    this.setState({
                        isShow_playCard: true,
                        isTimer: 1,
                        count: count,
                        isShow_beenOut: false,
                    })
                } else {
                    this.setState({
                        count: count,
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
        this.setState({
            isRevers: true,
        }, ()=> {
            this.setState({
                list: [card4, card5, card6],
                brandArr: this.state.brandArr.concat([card4, card5, card6]),
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

    //准备按钮点击方法
    readyFun() {
        let login = this.props.login;
        socket.emit('ready-action', {
            message: '当前用户点击准备按钮',
            id: login.id,
            account: login.account,
            password: login.password,
        });
    }

    //是否显示地主还是农民标识
    showPlayType(isReady) {
        if (isReady == 'discardOrNo' || isReady == 'discard' || isReady == 'noDiscard' || isReady == 'hasDisCard') {
            return true;
        }
    }

    //叫地主   或    不叫    点击 方法
    callLanFun(type){
        let login = this.props.login;
        socket.emit('call-landlord', {
            message: '当前用户叫地主--或者--不叫地主',
            id: login.id,
            type:type
        });
    }

    //离开房间
    leaveRoom(){
        //告诉后台当前登陆人 离开房间
        socket.emit('leave-oom', {
            message: '当前用户离开房间',
            id: this.props.login.id,
            roomId: '',
        });
    }
    inputFun(val){
        this.setState({panelShow:val})
    }

    render() {
        let room = this.props.room;
        let myCard = room.myCard;
        let roomId = room.roomId;
        let bottomData = room.bottomData;
        let isReady = bottomData.isReady;
        return (
            <div id="landlord-room">
                {/*结算面板 start*/}
                <BalancePanel
                    beanObj={this.state.beanObj}
                    title={this.state.title}
                    show={this.state.panelShow}
                    callback={this.inputFun.bind(this)} />
                {/*结算面板 end*/}
                {/*顶部展示区域 start*/}
                <Top
                    roomId={roomId}
                    list={room.topCard}
                    doubleBeanNum={this.state.doubleBeanNum}
                    leaveRoom={this.leaveRoom.bind(this)}
                    newTime={this.state.newTime}
                    isRevers={this.state.isRevers}
                    revers={this.revers.bind(this)}
                />
                {/*顶部展示区域 end*/}

                <div className="room-container">
                    {/*其他玩家区域 start*/}
                    <LeftPlay
                        leftList={room.left}
                        rightList={room.right}
                        leftData={room.leftData}
                        rightData={room.rightData}
                        isTimer={this.state.isTimer}
                        count={this.state.count}
                    />
                    {/*其他玩家区域 end*/}

                    <div className="my-show-brand">
                        {/* 不出&出牌 按钮 start */}
                        <MyPlayButton
                            show={isReady}
                            isTimer={this.state.isTimer}
                            count={this.state.count}
                            notOut={this.notOut.bind(this)}
                            playCard={this.playCard.bind(this)}
                        />
                        {/* 不出&出牌 按钮 end */}

                        {/* 不抢&抢地主 按钮 start */}
                        <PlayLandlordButton
                            show={isReady}
                            callLanFun={this.callLanFun.bind(this)}
                            noLandlord={this.noLandlord.bind(this)}
                            playLandlord={this.playLandlord.bind(this)}
                            isTimer={this.state.isTimer}
                            count={this.state.count}
                        />
                        {/* 不抢&抢地主 按钮 end */}

                        {/* 准备  start*/}
                        <div className="my-operating"
                             style={{display: (isReady == 'ready' ||isReady ==  'readyEd') ? 'block' : 'none'}}>
                            <div className="ready-icon"
                                 style={{display: isReady == 'ready' ? 'inline-block' : 'none'}}
                                 onClick={this.readyFun.bind(this)}></div>
                            <div className="prepared-icon"
                                 style={{display: isReady == 'readyEd' ? 'inline-block' : 'none'}}>已准备
                            </div>
                        </div>
                        {/* 准备  end */}

                        {/* 已出的牌  start*/}
                        <MyBeenOutCard
                            show={isReady}
                            list={bottomData.outCard}
                        />
                        {/* 已出的牌  end*/}

                        {/* 我的卡牌  start*/}
                        <MyCard
                            show={isReady}
                            list={myCard}
                            imgArr={room.mySelectCard}
                            imgClick={this.imgClick}
                        />
                        {/* 我的卡牌  end*/}

                        {/* 我的头像 */}
                        <div className="my-head" title="点击头像发牌" onClick={this.startCard}></div>

                        {/* 地主农民身份 */}
                        <div style={{display: this.showPlayType(isReady) ? 'block' : 'none'}}
                             className={room.bottomData.playType == 'landlord' ? "my-identity" : "farmer"}></div>
                    </div>

                    {/*底部静态文件 start*/}
                    <Bottom bottomData={room.bottomData}/>
                    {/*底部静态文件 end*/}
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