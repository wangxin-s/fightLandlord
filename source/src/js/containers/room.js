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

const socket = require('socket.io-client')('http://localhost:3001');
class RoomMain extends React.Component {
    constructor(props) {
        super(props)
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

    // 渲染所有牌
    brandData() {
        let is_ml0 = true;
        let imgData = [];
        this.state.brandArr.forEach((item, index) => {
            if(is_ml0 && this.state.imgArr[index]!='out') {//当前第一张图片  margin-left 0
                imgData.push(
                    <img key={index} src={item} className={['ml0',this.state.imgArr[index] ? 'transition-selection' : '', this.state.imgArr[index] == 'out' ? 'transition-out' : ''].join(' ')} onClick={this.imgClick.bind(this, index)} alt="" />
                )
                is_ml0 = false;
            }else {
                imgData.push(
                    <img key={index} src={item} className={[this.state.imgArr[index] ? 'transition-selection' : '', this.state.imgArr[index] == 'out' ? 'transition-out' : ''].join(' ')} onClick={this.imgClick.bind(this, index)} alt="" />
                )
            }
            
        })
        return imgData;

    }

    //当牌被点击时
    imgClick(index) {
        let state = this.state.imgArr;
        state[index] = !state[index]
        this.setState({
            imgArr: state,
        })
    }

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
            setTimeout(()=> {
                this.setState({
                    playerOneData: [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10,card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]
                })
            },1000)
            setTimeout(()=> {
                this.setState({
                    playerTwoData: [card1, card2, card3, card4, card5]
                })
            },2000)
        })
    }

    // 已出的牌展示
    beenOut() {
        let imgData = [];
        this.state.outData.forEach((item, index) => {
            imgData.push(
                <img key={index} src={item} alt="" />
            )
        })
        return imgData;
    }

    // 左边玩家出牌展示
    leftCardData() {
        let imgData = [];
        this.state.playerTwoData.forEach((item, index) => {
            imgData.push(
                <img key={index} src={item} alt="" />
            )
        })
        return imgData;
    }

    // 右边玩家出牌展示
    rightCardData() {
        let imgData = [];
        this.state.playerOneData.forEach((item, index) => {
            imgData.push(
                <img key={index} src={item} alt="" />
            )
        })
        return imgData;
    }

    render() {
        return (
            <div id="landlord-room">
                <div className="room-header">
                    <div className="room-header-left">
                        <img src={require('../../images/exit.png')} alt="" />
                        <span className="timer">19:53</span>
                    </div>
                    <div className="room-header-center">
                        <img src={require('../../images/card_back.png')} alt="" />
                        <img src={require('../../images/card_back.png')} alt="" />
                        <img src={require('../../images/card_back.png')} alt="" />
                    </div>
                    <div className="room-header-right">
                        <img src={require('../../images/hosting.png')} alt="" />
                        <img src={require('../../images/setting.png')} alt="" />
                    </div>
                </div>
                <div className="room-container">
                    <div className="room-container-player">
                        <div className="room-container-player-left">
                            <div className="player">
                                <div className="player-head text-r">
                                    <img src={require('../../images/player8.png')} alt="" />
                                    <p>平安是福</p>
                                    <p className="color-y"><img className="beans" src={require('../../images/beans2.png')}></img>9999</p>
                                </div>
                                <div className="player-identity">
                                    <img className="farmer" src={require('../../images/farmer.png')} alt="" />
                                    <div className="card-back">
                                        17
                                    </div>
                                </div>
                            </div>
                            <div className="out-brand">
                                {/* 左边玩家出牌区 */}
                                {this.leftCardData()}
                            </div>
                        </div>
                        <div className="room-container-player-right room-container-player-left">
                            <div className="out-brand">
                                {/* 右边玩家出牌区 */}
                                {this.rightCardData()}
                            </div>
                            <div className="player">
                                <div className="player-identity">
                                    <img className="farmer" src={require('../../images/farmer.png')} alt="" />
                                    <div className="card-back">
                                        17
                                    </div>
                                </div>
                                <div className="player-head text-l">
                                    <img src={require('../../images/player8.png')} alt="" />
                                    <p>平安是福</p>
                                    <p className="color-y"><img className="beans" src={require('../../images/beans2.png')}></img>9999</p>
                                </div>

                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>

                    <div className="my-show-brand">
                        {/* 不出&出牌 */}
                        {this.state.isShow_playCard ?
                            <div className="my-operating">
                                <div className="not-out" onClick={this.notOut.bind(this)}>
                                    不出
                                </div>
                                <div className="play-card" onClick={this.playCard.bind(this)}>
                                    出牌
                                </div>
                            </div> : ''
                        }

                        {/* 已出的牌 */}
                        {this.state.isShow_beenOut ?
                            <div className="been-out">
                                {this.beenOut()}
                            </div> : ''
                        }

                        {/* 我的卡牌 */}
                        <div className="show-card" style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                            {this.brandData()}
                        </div>

                        {/* 我的头像 */}
                        <div className="my-head">

                        </div>
                    </div>

                    <div className="room-container-footer">
                        <div className="footer-left">
                            <p>平安是福</p>
                            <p className="color-y"><img className="beans" src={require('../../images/beans2.png')}></img>9999</p>
                        </div>
                        <div className="footer-right">
                            <img src={require('../../images/expression.png')} alt=""/>
                            <img src={require('../../images/say.png')} alt=""/>
                        </div>
                    </div>
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

    }
};

const Room = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomMain);

export default Room;