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
                return <img key={i} src={require('../../../images/card_back.png')} alt=""/>;
                //return <img src={item.card} alt=""/>
            })
        )
    }

    render() {
        return (
            <div className="room-header">
                <div className="room-header-left">
                    <img src={require('../../../images/exit.png')} alt=""/>
                    <span className="time">{this.props.newTime}</span>
                </div>
                {/*三张底牌 start*/}
                <div className="room-header-center">
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