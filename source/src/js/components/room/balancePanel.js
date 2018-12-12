/**
 * Created by ex-wangxin on 2018/12/7.
 */
import React from 'react';
require('./../../../css/balancePanel.scss');

class BalancePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {

    }

    closeFun(){
        this.props.callback(false);
    }

    render() {
        let show=this.props.show;
        let beanObj=this.props.beanObj;
        let p1={
            id:'',
            account:'',
            poistion:'',
            newbeanNum:'',
        };
        let p2={
            id:'',
            account:'',
            poistion:'',
            newbeanNum:'',
        };
        let p3={
            id:'',
            account:'',
            poistion:'',
            newbeanNum:'',
        };
        if(beanObj.p1){
            p1=beanObj.p1;
        }
        if(beanObj.p2){
            p2=beanObj.p2;
        }
        if(beanObj.p3){
            p3=beanObj.p3;
        }
        return (
            <div className="balance-panel" style={{display:show?'block':'none'}} onClick={this.closeFun.bind(this)}>
                <div className="bg"></div>
                <div className="content">
                    <h3>{this.props.title}</h3>
                    <ul>
                        <li>
                            <span className="one">{p1.id}</span>
                            <span className="two">{p1.account}</span>
                            <span className="three">{p1.newbeanNum}</span>
                        </li>
                        <li>
                            <span className="one">{p2.id}</span>
                            <span className="two">{p2.account}</span>
                            <span className="three">{p2.newbeanNum}</span>
                        </li>
                        <li>
                            <span className="one">{p3.id}</span>
                            <span className="two">{p3.account}</span>
                            <span className="three">{p3.newbeanNum}</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default BalancePanel;