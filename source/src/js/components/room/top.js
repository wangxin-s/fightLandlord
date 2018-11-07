/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class BottomCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    imgFun(list) {
        return (
            list.map((item, i)=> {
                return <div key={i} className={this.props.isRevers?'revers':''}><img src={item} alt=""/></div>;
            })
        )
    }

    //离开房间
    leaveRoom(){
        this.props.leaveRoom();
    }

    render() {
        return (
            <div className="room-header">
                <div className="room-header-left">
                    <img onClick={this.leaveRoom.bind(this)} src={require('../../../images/exit.png')} alt=""/>
                    <span className="time">{this.props.newTime}</span>
                    <span className="time">房间：{this.props.roomId}</span>
                </div>
                {/*三张底牌 start*/}
                <div className='room-header-center' onClick={this.props.revers}>
                    {this.imgFun(this.props.list)}
                </div>
                {/*三张底牌 end*/}
                <div className="room-header-right">
                    <img src={require('../../../images/hosting.png')} alt=""/>
                    <img src={require('../../../images/setting.png')} alt=""/>
                </div>
            </div>
        );
    }
}

export default BottomCard;