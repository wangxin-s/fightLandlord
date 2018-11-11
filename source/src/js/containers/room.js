/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import card1 from '../../images/card/card_11.png';
import card2 from '../../images/card/card_11.png';
import card3 from '../../images/card/card_11.png';
import card4 from '../../images/card/card_11.png';
import card5 from '../../images/card/card_11.png';
import card6 from '../../images/card/card_11.png';
import card7 from '../../images/card/card_11.png';
import card8 from '../../images/card/card_11.png';
import card9 from '../../images/card/card_11.png';
import card10 from '../../images/card/card_1.png';
import card11 from '../../images/card/card_1.png';
import card12 from '../../images/card/card_1.png';
import card13 from '../../images/card/card_1.png';
import card14 from '../../images/card/card_1.png';
import card15 from '../../images/card/card_1.png';
import card16 from '../../images/card/card_1.png';
import card17 from '../../images/card/card_1.png';
import card_back from '../../images/card_back.png';

import Top from '../components/room/top';
import Ready from '../components/room/ready';
import IsPlayLandlordTitle from '../components/room/isPlayLandlordTitle';
import MyCard from '../components/room/myCard';
import MyPlayButton from '../components/room/myPlayButton';
import PlayLandlordButton from '../components/room/playLandlordButton';
import MyBeenOutCard from '../components/room/myBeenOutCard';
import LeftPlay from '../components/room/leftPlay';
import Bottom from '../components/room/bottom';
import {
    roomHandle, getCard
} from '../actions/room';

import {
    socket, outRoomObject, getRoomPlayerInfoObject, readyObject,
    LicensingObject, isPlayLandlordObject, isPlayCardObject,
    clearCardStatusArrObject, gameOverObject

} from '../units/socketListen';


let timer;//玩家操作倒计时
let timeTimer;//当前时间倒计时

// const socket = require('socket.io-client')('http://localhost:3001');

class RoomMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 玩家操作倒计时 (抢地主)
            count: 50,
            // "我"  =>玩家位置
            mySeat: this.props.login.userInfo.seat,
            // 卡牌是否选择 及出牌控制  true：选中  'out'：出牌
            cardStatusArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],




            // 出牌&不出  控制隐藏显示
            isShow_playCard: true,
            // 抢地主&不抢  控制隐藏显示
            isShow_is_playLandlord: false,
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

            // 当前时间
            newTime: '',
            // 地主牌  翻转控制
            isRevers: false,
            //地主牌数据源
            list: [card_back, card_back, card_back],

        }
    }

    //初始化生命周期函数
    componentDidMount() {
        // 进入房间 获取当前房间玩家信息
        let roomId = this.props.match.params.id;
        let userInfo = this.props.login.userInfo;
        let seat = userInfo.seat;
        socket.emit('getRoomPlayerInfo', {
            roomId,//房间号
            userInfo,//当前用户信息
            seat,//位置
        });
        // 获取当前房间玩家信息  服务端返回监听(后续其他操作  服务端返回房间数据统一当前监听  赋值)
        getRoomPlayerInfoObject.callBack = (data) => {
            console.log(data)
            if (data.code == 200) {
                this.props._roomHandle({
                    roomPlayerInfo: data.data
                })
            } else {
                alert(data.msg)
                return;
            }
        }
        // 当前房间玩家操作  准备  服务端返回监听
        readyObject.callBack = (data) => {
            if (data.code == 200) {
                this.props._roomHandle({
                    roomPlayerInfo: data.data
                })
            } else {
                alert(data.msg)
                return;
            }
        }
        // 所有玩家都已准备 发牌数据更新  开始抢地主
        LicensingObject.callBack = (data) => {
            if (data.code == 200) {
                this.props._roomHandle({
                    roomPlayerInfo: data.data
                })
                // 启动抢地主定时
                this.playLandlordTimer()
            } else {
                alert(data.msg)
                return;
            }
        }

        // 玩家是否抢地主 后端返回监听
        isPlayLandlordObject.callBack = (data) => {
            console.log(data)
            clearInterval(timer)
            this.setState({
                count: 50,
            })

            if (data.code == 200) {
                this.props._roomHandle({
                    roomPlayerInfo: data.data
                })
                if (data.data.subStatus == 'playCard') {
                    // 启动出牌 不出牌定时器
                    this.playCardTimer()
                } else {
                    // 启动抢地主定时
                    this.playLandlordTimer()
                }
            } else {
                alert(data.msg)
                return;
            }
        }

        // 玩家是否出牌 后端返回监听
        isPlayCardObject.callBack = (data) => {
            console.log(data)
            if (data.code == 200) {
                clearInterval(timer)
                this.setState({
                    count: 50,
                })
                this.props._roomHandle({
                    roomPlayerInfo: data.data,
                })

                if (data.data.subStatus == 'playCard') {
                    // 启动出牌 不出牌定时器
                    this.playCardTimer()
                }
            } else {
                alert(data.msg)
                return;
            }
        }

        // 用户出牌服务端返回事件 清除当前玩家卡牌是否选择 及出牌控制  true：选中  out：出牌
        clearCardStatusArrObject.callBack = (data) => {
            console.log(data)
            if (data.code == 200) {
                let cardStatusArr = [];
                this.state.cardStatusArr.map((item) => {
                    if (item) {
                        item = false;
                    }
                    cardStatusArr.push(item)
                })
                this.setState({
                    cardStatusArr: cardStatusArr
                })
            }
        }

        // gameOver 游戏结束
        gameOverObject.callBack = (data) => {
            console.log(data)
            if (data.code == 200) {
                this.props._roomHandle({
                    roomPlayerInfo: data.data
                })
                setTimeout(()=> {
                    clearInterval(timer)
                    alert(data.msg)
                },500)
            }
        }


        // 获取当前时间  倒计时
        // timeTimer = setInterval(() => {
        //     let date = new Date();
        //     let hours = date.getHours();
        //     let minutes = date.getMinutes();
        //     let seconds = date.getSeconds();
        //     seconds = seconds>=0 && seconds<10 ?'0'+seconds : seconds;
        //     let newTime = hours + ':' + minutes + ':' + seconds;
        //     this.setState({
        //         newTime: newTime
        //     })
        // }, 1000)
    }

    componentWillUnmount() {
        clearInterval(timeTimer);
        clearInterval(timer);
    }

    // 启动抢地主 定时器
    playLandlordTimer() {
        timer = setInterval(() => {
            console.log("timer")
            if (this.state.count <= 0) {
                this.default_playerNoLandlord()
            } else {
                this.setState({
                    count: this.state.count - 1,
                })
            }
        }, 1000)
    }

    // 抢地主倒计时结束 默认不抢地主
    default_playerNoLandlord() {
        let roomPlayerInfo = this.props.room.roomPlayerInfo;
        // 当前是谁叫地主 默认不抢
        let defaultSeat = roomPlayerInfo.leftPlayer.playLandlord == 'true' && 'leftPlayer'
            || roomPlayerInfo.rightPlayer.playLandlord == 'true' && 'rightPlayer'
            || roomPlayerInfo.bottomPlayer.playLandlord == 'true' && 'bottomPlayer';
        socket.emit('isPlayLandlord', {
            userInfo: this.props.login.userInfo,
            roomId: roomPlayerInfo.roomId,
            seat: defaultSeat,
            isPlayLandlord: 'false',
            isPlayLandlordTitle: roomPlayerInfo.is_playLandlord.length > 0 ? '不抢' : '不叫',
        })
    }

    // 启动出牌 定时器
    playCardTimer() {
        timer = setInterval(() => {
            console.log("timer")
            if (this.state.count <= 0) {
                this.default_playerNocard()
            } else {
                this.setState({
                    count: this.state.count - 1,
                })
            }
        }, 1000)
    }

    // 出牌倒计时结束 默认不出
    default_playerNocard() {
        let roomPlayerInfo = this.props.room.roomPlayerInfo;
        // 当前是谁出牌 
        let defaultSeat = roomPlayerInfo.leftPlayer.playCard == 'true' && 'leftPlayer'
            || roomPlayerInfo.rightPlayer.playCard == 'true' && 'rightPlayer'
            || roomPlayerInfo.bottomPlayer.playCard == 'true' && 'bottomPlayer';

        // 如果当前是地主出牌 或者其余两位玩家未出牌  倒计时结束出最小单张
        if(defaultSeat=='leftPlayer') {
            if((roomPlayerInfo.rightPlayer.showOutCardIcon.length == 0 || roomPlayerInfo.rightPlayer.showOutCardIcon[0] == 'notOut') &&
                (roomPlayerInfo.bottomPlayer.showOutCardIcon.length == 0 || roomPlayerInfo.bottomPlayer.showOutCardIcon[0] == 'notOut')) {
                    let cardData = roomPlayerInfo.leftPlayer.cardData;
                    let showOutCardIcon = []; 
                    let showOutCardVal = []; 
                    showOutCardIcon.push(cardData[cardData.length-1].icon);
                    showOutCardVal.push(cardData[cardData.length-1].val);
                    socket.emit('isPlayCard', {
                        roomId: roomPlayerInfo.roomId,//房间号
                        seat: defaultSeat,//位置
                        userInfo: this.props.login.userInfo,//当前用户信息
                        isPlayCard: 'true',//是否出牌
                        showOutCardIcon: showOutCardIcon,//要出的牌icon 用于前端展示
                        showOutCardVal: showOutCardVal,//要出的牌val 值 用于牌型判断
                    });
                    return;
                }
        }

        if(defaultSeat=='bottomPlayer') {
            if((roomPlayerInfo.leftPlayer.showOutCardIcon.length == 0 || roomPlayerInfo.leftPlayer.showOutCardIcon[0] == 'notOut') &&
                (roomPlayerInfo.rightPlayer.showOutCardIcon.length == 0 || roomPlayerInfo.rightPlayer.showOutCardIcon[0] == 'notOut')) {
                    let cardData = roomPlayerInfo.bottomPlayer.cardData;
                    let showOutCardIcon = []; 
                    let showOutCardVal = []; 
                    showOutCardIcon.push(cardData[cardData.length-1].icon);
                    showOutCardVal.push(cardData[cardData.length-1].val);
                    socket.emit('isPlayCard', {
                        roomId: roomPlayerInfo.roomId,//房间号
                        seat: defaultSeat,//位置
                        userInfo: this.props.login.userInfo,//当前用户信息
                        isPlayCard: 'true',//是否出牌
                        showOutCardIcon: showOutCardIcon,//要出的牌icon 用于前端展示
                        showOutCardVal: showOutCardVal,//要出的牌val 值 用于牌型判断
                    });
                    return;
                }
        }

        if(defaultSeat=='rightPlayer') {
            if((roomPlayerInfo.bottomPlayer.showOutCardIcon.length == 0 || roomPlayerInfo.bottomPlayer.showOutCardIcon[0] == 'notOut') &&
                (roomPlayerInfo.leftPlayer.showOutCardIcon.length == 0 || roomPlayerInfo.leftPlayer.showOutCardIcon[0] == 'notOut')) {
                    let cardData = roomPlayerInfo.rightPlayer.cardData;
                    let showOutCardIcon = []; 
                    let showOutCardVal = []; 
                    showOutCardIcon.push(cardData[cardData.length-1].icon);
                    showOutCardVal.push(cardData[cardData.length-1].val);
                    socket.emit('isPlayCard', {
                        roomId: roomPlayerInfo.roomId,//房间号
                        seat: defaultSeat,//位置
                        userInfo: this.props.login.userInfo,//当前用户信息
                        isPlayCard: 'true',//是否出牌
                        showOutCardIcon: showOutCardIcon,//要出的牌icon 用于前端展示
                        showOutCardVal: showOutCardVal,//要出的牌val 值 用于牌型判断
                    });
                    return;
                }
        }
        
        socket.emit('isPlayCard', {
            roomId: roomPlayerInfo.roomId,//房间号
            seat: defaultSeat,//位置
            userInfo: this.props.login.userInfo,//当前用户信息
            isPlayCard: 'false',//是否出牌
        });
    }

    // 当牌被点击时
    cardClick(index) {
        let cardStatusArr = this.state.cardStatusArr;
        cardStatusArr[index] = !cardStatusArr[index]
        this.setState({
            cardStatusArr: cardStatusArr
        })
    }


    // 退出房间
    exit() {
        let roomId = this.props.match.params.id;
        let userInfo = this.props.login.userInfo;
        let seat = userInfo.seat;
        socket.emit('outRoom', {
            roomId,//房间号
            userInfo,//当前用户信息
            seat,//位置
        });
        outRoomObject.callBack = (data) => {
            if (data.code == 200) {
                // 清除本地存储的房间玩家信息
                this.props._roomHandle({
                    // 空字段先定义  为了防止各个页面在引用数据嵌套过深字段时 报undefined 未定义
                    roomPlayerInfo: {
                        roomId: '',
                        landlordCard: [],//地主牌数据源
                        subStatus: '',//子状态=> 抢地主||打牌阶段
                        status: 'ready',
                        is_playLandlord: [],//谁是地主
                        playerLandlordNum: 0,//叫地主 抢地主次数
                        leftPlayer: {
                            id: '',
                            account: '',
                            password: '',
                            headImg: '',
                            creation_date: '',
                            seat: '',
                            is_ready: '',
                            cardData: [],//当前玩家  卡牌数据源
                            playLandlord: 'false',//谁在抢地主
                            isPlayLandlordTitle: '',//存储当前玩家是否叫地主 仅给前端做页面展示
                            playCard: 'false',//当前是谁在出牌
                            showOutCardIcon: [],//当前玩家  上一轮出牌操作 (已出的牌||不出) Icon 用作前端展示
                            showOutCardVal: [],//当前玩家  上一轮出牌操作 (已出的牌||不出) Val  用作比牌
                        },
                        rightPlayer: {
                            id: '',
                            account: '',
                            password: '',
                            headImg: '',
                            creation_date: '',
                            seat: '',
                            is_ready: '',
                            cardData: [],//当前玩家  卡牌数据源
                            playLandlord: 'false',
                            isPlayLandlordTitle: '',
                            playCard: 'false',
                            showOutCardIcon: [],
                            showOutCardVal: [],
                        },
                        bottomPlayer: {
                            id: '',
                            account: '',
                            password: '',
                            headImg: '',
                            creation_date: '',
                            seat: '',
                            is_ready: '',
                            cardData: [],//当前玩家  卡牌数据源
                            playLandlord: 'false',
                            isPlayLandlordTitle: '',
                            playCard: 'false',
                            showOutCardIcon: [],
                            showOutCardVal: [],
                        }
                    }
                })
                this.props.history.push("/hall")
            } else {
                alert(data.msg)
                return;
            }
        }
    }

    render() {
        let room = this.props.room;
        let mySeat = this.state.mySeat;
        return (
            <div id="landlord-room">
                {/*顶部展示区域 start*/}
                <Top
                    list={this.state.list}
                    roomPlayerInfo={room.roomPlayerInfo}
                    exit={this.exit.bind(this)}
                    newTime={this.state.newTime}
                />


                <div className="room-container">
                    {/*其他玩家区域 start*/}
                    <LeftPlay
                        userInfo={this.props.login.userInfo}
                        roomPlayerInfo={room.roomPlayerInfo}
                        count={this.state.count}
                    />

                    <div className="my-show-brand">
                        {/* 准备 && 已准备 */}
                        {room.roomPlayerInfo.status == 'ready' ?
                            <Ready
                                roomPlayerInfo={room.roomPlayerInfo}
                                userInfo={this.props.login.userInfo}
                                roomId={this.props.match.params.id}
                                mySeat={mySeat}
                            /> : ''
                        }

                        {/* 叫地主 && 不叫展示 */}
                        <IsPlayLandlordTitle
                            roomPlayerInfo={room.roomPlayerInfo}
                            mySeat={mySeat}
                        />

                        {/* 不出 && 出牌 按钮 start */}
                        {room.roomPlayerInfo.subStatus == 'playCard' ?
                            <MyPlayButton
                                roomPlayerInfo={room.roomPlayerInfo}
                                userInfo={this.props.login.userInfo}
                                mySeat={mySeat}
                                count={this.state.count}
                                cardList={room.roomPlayerInfo[mySeat].cardData}
                                cardStatusArr={this.state.cardStatusArr}
                            /> : ''
                        }


                        {/* 不抢&抢地主 按钮 start */}
                        <PlayLandlordButton
                            roomPlayerInfo={room.roomPlayerInfo}
                            userInfo={this.props.login.userInfo}
                            count={this.state.count}
                            roomId={this.props.match.params.id}
                            mySeat={mySeat}
                        />

                        {/* 已出的牌  start*/}
                        <MyBeenOutCard
                            roomPlayerInfo={room.roomPlayerInfo}
                            mySeat={mySeat}
                        />

                        {/* 我的卡牌  start*/}
                        {room.roomPlayerInfo.status == 'Licensing' ?
                            <MyCard
                                status={room.roomPlayerInfo.status}
                                list={room.roomPlayerInfo[mySeat].cardData}
                                cardStatusArr={this.state.cardStatusArr}
                                cardClick={this.cardClick.bind(this)}
                            /> : ''
                        }

                        {/* 我的头像 */}
                        <div className="my-head" title="点击头像发牌" onClick={this.startCard}>
                            <img src={room.roomPlayerInfo[mySeat].headImg ? require('../../images/' + room.roomPlayerInfo[mySeat].headImg + '.png') : require('../../images/head-border.png')} alt="" />
                        </div>

                        {/* 地主农民身份 */}
                        <div className="my-identity" style={{ display: room.roomPlayerInfo.subStatus == 'playCard' ? 'block' : 'none' }}>
                            <img src={room.roomPlayerInfo.is_playLandlord[room.roomPlayerInfo.is_playLandlord.length - 1] == mySeat ?
                                require('../../images/Landlord.png') : require('../../images/farmer.png')} alt="" />
                        </div>
                    </div>

                    {/*底部静态文件 start*/}
                    <Bottom
                        userInfo={this.props.login.userInfo}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
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

export default withRouter(Room);