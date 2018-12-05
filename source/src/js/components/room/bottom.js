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
            text : '',
            chatText : '',
            chatState : false,
            chatList : [
                {text : '快点啊，我等到花儿都谢了！'},
                {text : '和你合作真是太愉快了！'},
                {text : '不要走，决战到天亮！'},
            ]
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
                            text : val.text,
                            chatText : val.chatText
                        })
                    }
                })
            }
        })
    }

    chatFun(){
        let chatState = this.state.chatState;
        this.setState({
            chatState : !chatState
        })
    }

    chatHtml(list){
        return list.map((item , i)=>{
            return(
                <li key={i} onClick={this.callBack.bind(this,item.text)}>{item.text}</li>
            )
        })
    }
    
    callBack(text){
        let chatState = this.state.chatState;
        this.setState({
            chatState : !chatState
        });
        this.props.chatBackFun(text);
    };
    render() {
        return (
        <div>
            <div className="room-container-footer">
                <div className="footer-left">
                    <p>{this.state.name}</p>
                    <p>已准备</p>
                    <p>{this.state.chatText}</p>
                    <p className="color-y"><img className="beans" src={require('../../../images/beans2.png')}></img>9999</p>
                </div>
                <div className="footer-text" style={{display : this.state.text !== ''?'inline-block':'none'}}>{this.state.text}</div>
                <div className="footer-right">
                    <img src={require('../../../images/expression.png')} alt=""/>
                    <img src={require('../../../images/say.png')} alt="" onClick={this.chatFun.bind(this)}/>
                </div>
            </div>
            {this.state.chatState && 
                <div className="footer-chat">
                    <ul>
                        {this.chatHtml(this.state.chatList)}
                    </ul>
                </div>
            }
        </div>
        );
    }
}

export default Bottom;

