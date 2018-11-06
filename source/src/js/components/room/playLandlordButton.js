/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';
import { socket } from '../../units/socketListen';

class MyPlayButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    // 不抢地主
    playerNoLandlord() {
        let roomPlayerInfo = this.props.roomPlayerInfo;
        socket.emit('isPlayLandlord',{
            userInfo: this.props.userInfo,
            roomId: this.props.roomId,
            seat: this.props.mySeat,
            isPlayLandlord:'false',
            isPlayLandlordTitle:roomPlayerInfo.is_playLandlord.length>0?'不抢':'不叫',
        })
    }

    // 抢地主
    playerPlayLandlord() {
        let roomPlayerInfo = this.props.roomPlayerInfo;
        socket.emit('isPlayLandlord',{
            userInfo: this.props.userInfo,
            roomId: this.props.roomId,
            seat: this.props.mySeat,
            isPlayLandlord:'true',
            isPlayLandlordTitle:roomPlayerInfo.is_playLandlord.length>0?'抢地主':'叫地主',
        })
    }

    render() {
        let roomPlayerInfo = this.props.roomPlayerInfo;
        let userInfo = this.props.userInfo;
        return (
            <div className="my-operating" style={{display:roomPlayerInfo.subStatus== 'playLandlord' && roomPlayerInfo[userInfo.seat].playLandlord=='true' ?'block':'none'}}>
                <div className="not-out" onClick={this.playerNoLandlord.bind(this)}>
                    {roomPlayerInfo.is_playLandlord.length>0?'不抢':'不叫'}
                </div>
                <div className="timer">
                    {this.props.count}
                </div>
                <div className="play-card" onClick={this.playerPlayLandlord.bind(this)}>
                    {roomPlayerInfo.is_playLandlord.length>0?'抢地主':'叫地主'}
                </div>
            </div>
        );
    }
}

export default MyPlayButton;