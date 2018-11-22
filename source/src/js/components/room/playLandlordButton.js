/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class MyPlayButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    clickFun(type) {
        if (type == '不抢') {
            this.props.noLandlord();
        } else if(type == '抢地主') {
            this.props.playLandlord();
        }else if(type=='叫地主'){
            this.props.callLanFun('callLan');
        }else if(type=='不叫'){
            this.props.callLanFun('noCallLan');
        }
    }

    //
    conFun(isReady) {
        if (isReady == 'robAndNo') {
            return true;
        } else if (isReady == 'callOrNo') {
            return true;
        }
        return false;
    }

    noFun(isReady){
        if(isReady == 'robAndNo'){
            return (
                <div className="not-out" onClick={this.clickFun.bind(this, '不抢')}>
                    不抢
                </div>
            )
        }else if(isReady == 'callOrNo'){
            return (
                <div className="not-out" onClick={this.clickFun.bind(this, '不叫')}>
                    不叫
                </div>
            )
        }
    }

    yesFun(isReady){
        if(isReady == 'robAndNo'){
            return (
                <div className="play-card" onClick={this.clickFun.bind(this, '抢地主')}>
                    抢地主
                </div>
            )
        }else if(isReady == 'callOrNo'){
            return (
                <div className="play-card" onClick={this.clickFun.bind(this, '叫地主')}>
                    叫地主
                </div>
            )
        }
    }

    checkFun(isReady){
        //callOrNo--叫·不叫 callLan--叫地主 noCallLan--不叫
        if(
            isReady == 'robAndNo' ||
            isReady == 'rob' ||
            isReady == 'noRob'||
            isReady == 'callOrNo'||
            isReady == 'callLan'||
            isReady == 'noCallLan'
        ){
            return true ;
        }
        return false;
    }

    render() {
        let isReady = this.props.show;
        return (
            <div className="my-operating"
                 style={{display: this.checkFun(isReady) ? 'block' : 'none'}}>
                {this.noFun(isReady)}
                <div className="timer" style={{display: this.conFun(isReady) ? 'block' : 'none'}}>
                    {this.props.count}
                </div>
                {this.yesFun(isReady)}
                <div style={{display: isReady == 'noRob' ? 'inline-block' : 'none'}}>不抢</div>
                <div style={{display: isReady == 'rob' ? 'inline-block' : 'none'}}>抢地主</div>
                <div style={{display: isReady == 'callLan' ? 'inline-block' : 'none'}}>叫地主</div>
                <div style={{display: isReady == 'noCallLan' ? 'inline-block' : 'none'}}>不叫</div>
            </div>
        );
    }
}

export default MyPlayButton;