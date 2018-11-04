/**
 * Created by ex-wangxin on 2018/9/29.
 */
/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class MyBeenOutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 30,
            // 左边位置 玩家
            leftSeat: this.props.userInfo.seat == 'leftPlayer' ? 'rightPlayer' : this.props.userInfo.seat == 'rightPlayer' ? 'bottomPlayer' : 'leftPlayer',
            // 右边位置 玩家
            rightSeat: this.props.userInfo.seat == 'leftPlayer' ? 'bottomPlayer' : this.props.userInfo.seat == 'rightPlayer' ? 'leftPlayer' : 'rightPlayer',
        };

    }

    // leftShow(userInfo, roomPlayerInfo) {
    //     console.log("leftShow")
    //     if (userInfo.seat == 'leftPlayer') {
    //         return (
    //             <div>
    //                 <img
    //                     src={require('../../../images/player3.png')}
    //                     alt="" />
    //                 <p>平安是福</p>
    //                 <p className="color-y"><img className="beans"
    //                     src={require('../../../images/beans2.png')}></img>9999</p>
    //             </div>
    //         )
    //     }



    // }

    // 左边玩家出牌展示
    leftCardData(list) {
        return list.map((item, index) => {
            return <img key={index} src={this.getSrc(item)} alt="" />
        })
    }

    // 右边玩家出牌展示
    rightCardData(list) {
        return list.map((item, index) => {
            return <img key={index} src={this.getSrc(item)} alt="" />
        })
    }

    getSrc(item) {
        let i = 1061;
        if (item * 1 == 51 || item * 1 == 50 || item * 1 == 49 || item * 1 == 48) {
            i = 1061 + item * 1 - 48
        } else if (item * 1 == 52) {
            i = 1114;
        } else if (item * 1 == 53) {
            i = 1113;
        } else {
            i = (1065 + item * 1);
        }
        return require('../../../images/card/card_' + i + '@2x.png');
    }

    render() {
        let leftSeat = this.state.leftSeat;
        let rightSeat = this.state.rightSeat;
        let status = this.props.roomPlayerInfo.status;//当前房间  进行到哪一步状态
        return (
            <div className="room-container-player">
                <div className="room-container-player-left">
                    <div className="player">
                        <div className="player-head text-r">
                            {/* 左边玩家 */}
                            <img
                                src={this.props.roomPlayerInfo[leftSeat] && this.props.roomPlayerInfo[leftSeat].headImg ? require('../../../images/' + this.props.roomPlayerInfo[leftSeat].headImg + '.png') :
                                    require('../../../images/head-border.png')}
                                alt="" />
                            <p>{this.props.roomPlayerInfo[leftSeat] && this.props.roomPlayerInfo[leftSeat].account}</p>
                            {this.props.roomPlayerInfo[leftSeat] && this.props.roomPlayerInfo[leftSeat].id ?
                                <p className="color-y"><img className="beans"
                                    src={require('../../../images/beans2.png')}></img>9999</p> :
                                ''
                            }

                        </div>
                        <div className="player-identity">
                            <img className="farmer hidden" src={require('../../../images/farmer.png')} alt="" />
                            <div className="card-back" style={{display:status=='Licensing'?'block':'none'}}>
                            {this.props.roomPlayerInfo[leftSeat].cardData.length}
                            </div>
                        </div>
                    </div>
                    <div className="out-brand">
                        {/* 左边玩家出牌区 */}
                        {/* {this.leftCardData(this.props.leftList)} */}

                        {/* 叫地主 */}
                        {/* <div className="is-landlord" style={{ display: this.props.isTimer == 3 ? 'none' : 'block' }}></div> */}

                        {/* 准备 */}
                        <div className="isReady" style={{display:this.props.roomPlayerInfo.status=='ready' && this.props.roomPlayerInfo[leftSeat].is_ready=='true'?'block':'none'}}>
                            已准备
                        </div>

                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.isTimer == 3 ? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                </div>
                <div className="room-container-player-right">
                    <div className="out-brand">
                        {/* 右边玩家出牌区 */}
                        {/* {this.rightCardData(this.props.rightList)} */}

                        {/* 叫地主 */}
                        {/* <div className="is-landlord" style={{ display: this.props.isTimer == 2 ? 'none' : 'block' }}></div> */}

                        {/* 准备 */}
                        
                        <div className="isReady" style={{display:this.props.roomPlayerInfo.status=='ready' && this.props.roomPlayerInfo[rightSeat].is_ready=='true'?'block':'none'}}>
                            已准备
                        </div>

                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.isTimer == 2 ? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                    <div className="player">
                        {/* 右边玩家 */}
                        <div className="player-identity">
                            <img className="farmer hidden" src={require('../../../images/farmer.png')} alt="" />
                            <div className="card-back" style={{display:status=='Licensing'?'block':'none'}}>
                                {this.props.roomPlayerInfo[rightSeat].cardData.length}
                            </div>
                        </div>
                        <div className="player-head text-l">
                            <img
                                src={this.props.roomPlayerInfo[rightSeat] && this.props.roomPlayerInfo[rightSeat].headImg ? require('../../../images/' + this.props.roomPlayerInfo[rightSeat].headImg + '.png') :
                                    require('../../../images/head-border.png')}
                                alt="" />
                            <p>{this.props.roomPlayerInfo[rightSeat] && this.props.roomPlayerInfo[rightSeat].account}</p>
                            {this.props.roomPlayerInfo[rightSeat] && this.props.roomPlayerInfo[rightSeat].id ?
                                <p className="color-y"><img className="beans"
                                    src={require('../../../images/beans2.png')}></img>9999</p> :
                                ''
                            }
                        </div>

                    </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default MyBeenOutCard;
