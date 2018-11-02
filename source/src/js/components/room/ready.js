/**
 * Created by ex-fuyunfeng on 2018/11/2.
 */
import React from 'react';

class Ready extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {

    }

    ready() {
        
    }

    render() {
        return (
            <div className="my-operating">
                <div className="ready" onClick={this.ready.bind(this)}>
                    {this.props.roomPlayerInfo[this.props.mySeat].is_ready ? '已准备' : '准备'}
                </div>
            </div>
        );
    }
}

export default Ready;