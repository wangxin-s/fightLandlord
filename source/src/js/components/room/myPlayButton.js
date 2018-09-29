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
            <div className="my-operating" style={{display:this.props.show?'block':'none'}}>
                <div className="not-out" onClick={this.props.notOut}>
                    不出
                </div>
                <div className="play-card" onClick={this.props.playCard}>
                    出牌
                </div>
            </div>
        );
    }
}

export default MyPlayButton;