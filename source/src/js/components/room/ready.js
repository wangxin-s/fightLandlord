/**
 * Created by ex-fuyunfeng on 2018/11/2.
 */
import React from 'react';
import {socket} from '../../units/socketListen'

class Ready extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {

    }

    ready() {
        if(this.props.roomPlayerInfo[this.props.mySeat].is_ready=='true') {
            return;
        }
        
        // 当前玩家准备
        let roomId = this.props.roomId;
        let seat = this.props.mySeat;
        let userInfo = this.props.userInfo;
        socket.emit('ready', {
            roomId,//房间号
            seat,//位置
            userInfo,
        });
    }

    render() {
        return (
            <div className="my-operating">
                <div className={this.props.roomPlayerInfo[this.props.mySeat].is_ready=='true' ?'isplayLandlordTitle':'ready'} onClick={this.ready.bind(this)}>
                    {this.props.roomPlayerInfo[this.props.mySeat].is_ready=='true' ? '已准备' : '准备'}
                </div>
            </div>
        );
    }
}

export default Ready;