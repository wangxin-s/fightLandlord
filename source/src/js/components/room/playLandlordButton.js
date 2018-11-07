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

    clickFun(type){
        if(type=='不抢'){
            this.props.noLandlord();
        }else{
            this.props.playLandlord();
        }
    }

    render() {
        let isReady=this.props.show;
        return (
            <div className="my-operating" style={{display:(isReady=='robAndNo'||isReady=='rob'||isReady=='noRob')?'block':'none'}}>
                <div className="not-out" style={{display:isReady=='robAndNo'?'block':'none'}} onClick={this.clickFun.bind(this,'不抢')}>
                    不抢
                </div>
                <div className="timer" style={{display:isReady=='robAndNo'?'block':'none'}}>
                    {this.props.count}
                </div>
                <div className="play-card" style={{display:isReady=='robAndNo'?'block':'none'}} onClick={this.clickFun.bind(this,'抢地主')}>
                    抢地主
                </div>
                <div style={{display:isReady=='noRob'?'inline-block':'none'}}>不抢</div>
                <div style={{display:isReady=='rob'?'inline-block':'none'}}>抢地主</div>
            </div>
        );
    }
}

export default MyPlayButton;