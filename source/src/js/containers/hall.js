/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { loginAllHandle } from '../actions/login'
import { hallHandle } from '../actions/hall';
import { socket, getHallInfoObject, goRoomObject } from '../units/socketListen';


// 获取大厅房间最新实时数据
class HallMain extends React.Component {
    componentDidMount() {
        socket.emit('getHallInfo', {});
        getHallInfoObject.callBack = (data) => {
            this.props._hallHandle({
                hallInfo: data.data,
                isGetHallInfo: false
            });
        }
    }

    componentWillUnmount() {

    }
    // 大厅房间展示
    showHall(data) {
        if (data.length > 0) {
            return data.map((item, index) => {
                return (
                    <li key={index}>
                        <img
                            src={item.leftPlayer.id ? require("../../images/" + item.leftPlayer.headImg + ".png") : require('../../images/Vacancy.png')}
                            onClick={this.goRoom.bind(this, item.roomId, 'leftPlayer', item.leftPlayer.id)}
                            className="player" alt="" />

                        <span className="table">
                            <span style={{ "fontSize": ".5rem" }}>{item.roomId}</span>
                        </span>

                        <img
                            src={item.rightPlayer.id ? require("../../images/" + item.rightPlayer.headImg + ".png") : require('../../images/Vacancy.png')}
                            onClick={this.goRoom.bind(this, item.roomId, 'rightPlayer', item.rightPlayer.id)}
                            className="player" alt="" />

                        <img
                            src={item.bottomPlayer.id ? require("../../images/" + item.bottomPlayer.headImg + ".png") : require('../../images/Vacancy.png')}
                            onClick={this.goRoom.bind(this, item.roomId, 'bottomPlayer', item.bottomPlayer.id)}
                            className="player-bottom">
                        </img>
                    </li>
                );
            });
        }
    }

    // 玩家点击进入房间
    goRoom(roomId, seat, is_player) {
        if (is_player) {
            alert("当前位置已经有其他玩家了 换个位置试试")
            return;
        }
        // 申请进入房间发送给后端
        socket.emit('goRoom', {
            roomId,//房间号
            seat,//位置
            userInfo: this.props.login.userInfo,//玩家信息
        });

        // goRoom请求  后端返回回调
        goRoomObject.callBack = (data) => {
            if (data.code == 200) {
                this.props._loginAllHandle({
                    userInfo: data.data
                })
                this.props.history.push("/room/" + roomId);
            } else {
                alert(data.msg)
                return;
            }
            return;
        }
    }



    render() {
        let userInfo = this.props.login.userInfo;
        return (
            <div id="landlord-hall">
                <div className="header">
                    <div className="header-left">
                        <div className="head">
                            <img src={require("../../images/" + userInfo.headImg + ".png")} alt="" />
                        </div>

                        <div className="userName">
                            {userInfo.account}
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
                        <img src={require('../../images/character5.png')} alt="" />
                    </div>
                    <div className="table-right">
                        <ul className="table-list clearfix">

                            {this.showHall(this.props.hall.hallInfo)}

                            {/* <li onClick={this.intoRoom.bind(this)}>
                                <img src={require('../../images/Vacancy.png')} className="player" alt="" />
                                <span className="table">
                                    <img src={require("../../images/room1.png")} alt="" />
                                </span>
                                <img src={require('../../images/Vacancy.png')} className="player" alt="" />
                                <img src={require('../../images/Vacancy.png')} className="player-bottom">
                                </img>
                            </li> */}

                        </ul>
                        <div className="fast-action">
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
        _hallHandle: (options) => {
            dispatch(hallHandle(options))
        },
        _loginAllHandle: (options) => {
            dispatch(loginAllHandle(options))
        }
    }
};

const Hall = connect(
    mapStateToProps,
    mapDispatchToProps
)(HallMain);

export default withRouter(Hall);