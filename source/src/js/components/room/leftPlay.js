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
        if (list[0] == 'notOut') {
            return <div className="my-operating">
                <div className='isplayLandlordTitle'>
                    不出
                </div>
            </div>
        } else {
            return list.map((item, index) => {
                return <img key={index} src={require('../../../images/card/card_' + item + '.png')} alt="" />
            })
        }
    }

    // 右边玩家出牌展示
    rightCardData(list) {
        if (list[0] == 'notOut') {
            return  <div className="my-operating">
                        <div className='isplayLandlordTitle'>
                            不出
                        </div>
                    </div>
        } else {
            return list.map((item, index) => {
                return <img key={index} src={require('../../../images/card/card_' + item + '.png')} alt="" />
            })
        }
    }

    render() {
        let leftSeat = this.state.leftSeat;
        let rightSeat = this.state.rightSeat;
        let status = this.props.roomPlayerInfo.status;//当前房间  进行到哪一步状态
        let roomPlayerInfo = this.props.roomPlayerInfo;
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
                            <img className="farmer"
                                style={{ display: this.props.roomPlayerInfo.subStatus == 'playCard' ? 'block' : 'none' }}
                                src={this.props.roomPlayerInfo.is_playLandlord[this.props.roomPlayerInfo.is_playLandlord.length - 1] == leftSeat ?
                                    require('../../../images/Landlord.png') : require('../../../images/farmer.png')} alt="" />

                            {/* {status == 'Licensing' ?
                                <div className="card-back">
                                    {this.props.roomPlayerInfo[leftSeat].cardData.length}
                                </div> : ''
                            } */}

                            <div className="card-back" style={{visibility:status == 'Licensing'?'':'hidden'}}>
                                {this.props.roomPlayerInfo[leftSeat].cardData.length}
                            </div>
                        </div>
                    </div>
                    <div className="out-brand">
                        {/* 左边玩家出牌区 */}
                        {
                            roomPlayerInfo[leftSeat].showOutCardIcon.length != 0 ?
                                this.leftCardData(roomPlayerInfo[leftSeat].showOutCardIcon)
                                : ''
                        }

                        {/* 叫地主 */}
                        {/* <div className="is-landlord" style={{ display: this.props.isTimer == 3 ? 'none' : 'block' }}></div> */}

                        {/* 准备 */}
                        <div className="isplayLandlordTitle" style={{ display: this.props.roomPlayerInfo.status == 'ready' && this.props.roomPlayerInfo[leftSeat].is_ready == 'true' ? 'block' : 'none' }}>
                            已准备
                        </div>

                        {/* 是否抢地主展示title */}
                        <div className="isplayLandlordTitle" style={{ display: roomPlayerInfo.subStatus == 'playLandlord' && roomPlayerInfo[leftSeat].isPlayLandlordTitle != '' ? 'block' : 'none' }}>
                            {roomPlayerInfo[leftSeat].isPlayLandlordTitle}
                        </div>

                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.roomPlayerInfo[leftSeat].playLandlord == 'true' || this.props.roomPlayerInfo[leftSeat].playCard == 'true'? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                </div>
                <div className="room-container-player-right">
                    <div className="out-brand">
                        {/* 右边玩家出牌区 */}
                        {
                            roomPlayerInfo[rightSeat].showOutCardIcon.length != 0 ?
                                this.leftCardData(roomPlayerInfo[rightSeat].showOutCardIcon)
                                : ''
                        }

                        {/* 叫地主 */}
                        {/* <div className="is-landlord" style={{ display: this.props.isTimer == 2 ? 'none' : 'block' }}></div> */}

                        {/* 准备 */}
                        <div className="isplayLandlordTitle" style={{ display: this.props.roomPlayerInfo.status == 'ready' && this.props.roomPlayerInfo[rightSeat].is_ready == 'true' ? 'block' : 'none' }}>
                            已准备
                        </div>

                        {/* 是否抢地主展示title */}
                        <div className="isplayLandlordTitle" style={{ display: roomPlayerInfo.subStatus == 'playLandlord' && roomPlayerInfo[rightSeat].isPlayLandlordTitle != '' ? 'block' : 'none' }}>
                            {roomPlayerInfo[rightSeat].isPlayLandlordTitle}
                        </div>


                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.roomPlayerInfo[rightSeat].playLandlord == 'true' || this.props.roomPlayerInfo[rightSeat].playCard == 'true' ? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                    <div className="player">
                        {/* 右边玩家 */}
                        <div className="player-identity">
                            <img className="farmer"
                                style={{ display: this.props.roomPlayerInfo.subStatus == 'playCard' ? 'block' : 'none' }}
                                src={this.props.roomPlayerInfo.is_playLandlord[this.props.roomPlayerInfo.is_playLandlord.length - 1] == rightSeat ?
                                    require('../../../images/Landlord.png') : require('../../../images/farmer.png')} alt="" />
                            <div style={{clear:'both'}}></div>

                            {/* {status == 'Licensing' ?
                                <div className="card-back">
                                    {this.props.roomPlayerInfo[rightSeat].cardData.length}
                                </div> : ''
                            } */}

                            <div className="card-back" style={{visibility:status == 'Licensing'?'':'hidden'}}>
                                {this.props.roomPlayerInfo[rightSeat].cardData.length}
                            </div> 
                            <div style={{clear:'both'}}></div>

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
