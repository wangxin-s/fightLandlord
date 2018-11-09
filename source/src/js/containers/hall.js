/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux';

import {hallHandle} from '../actions/hall';

const socket = require('socket.io-client')('http://localhost:3001');
class HallMain extends React.Component {
    componentDidMount() {  
        socket.emit('desk', '');
        socket.on('desk',(data)=>{
            this.props._hallHandle({
                hallInfo:data,
            });
        });
         socket.on('createDesk',(data)=>{
           this.props._hallHandle({
                hallInfo:data,
            });
        })
        socket.on('toRoom',(data)=>{
           this.props._hallHandle({
                hallInfo:data,
            });
        });
        socket.on('outRoom',(data)=>{
           this.props._hallHandle({
                hallInfo:data,
            });
        })
    }

    action(sit,name,list) {
        let imgUrl = this.props.hall.imgUrl;
        // if(list.playerList.every(function(item){ return item.name}) !== ''){
        //      alert('此房间已满，请换房间试试！');
        //      return;
        // }
        if(sit == 'left'){
            if(list.playerList[0].imgUrl !== ''){
                alert('此位置已占，请换位置试试！');
                return;
            }
        }
        if(sit == 'right'){
            if(list.playerList[2].imgUrl !== ''){
                alert('此位置已占，请换位置试试！');
                return;
            }
        }
        if(sit == 'bottom'){
            if(list.playerList[1].imgUrl !== ''){
                alert('此位置已占，请换位置试试！');
                return;
            }
        }
        socket.emit('toRoom',{
            sit : sit,
            name : name,
            room : list.room,
            imgUrl : imgUrl
        })
        this.props.history.push("/room?room="+list.room+'&name='+name);            
    }

  
    showHall(data){
        let name = this.props.match.params.id;
        if(data.length>0){            
            return data.map((val,i)=>{            
                    return(
                        <li key={i}>
                            <img src={val.playerList[0].imgUrl !== '' ? val.playerList[0].imgUrl : require('../../images/head-border.png')} className="player" alt="" 
                                onClick={this.action.bind(this,'left',name,val)}/>
                            <span className="table">
                                <img src={require("../../images/diamond.png")} alt=""/>
                            </span>
                            <img src={val.playerList[2].imgUrl !== '' ? val.playerList[2].imgUrl : require('../../images/head-border.png')} className="player" alt="" 
                                onClick={this.action.bind(this,'right',name,val)}/>
                            <span >
                                <img src={val.playerList[1].imgUrl !== '' ? val.playerList[1].imgUrl : require('../../images/head-border.png')} className="player-bottom" alt="" 
                                onClick={this.action.bind(this,'bottom',name,val)}/>
                            </span>
                        </li>
                    );                       
            });
        }
    }

    
    intoRoom (){        
        socket.emit('createDesk','')       
    }

    render() {
        let name = this.props.match.params.id;
        let imgUrl = this.props.hall.imgUrl;
        return (
            <div id="landlord-hall">
                <div className="header">
                    <div className="header-left">
                        <div className="head">
                            <img src={imgUrl !== '' ? imgUrl : require('../../images/head.png')} alt="" />
                        </div>

                        <div className="userName">
                            {name}
                        </div>
                        <div className="beans">
                            <img src={require('../../images/beans2.png')} alt="" />
                            <span>3000</span>
                        </div>
                    </div>
                    <div className="header-right">
                        <img src={require('../../images/task.png')} alt="" />
                        <img src={require('../../images/store.png')} alt="" />
                        <img src={require('../../images/info.png')} alt="" />
                        <img src={require('../../images/setting.png')} alt="" />
                        <img src={require('../../images/exit.png')} alt="" />
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="container">
                    <div className="character-left">
                        <img src={require('../../images/character5.png')} alt=""/>
                    </div>
                    <div className="table-right">
                        <ul className="table-list clearfix">
                            {this.showHall(this.props.hall.hallInfo)}                           
                            {/*<li onClick={this.intoRoom.bind(this)}>
                                <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/diamond.png")} alt=""/>
                                </span>
                                <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span >
                                    <img src={require('../../images/head-border.png')} className="player-bottom" alt="" />
                                </span>
                            </li>
                            <li>
                                <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/diamond.png")} alt=""/>
                                </span>
                                <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span >
                                    <img src={require('../../images/head-border.png')} className="player-bottom" alt="" />
                                </span>
                            </li>
                            <li>
                                <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/diamond.png")} alt=""/>
                                </span>
                                <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span >
                                    <img src={require('../../images/head-border.png')} className="player-bottom" alt="" />
                                </span>
                            </li>
                            <li>
                                 <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/diamond.png")} alt=""/>
                                </span>
                                <img src={require('../../images/head-border.png')} className="player" alt="" />
                                <span >
                                    <img src={require('../../images/head-border.png')} className="player-bottom" alt="" />
                                </span>
                            </li>*/}

                        </ul>
                        <div className="fast-action" onClick={this.intoRoom.bind(this)}>
                            创建房间
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
         _hallHandle: (options) => {
            dispatch(hallHandle(options))
        },
    }
};

const Hall = connect(
    mapStateToProps,
    mapDispatchToProps
)(HallMain);

export default Hall;