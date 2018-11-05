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
                return <div key={i} className={this.props.roomPlayerInfo.subStatus=='playCard'?'revers':''}>
                    {this.props.roomPlayerInfo.subStatus=='playCard'?
                        <img src={require('../../../images/card/card_'+item.icon+'.png')} alt=""/>:
                        <img src={item} alt=""/>
                    }
                    
                </div>;
            })
        )
    }

    render() {
        let landlordCard = this.props.roomPlayerInfo.subStatus=='playCard'?this.props.roomPlayerInfo.landlordCard:this.props.list;
        return (
            <div className="room-header">
                <div className="room-header-left">
                    <img src={require('../../../images/exit.png')} alt="" onClick={this.props.exit} />
                    <span className="time">{this.props.newTime}</span>
                </div>
                
                {/*三张底牌 start*/}
                <div className='room-header-center'>
                    {this.imgFun(landlordCard)}                 
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