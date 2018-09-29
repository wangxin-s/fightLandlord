/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class MyBeenOutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    // 已出的牌展示
    beenOut(list) {
        return list.map((item, index) => {
            return <img key={index} src={item} alt="" />
        })
    }
    render() {
        return (
            <div className="been-out" style={{display:this.props.show?'block':'none'}}>
                {this.beenOut(this.props.list)}
            </div>
        );
    }
}

export default MyBeenOutCard;
