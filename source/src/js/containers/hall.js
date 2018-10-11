/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux'

const socket = require('socket.io-client')('http://localhost:3001');
class HallMain extends React.Component {

    componentDidMount() {        
        socket.emit('hall','');
        socket.on('hall',(data)=>{
            console.log(data);
        })
    }

    action() {
        this.props.history.push("/room");
    }

    intoRoom(){
        let roomData = {
            partyId : 'YH7403',
            roomId : 3
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
                            <li onClick={this.intoRoom.bind(this)}>
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
                            </li>
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
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const Hall = connect(
    mapStateToProps,
    mapDispatchToProps
)(HallMain);

export default Hall;