/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux';

import {hallHandle} from '../actions/hall';

const socket = require('socket.io-client')('http://localhost:3001');
class HallMain extends React.Component {
    // constructor(props) {
    //     super(props);
        
    //     this.state={
    //         hallInfo:[],//房间信息
    //     }
    // }
    componentDidMount() {
        socket.emit('getHallInfo', {});
        socket.on('getHallInfo',(data)=>{
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

    action() {
        this.props.history.push("/room");
    }


    sitFun(param,data,sit){
        if(param!==""){
            alert('此位置已有人');
        }else{
            socket.emit('sit',{id:data.roomId,roomNum:1,location:sit,userId:this.props.match.params.id});
        }
    }
    showHall(data){
        if(data.length>0){
            return data.map((val,i)=>{
                console.log(val);
                let leftPic='',rightPic='',bottomPic="";
                if(val.leftSit!==''){
                    leftPic=JSON.parse(val.leftSit).headImg;
                }else{
                    leftPic='';
                }
                if(val.rightSit!==''){
                    rightPic=JSON.parse(val.rightSit).headImg;
                }else{
                    rightPic='';
                }
                if(val.bottomSit!==''){
                    bottomPic=JSON.parse(val.bottomSit).headImg;
                }else{
                    bottomPic='';
                }

                if(leftPic!=="" && rightPic!=="" && bottomPic!==''){
                    
                    let id=Number(this.props.match.params.id);
                    if(id===JSON.parse(val.leftSit).id||id===JSON.parse(val.rightSit).id||id===JSON.parse(val.bottomSit).id){
                        this.props.history.push("/room");
                    }
                    
                }

                let roomNumImg=require('../../images/room'+(i+1)+'.png');
                
                return(

                    <li key={i}>
                        <img src={leftPic===""?require('../../images/Vacancy.png'):leftPic} className="player" alt="" 
                            onClick={this.sitFun.bind(this,leftPic,val,'p1')}/>
                        <span className="table">
                            <img src={roomNumImg} alt=""/>
                        </span>
                        <img src={rightPic===""?require('../../images/Vacancy.png'):rightPic} className="player" alt="" 
                            onClick={this.sitFun.bind(this,rightPic,val,'p3')}/>

                        <img src={bottomPic===""?require('../../images/Vacancy.png'):bottomPic} className="player player-bottom" alt="" 
                            onClick={this.sitFun.bind(this,bottomPic,val,'p2')}/>
                    </li>
                );
            });
        }
    }


    exitHall(){
        socket.emit('exitHall',{userId:this.props.match.params.id});

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