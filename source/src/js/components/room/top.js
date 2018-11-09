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
        if(this.props.isRevers){
            return (
                list.map((item, i)=> {
                    return <div key={i} className={this.props.isRevers?'revers':''}><img src={this.getSrc(item.icon)} alt=""/></div>;
                })
            )
        }else{
             return (
                list.map((item, i)=> {
                    return <div key={i} className={this.props.isRevers?'revers':''}><img src={item} alt=""/></div>;
                })
            )
        }
        
    }

    getSrc(item){
        if(item == undefined)return;
        let i=1061;
        if(item*1==51||item*1==50||item*1==49||item*1==48){
            i=1061+item*1-48
        }else if(item*1==52){
            i=1114;
        }else if(item*1==53){
            i=1113;
        }else{
            i=(1065+item*1);
        }
        return require('../../../images/card/card_'+i+'@2x.png');
    }

    outRoomFun(){
        this.props.outRoom(this.props.roomId);
    }
    render() {
        return (
            <div className="room-header">
                <div className="room-header-left">
                    <img src={require('../../../images/exit.png')} alt="" onClick={this.outRoomFun.bind(this)}/>
                    <span className="time">{this.props.newTime}</span>
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