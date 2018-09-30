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
        return (
            <div className="my-operating" style={{display:this.props.isTimer==1?'block':'none'}}>
                <div className="not-out" onClick={this.props.noLandlord}>
                    不抢
                </div>
                <div className="timer" style={{display:this.props.isTimer==1?'block':'none'}}>
                    {this.props.count}
                </div>
                <div className="play-card" onClick={this.props.playLandlord}>
                    抢地主
                </div>
            </div>
        );
    }
}

export default MyPlayButton;