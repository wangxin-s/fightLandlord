/**
 * Created by ex-wangxin on 2018/9/29.
 */
import React from 'react';

class Bottom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90,
            name : '',
            imgUrl : '',
            text : ''
        };
    }

    componentDidMount() {
        let roomData = this.props.roomData;
        let name = this.props.roomId.name;
        let room = this.props.roomId.room;
        this.dataFun(roomData,name,room)        
    }

    componentWillReceiveProps(nextProps) {        
        this.dataFun(nextProps.roomData,nextProps.roomId.name,nextProps.roomId.room)
    }

    dataFun(roomData,name,room){
        roomData.map((item,i)=>{
            if(room == item.room){
                item.playerList.map((val,j)=>{
                    if(val.name == name){
                        this.setState({
                            name,
                            imgUrl : val.imgUrl,
                            text : val.text
                        })
                    }
                })
            }
        })
    }
    render() {
        return (
            <div className="room-container-footer">
                <div className="footer-left">
                    <p>{this.state.name}</p>
                    <p>已准备</p>
                    <p className="color-y"><img className="beans" src={require('../../../images/beans2.png')}></img>9999</p>
                </div>
                <div>{this.state.text}</div>
                <div className="footer-right">
                    <img src={require('../../../images/expression.png')} alt=""/>
                    <img src={require('../../../images/say.png')} alt=""/>
                </div>
            </div>
        );
    }
}

export default Bottom;

