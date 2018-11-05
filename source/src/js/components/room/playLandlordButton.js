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
        socket.emit('isPlayLandlord',{
            userInfo: this.props.userInfo,
            roomId: this.props.roomId,
            seat: this.props.mySeat,
            isPlayLandlord:'false',
        })
    }

    // 抢地主
    playerPlayLandlord() {
        socket.emit('isPlayLandlord',{
            userInfo: this.props.userInfo,
            roomId: this.props.roomId,
            seat: this.props.mySeat,
            isPlayLandlord:'true',
        })
    }

    render() {
        let roomPlayerInfo = this.props.roomPlayerInfo;
        let userInfo = this.props.userInfo;
        return (
            <div className="my-operating" style={{display:roomPlayerInfo.subStatus== 'playLandlord' && roomPlayerInfo[userInfo.seat].playLandlord=='true' ?'block':'none'}}>
                <div className="not-out" onClick={this.playerNoLandlord.bind(this)}>
                    不抢
                </div>
                <div className="timer">
                    {this.props.count}
                </div>
                <div className="play-card" onClick={this.playerPlayLandlord.bind(this)}>
                    抢地主
                </div>
            </div>
        );
    }
}

export default MyPlayButton;