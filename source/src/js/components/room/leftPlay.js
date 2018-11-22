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
            return <img key={index} src={this.getSrc(item)} alt=""/>
        })
    }

    // 右边玩家出牌展示
    rightCardData(list) {
        return list.map((item, index) => {
            return <img key={index} src={this.getSrc(item)} alt=""/>
        })
    }

    getSrc(item) {
        let i = 1061;
        if (item * 1 == 51 || item * 1 == 50 || item * 1 == 49 || item * 1 == 48) {
            i = 1061 + item * 1 - 48
        } else if (item * 1 == 52) {
            i = 1114;
        } else if (item * 1 == 53) {
            i = 1113;
        } else {
            i = (1065 + item * 1);
        }
        return require('../../../images/card/card_' + i + '@2x.png');
    }

    //用户当前是地主还是农民
    playTypeFun(type,isReady) {
        if (isReady == 'discardOrNo' || isReady == 'discard' || isReady == 'noDiscard' || isReady == 'hasDisCard') {

        }else{
            return true;
        }
        if (type == 'landlord') {
            return <img className="farmer" src={require('../../../images/Landlord.png')} alt=""/>
        } else if(type=='farmer'){
            return <img className="farmer" src={require('../../../images/farmer.png')} alt=""/>
        }
    }

    //左侧玩家当前状态
    leftStatus(status) {
        let leftData = this.props.leftData;
        let html = '';
        //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
        // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
        // hasDisCard--已出牌
        if(leftData.id!==''){
            switch (status) {
                case 'ready':
                    html = <div className="center">准备</div>;
                    break;
                case 'readyEd':
                    html = <div className="center">已准备</div>;
                    break;
                case 'callOrNo':
                    html =
                        <div className="timer">
                            {this.props.count}
                        </div>;
                    break;
                case 'callLan':
                    html = <div className="center">叫地主</div>;
                    break;
                case 'noCallLan':
                    html = <div className="center">不叫</div>;
                    break;
                case 'robAndNo':
                    html =
                        <div className="timer">
                            {this.props.count}
                        </div>;
                    break;
                case 'rob':
                    html = <div className="center">抢地主</div>;
                    break;
                case 'noRob':
                    html = <div className="center">不抢</div>;
                    break;
                case 'discardOrNo':
                    html =
                        <div className="timer">
                            {this.props.count}
                        </div>;
                    break;
                    break;
                case 'noDiscard':
                    html = <div className="center">不出</div>;
                    break;
                case 'hasDisCard':
                    html=this.leftCardData(leftData.outCard);
                    break;
            }
        }
        return (
            <div className="out-brand">
                {html}
            </div>
        )
    }

    //右侧玩家当前状态
    rightStatus(status){
        let rightData = this.props.rightData;
        let html = '';
        //ready--准备按钮  readyEd--已准备 callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫  robAndNo--抢·不抢  rob--抢地主
        // noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出
        // hasDisCard--已出牌
        if(rightData.id!==''){
            switch (status) {
                case 'ready':
                    html = <div className="center">准备</div>;
                    break;
                case 'readyEd':
                    html = <div className="center">已准备</div>;
                    break;
                case 'callOrNo':
                    html =
                        <div className="timer">
                            {this.props.count}
                        </div>;
                    break;
                case 'callLan':
                    html = <div className="center">叫地主</div>;
                    break;
                case 'noCallLan':
                    html = <div className="center">不叫</div>;
                    break;
                case 'robAndNo':
                    html =
                        <div className="timer">
                            {this.props.count}
                        </div>;
                    break;
                case 'rob':
                    html = <div className="center">抢地主</div>;
                    break;
                case 'noRob':
                    html = <div className="center">不抢</div>;
                    break;
                case 'discardOrNo':
                    html =
                        <div className="timer">
                            {this.props.count}
                        </div>;
                    break;
                    break;
                case 'noDiscard':
                    html = <div className="center">不出</div>;
                    break;
                case 'hasDisCard':
                    html=this.leftCardData(rightData.outCard);
                    break;
            }
        }
        return (
            <div className="out-brand">
                {html}
            </div>
        )
    }

    render() {
        let leftData = this.props.leftData;
        let rightData = this.props.rightData;
        return (
            <div className="room-container-player">
                <div className="room-container-player-left">
                    <div className="player">
                        <div className="player-head text-r">
                            <img src={leftData.headImg} alt=""/>
                            <p>{leftData.account}</p>
                            <p className="color-y"><img className="beans"
                                                        src={require('../../../images/beans2.png')}></img>{leftData.beanNum}
                            </p>
                        </div>
                        <div className="player-identity">
                            {this.playTypeFun(leftData.playType,leftData.isReady)}
                            <div className="card-back">
                                {leftData.cardNum}
                            </div>
                        </div>
                    </div>
                    {/*玩家当前状态  start*/}
                    {this.leftStatus(leftData.isReady)}
                    {/*玩家当前状态  end*/}
                </div>
                <div className="room-container-player-right">
                    {/*右侧玩家当前状态--start*/}
                    {this.rightStatus(rightData.isReady)}
                    {/*右侧玩家当前状态--end*/}
                    <div className="player">
                        <div className="player-identity">
                            {this.playTypeFun(rightData.playType,rightData.isReady)}
                            <div className="card-back">
                                {rightData.cardNum}
                            </div>
                        </div>
                        <div className="player-head text-l">
                            <img src={rightData.headImg} alt=""/>
                            <p>{rightData.account}</p>
                            <p className="color-y"><img className="beans"
                                                        src={require('../../../images/beans2.png')}></img>{rightData.beanNum}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default MyBeenOutCard;
