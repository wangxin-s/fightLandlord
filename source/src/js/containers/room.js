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
import PlayLandlordButton from '../components/room/playLandlordButton';
import MyBeenOutCard from '../components/room/myBeenOutCard';
import LeftPlay from '../components/room/leftPlay';
import Bottom from '../components/room/bottom';
import {
    roomHandle
} from '../actions/room';


let timer;
const socket = require('socket.io-client')('http://localhost:3001');
class RoomMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 卡牌是否选择 及出牌控制  true：选中  'out'：出牌
            imgArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            // 出牌&不出  控制隐藏显示
            isShow_playCard: false,
            // 抢地主&不抢  控制隐藏显示
            isShow_playLandlord: true,
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
            // 倒计时  控制隐藏显示
            isTimer: false,
            // 倒计时 时间
            count: 30
        }
    }

    //当牌被点击时
    imgClick = (index) => {
        let state = this.state.imgArr;
        state[index] = !state[index]
        this.setState({
            imgArr: state,
        }, () => {
            console.log(this.state.imgArr)
        })
    };

    //不出
    notOut() {
        let state = this.state.imgArr;
        state.forEach((item, index) => {
            state[index] = false;
        })
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
        })
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
            setTimeout(() => {
                this.setState({
                    playerOneData: [card1, card2, card3, card4, card5, card6, card7, card8, card9,]
                })
            }, 1000)
            setTimeout(() => {
                this.setState({
                    playerTwoData: [card1, card2, card3, card4, card5]
                })
            }, 2000)
        })
    }

    // 不抢
    noLandlord() {

    }

    //抢地主
    playLandlord() {
        this.setState({
            isShow_playLandlord: false,
            isTimer: true
        },()=> {
            if(this.state.isTimer) {
                timer = setInterval(()=> {
                    if(this.state.count == 0) {
                        clearInterval(timer)
                        this.setState({
                            isTimer:false
                        })
                    }
                    this.setState({
                        count: this.state.count-=1
                    })
                },1000)
            }
        })
    }


    render() {
        return (
            <div id="landlord-room">
                {/*顶部展示区域 start*/}
                <Top list={[1, 2, 3]} />
                {/*顶部展示区域 end*/}

                <div className="room-container">
                    {/*其他玩家区域 start*/}
                    <LeftPlay
                        leftList={this.state.playerTwoData}
                        rightList={this.state.playerOneData}
                        isTimer = {this.state.isTimer}
                        count = {this.state.count}
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
                        
                        {/* 不抢&抢地主 按钮 start */}
                        <PlayLandlordButton
                            show={this.state.isShow_playLandlord}
                            noLandlord={this.noLandlord.bind(this)}
                            playLandlord={this.playLandlord.bind(this)}
                        />
                        {/* 不抢&抢地主 按钮 end */}

                        {/* 已出的牌  start*/}
                        <MyBeenOutCard
                            show={this.state.isShow_beenOut}
                            list={this.state.outData}
                        />
                        {/* 已出的牌  end*/}

                        {/* 我的卡牌  start*/}
                        <MyCard
                            list={this.state.brandArr}
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
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        _roomHandle: (options) => {
            dispatch(roomHandle(options))
        }
    }
};

const Room = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomMain);

export default Room;