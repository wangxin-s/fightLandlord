/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class Bottom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    render() {
        let bottomData=this.props.bottomData;
        return (
            <div className="room-container-footer">
                <div className="footer-left">
                    <p>{bottomData.account}</p>
                    <p className="color-y"><img className="beans" src={require('../../../images/beans2.png')}></img>{bottomData.beanNum}</p>
                </div>
                <div className="footer-right">
                    <img src={require('../../../images/expression.png')} alt=""/>
                    <img src={require('../../../images/say.png')} alt=""/>
                </div>
            </div>
        );
    }
}

export default Bottom;

