/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux';
import {hallHandle} from '../actions/hall';
//import {socket_emit} from '../units/socket';
var socket = require('socket.io-client')('http://localhost:3001');

class HallMain extends React.Component {

    componentDidMount() {
        console.log('1234567');
        socket.emit('getHallInfo','socket方法测试');
        socket.emit('getHallInfo', {});
        socket.on('getHallInfo',(data)=>{
            console.log('--------进入大厅-------',data);
            this.props._hallHandle({
                hallInfo:data,
            });
        });
        socket.on('exitHall',(data)=>{
            if(Number(this.props.match.params.id)===data){
                this.props.history.push("/login");
            }
        });
    }

    //生命周期销毁方法
    componentWillUnmount() {
        //告诉后台离开了，销毁当前 socket
        socket.removeAllListeners('getHallInfo');
        socket.removeAllListeners('exitHall');
    }

    action() {
        let login=this.props.login;
        socket.emit('fastMatching', {
            message:'快速匹配',
            id:login.id,
            account: login.account,
            password: login.password,
        });
        this.props.history.push("/room");
    }



    sitFun(param,roomId,sit){
        if(param!==""){
            alert('此位置已有人');
        }else{
            socket.emit('sit',{roomId:roomId,location:sit,id:this.props.login.id});
            this.props._hallHandle({
                roomId:roomId,
                location:sit,
                userId:this.props.login.id
            });
            this.props.history.push("/room");
        }
    }
    showHall(data){
        if(data.length>0){
            return data.map((val,i)=>{
                console.log(val);
                let roomId='';
                let leftPic='',rightPic='',bottomPic="";
                if(val.leftSit!==''){
                    leftPic=val.leftSit.headImg;
                }else{
                    leftPic='';
                }
                if(val.rightSit!==''){
                    rightPic=val.rightSit.headImg;
                    roomId=val.rightSit.roomId
                }else{
                    rightPic='';
                }
                if(val.bottomSit!==''){
                    bottomPic=val.bottomSit.headImg;
                    roomId=val.bottomSit.roomId
                }else{
                    bottomPic='';
                }
                roomId=(val.leftSit.roomId===''?roomId:val.leftSit.roomId);
                roomId=(val.rightSit.roomId===''?roomId:val.rightSit.roomId);
                roomId=(val.bottomSit.roomId===''?roomId:val.bottomSit.roomId);
                console.log(roomId);
                let roomNumImg=require('../../images/room'+(i+1)+'.png');
                
                return(

                    <li key={i}>
                        <img src={leftPic===""?require('../../images/Vacancy.png'):leftPic} className="player" alt="" 
                            onClick={this.sitFun.bind(this,leftPic,roomId,'p1')}/>
                        <span className="table">
                            <img src={roomNumImg} alt=""/>
                        </span>
                        <img src={rightPic===""?require('../../images/Vacancy.png'):rightPic} className="player" alt="" 
                            onClick={this.sitFun.bind(this,rightPic,roomId,'p3')}/>

                        <img src={bottomPic===""?require('../../images/Vacancy.png'):bottomPic} className="player player-bottom" alt="" 
                            onClick={this.sitFun.bind(this,bottomPic,roomId,'p2')}/>
                    </li>
                );
            });
        }
    }


    exitHall(){
        socket.emit('exitHall',{userId:this.props.match.params.id});

    }

    intoRoom(){
        let roomData = {
            partyId : 'YH7403',
            playerSeat : 'left',
            roomId : 4
        }
        socket.emit('room',roomData)
        socket.on('room',(data)=>{
            console.log(data);
        })
    }

    render() {
        return (
            <div id="landlord-hall">
                <div className="header">
                    <div className="header-left">
                        <div className="head">
                            <img src={require('../../images/head.png')} alt="" />
                        </div>

                        <div className="userName">
                            fuyf
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
                        <img src={require('../../images/exit.png')} alt="" onClick={this.exitHall.bind(this)}/>
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
                                <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/one.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </li>
                            <li>
                                <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/two.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </li>
                            <li>
                                <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/three.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </li>
                            <li>
                                 <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/four.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </li>*/}

                        </ul>
                        <div className="fast-action" onClick={this.action.bind(this)}>
                            快速开始
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