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
            count: 30
        };

    }

    // 左边玩家出牌展示
    leftCardData(list) {
        return list.map((item, index) => {
            return <img key={index} src={this.getSrc(item)} alt="" />
        })
    }

    // 右边玩家出牌展示
    rightCardData(list) {
        return list.map((item, index) => {
            return <img key={index} src={this.getSrc(item)} alt="" />
        })
    }

    getSrc(item){
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

    render() {
        return (
            <div className="room-container-player">
                <div className="room-container-player-left">
                    <div className="player">
                        <div className="player-head text-r">
                            <img src={require('../../../images/player8.png')} alt="" />
                            <p>平安是福</p>
                            <p className="color-y"><img className="beans"
                                src={require('../../../images/beans2.png')}></img>9999</p>
                        </div>
                        <div className="player-identity">
                            <img className="farmer" src={require('../../../images/farmer.png')} alt="" />
                            <div className="card-back">
                                17
                            </div>
                        </div>
                    </div>
                    <div className="out-brand">
                        {/* 左边玩家出牌区 */}
                        {this.leftCardData(this.props.leftList)}
                        {/* 提示 title */}
                        <div className="is-landlord" style={{ display: this.props.isTimer == 3 ? 'none' : 'block' }}></div>
                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.isTimer == 3 ? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                </div>
                <div className="room-container-player-right">
                    <div className="out-brand">
                        {/* 右边玩家出牌区 */}
                        {this.rightCardData(this.props.rightList)}
                        {/* 提示 title */}
                        <div className="is-landlord" style={{ display: this.props.isTimer == 2 ? 'none' : 'block' }}></div>
                        {/* 倒计时 */}
                        <div className="timer" style={{ display: this.props.isTimer == 2 ? 'block' : 'none' }}>
                            {this.props.count}
                        </div>
                    </div>
                    <div className="player">
                        <div className="player-identity">
                            <img className="farmer" src={require('../../../images/farmer.png')} alt="" />
                            <div className="card-back">
                                17
                            </div>
                        </div>
                        <div className="player-head text-l">
                            <img src={require('../../../images/player8.png')} alt="" />
                            <p>平安是福</p>
                            <p className="color-y"><img className="beans"
                                src={require('../../../images/beans2.png')}></img>9999</p>
                        </div>

                    </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default MyBeenOutCard;
