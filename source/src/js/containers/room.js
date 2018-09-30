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

import Top from '../components/room/top';
import MyCard from '../components/room/myCard';
import MyPlayButton from '../components/room/myPlayButton';
import MyBeenOutCard from '../components/room/myBeenOutCard';
import LeftPlay from '../components/room/leftPlay';
import Bottom from '../components/room/bottom';
import {
    roomHandle,getCard
} from '../actions/room';
import {cardType,compareCard} from '../units/room'
const socket = require('socket.io-client')('http://localhost:3001');

class RoomMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 卡牌是否选择 及出牌控制  true：选中  'out'：出牌
            imgArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            // 出牌&不出  控制隐藏显示
            isShow_playCard: true,
            // 已出的牌   控制隐藏显示
            isShow_beenOut: false,
            // 卡牌 数据源
            brandArr: [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17,],
            // 已出牌 的数据源
            outData : [],
            // 一号玩家数据源
            playerOneData: [],
            // 二号玩家数据源
            playerTwoData:[],
        }
    }

    //初始化生命周期函数
    componentDidMount() {
        console.log('单牌',cardType([53]));
        console.log('火箭',cardType([52,53]));
        console.log('单顺',cardType([1,5,9,13,17,21,25]));
        console.log('单顺',cardType([30,34,38,42,46,50]));
        console.log('双顺',cardType([0,1,5,6,9,10,13,15,16,19]));
        console.log('三顺',cardType([0,1,2,5,6,7,9,10,11,12,14,15]));
        console.log('三顺',cardType([47,46,45,43,42,41,39,38,37,33,35,34]));
        console.log('对牌',cardType([0,2]));
        console.log('三牌',cardType([0,3,2]));
        console.log('炸弹',cardType([8,10,11,9]));
        console.log('三带一',cardType([0,1,2,12]));
        console.log('三带二',cardType([16,17,19,20,21]));
        console.log('四带二',cardType([24,25,26,27,28,31]));
        console.log('四带二',cardType([24,25,26,27,28,29,30,31]));
        console.log('飞机带翅膀',cardType([0,1,2,5,6,7,8,9,11,18,23,45]));
        console.log('飞机带翅膀',cardType([0,1,2,5,6,7,12,14,15,20,23,45]));
        console.log('飞机带翅膀',cardType([0,1,2,5,6,7,12,14,15,20,23,22]));


        socket.emit('getCards', '发送消息--发牌');
        //调用接口获取发牌内容
        socket.on('getCards', (data) => {
            this.props._roomHandle({
                bottomCard:data.bottomCard,//顶部中间的底牌
                myCard:data.myCard,//我的牌
                left:data.left,//左侧玩家的牌
                right:data.right,//右侧玩家的牌
            })
        });
        //左侧玩家出牌接口
        socket.on('leftPushCards', (data) => {
            this.props._roomHandle({
                leftList:data.leftList,//左侧玩家出的牌
            })
        });
        //右侧玩家出牌接口
        socket.on('rightPushCards', (data) => {
            this.props._roomHandle({
                rightList:data.rightList,//右侧玩家出的牌
            })
        });
    }

    //当牌被点击时
    imgClick=(index)=> {
        let state = this.state.imgArr;
        state[index] = !state[index];
        this.setState({
            imgArr: state,
        },()=>{
            console.log(this.state.imgArr)
        })
    };

    //不出
    notOut() {
        let state = this.state.imgArr;
        state.forEach((item, index) => {
            state[index] = false;
        });
        this.setState({
            imgArr: state,
        })
    }

    // 出牌
    playCard() {
        let state = this.state.imgArr;
        state.forEach((item, index) => {
            if (state[index]) {
                state[index] = 'out'
            }
        });

        //调用接口出牌
        socket.emit('emitCard', (data) => {

        });

        this.setState({
            imgArr: state,
            isShow_playCard: false,
        }, () => {
            let updateState = this.state.imgArr;
            updateState.forEach((item, index) => {
                if (item == 'out') {
                    this.state.outData.push(this.state.brandArr[index])
                }
            })
            this.setState({
                isShow_beenOut: true
            })

            //模拟出牌 
            setTimeout(()=> {
                this.setState({
                    playerOneData: [card1, card2, card3, card4, card5, card6, card7, card8, card9,]
                })
            },1000)
            setTimeout(()=> {
                this.setState({
                    playerTwoData: [card1, card2, card3, card4, card5]
                })
            },2000)
        })
    }



    render() {
        let room=this.props.room;
        return (
            <div id="landlord-room">
                {/*顶部展示区域 start*/}
                <Top list={[1,2,3]} />
                {/*顶部展示区域 end*/}

                <div className="room-container">
                    {/*其他玩家区域 start*/}
                    <LeftPlay
                        leftList={this.state.playerTwoData}
                        rightList={this.state.playerOneData}
                    />
                    {/*其他玩家区域 end*/}

                    <div className="my-show-brand">
                        {/* 不出&出牌 按钮 start */}
                        <MyPlayButton
                            show={this.state.isShow_playCard}
                            notOut={this.notOut.bind(this)}
                            playCard={this.playCard.bind(this)}
                        />
                        {/* 不出&出牌 按钮 end */}

                        {/* 已出的牌  start*/}
                        <MyBeenOutCard
                            show={this.state.isShow_beenOut}
                            list={this.state.outData}
                        />
                        {/* 已出的牌  end*/}

                        {/* 我的卡牌  start*/}
                        <MyCard
                            list={room.myCard}
                            imgArr={this.state.imgArr}
                            imgClick={this.imgClick}
                        />
                        {/* 我的卡牌  end*/}

                        {/* 我的头像 */}
                        <div className="my-head"></div>

                        {/* 地主农民身份 */}
                        <div className="my-identity"></div>
                    </div>

                    {/*底部静态文件 start*/}
                    <Bottom />
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