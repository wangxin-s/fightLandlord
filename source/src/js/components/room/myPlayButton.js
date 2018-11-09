/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';
import { socket } from '../../units/socketListen'
class MyPlayButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 左边位置 玩家
            leftSeat: this.props.userInfo.seat == 'leftPlayer' ? 'rightPlayer' : this.props.userInfo.seat == 'rightPlayer' ? 'bottomPlayer' : 'leftPlayer',
            // 右边位置 玩家
            rightSeat: this.props.userInfo.seat == 'leftPlayer' ? 'bottomPlayer' : this.props.userInfo.seat == 'rightPlayer' ? 'leftPlayer' : 'rightPlayer',
        };
    }

    componentDidMount() {

    }

    // 出牌
    playCard(isPlayCard) {
        let roomId = this.props.roomPlayerInfo.roomId;
        let seat = this.props.mySeat;
        let userInfo = this.props.userInfo;

        if (isPlayCard=='true') {//出牌
            let cardList = this.props.cardList;
            let cardStatusArr = this.props.cardStatusArr;
            let showOutCardIcon = [];
            let showOutCardVal = [];
            cardStatusArr.forEach((item, index) => {
                if (item) {
                    showOutCardIcon.push(cardList[index].icon)
                    showOutCardVal.push(cardList[index].val)
                }
            })

            if (showOutCardVal.length < 1) {//没有选择牌
                alert('请选择要出的牌')
            } else {
                socket.emit('isPlayCard', {
                    roomId,//房间号
                    seat,//位置
                    userInfo,//当前用户信息
                    isPlayCard: isPlayCard,//是否出牌
                    showOutCardIcon: showOutCardIcon,//要出的牌icon 用于前端展示
                    showOutCardVal: showOutCardVal,//要出的牌val 值 用于牌型判断
                });
            }
        }else {//不出
            socket.emit('isPlayCard', {
                roomId,//房间号
                seat,//位置
                userInfo,//当前用户信息
                isPlayCard: isPlayCard,//是否出牌
            });
        }
    }

    render() {
        let leftSeat = this.state.leftSeat;
        let rightSeat = this.state.rightSeat;

        let roomPlayerInfo = this.props.roomPlayerInfo;
        let userInfo = this.props.userInfo;
        let mySeat = this.props.mySeat;
        return (
            <div className="my-operating" style={{ "display": roomPlayerInfo.subStatus == 'playCard' && roomPlayerInfo[mySeat].playCard == 'true' ? 'block' : 'none' }}>
                <div className="not-out" onClick={this.playCard.bind(this, 'false')} style={{ display: (roomPlayerInfo[leftSeat].showOutCardIcon.length == 0 || roomPlayerInfo[leftSeat].showOutCardIcon[0] == 'notOut') && (roomPlayerInfo[rightSeat].showOutCardIcon.length == 0 || roomPlayerInfo[rightSeat].showOutCardIcon[0] == 'notOut') ? 'none' : 'block' }}>
                    不出
                </div>
                <div className="timer">
                    {this.props.count}
                </div>
                <div className="play-card" onClick={this.playCard.bind(this, 'true')}>
                    出牌
                </div>
            </div>
        );
    }
}

export default MyPlayButton;