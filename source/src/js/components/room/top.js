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
        if(list.length<=0){
            list=['','','']
        }
        return (
            list.map((item, i)=> {
                let srcIndex=1061;
                let src='';
                if(item!==''){
                    if(item*1==51||item*1==50||item*1==49||item*1==48){
                        srcIndex=1061+item*1-48
                    }else if(item*1==52){
                        srcIndex=1114;
                    }else if(item*1==53){
                        srcIndex=1113;
                    }else{
                        srcIndex=(1065+item*1);
                    }
                    src=require('../../../images/card/card_'+srcIndex+'@2x.png');
                }else{
                    src=require('../../../images/card_back.png');
                }
                return <div key={i}><img src={src} alt=""/></div>;
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
                {/*当前局倍数 start*/}
                <div className="double">倍数：{this.props.doubleBeanNum}倍</div>
                {/*当前局倍数 end*/}
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