/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux'

const socket = require('socket.io-client')('http://localhost:3001');
class HallMain extends React.Component {

    componentDidMount() {
        // socket.on('login',(data)=> {
        //     console.log(data)
        //     if(data.code==200) {
        //         alert('登陆成功')
        //         return;
        //     }else {
        //         alert(data.msg)
        //         return;
        //     }
        // })
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
                </div>
                <div className="container">
                    <div className="character-left">
                        <img src={require('../../images/character5.png')} alt=""/>
                    </div>
                    <div className="table-right">
                        <div className="table-right-top">
                            <div className="table-right-top-left">
                                <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/one.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </div>
                            
                            <div className="table-right-top-right table-right-top-left">
                                <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/two.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="table-right-bottom table-right-top">
                            <div className="table-right-top-left">
                                <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/three.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </div>
                            
                            <div className="table-right-top-right table-right-top-left">
                                <img src={require('../../images/player1.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/four.png")} alt=""/>
                                </span>
                                <img src={require('../../images/player2.png')} className="player" alt="" />
                                <span className="player-bottom">
                                </span>
                            </div>
                            <div className="clear"></div>
                            <div className="fast-action">
                                快速开始
                            </div>
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