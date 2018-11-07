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

    render() {
        let isReady=this.props.show;
        return (
            <div className="my-operating" style={{display:(isReady=='discardOrNo'||isReady=='noDiscard')?'block':'none'}}>
                <div className="not-out" style={{display:(isReady=='discardOrNo')?'block':'none'}} onClick={this.props.playCard.bind(this,2000)}>
                    不出
                </div>
                <div className="timer"  style={{display:(isReady=='discardOrNo')?'block':'none'}}>
                    {this.props.count}
                </div>
                <div className="play-card"  style={{display:(isReady=='discardOrNo')?'block':'none'}} onClick={this.props.playCard.bind(this,1000)}>
                    出牌
                </div>
                <div  style={{display:(isReady=='noDiscard')?'inline-block':'none'}}>不出</div>
            </div>
        );
    }
}

export default MyPlayButton;