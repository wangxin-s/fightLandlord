
import React from 'react';
import { connect } from 'react-redux'
import {loginAllHandle} from '../actions/login'
import {withRouter} from "react-router-dom";
//import socket from '../units/socket';
var socket = require('socket.io-client')('http://localhost:3001');

class LoginMain extends React.Component {

    componentDidMount() {
        var map, geolocation;
        var map = new AMap.Map('container', {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    onComplete(result)
                }else{
                    onError(result)
                }
            });
        });
        //解析定位结果
        function onComplete(data) {
            var str = [];
            console.log('定位成功',data);
            console.log('定位结果：' + data.position);
            console.log('定位类别：' + data.location_type);
            if(data.accuracy){
                console.log('精度：' + data.accuracy + ' 米');
            }//如为IP精确定位结果则没有精度信息
            console.log('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        }
        //解析定位错误信息
        function onError(data) {
            console.log('定位失败');
            console.log('失败原因排查信息',data.message);
        }
        socket.on('login',(data)=> {
            console.log(data);
            if(data.code==200) {
                alert('登陆成功');
                this.props._loginAllHandle({
                    id: data.data.id,
                });
                this.props.history.push("/hall/"+data.data.id);
                return;
            }else {
                alert(data.msg);
                return;
            }
        })
    }

    //生命周期销毁方法
    componentWillUnmount() {
        socket.removeAllListeners('login');
    }

    //点击 开始游戏
    actionBtn() {
        this.props._loginAllHandle({
            isShow_dialog: true,
        })
    }
    //点击关闭按钮
    closeDialog() {
        this.props._loginAllHandle({
            isShow_dialog: false,
        })
    }
    //点击登陆按钮
    loginBtn() {
        let loginData = {
            account:this.props.login.account,
            password: this.props.login.password
        }
        socket.emit('login', loginData);
    }
    // 账号密码填写
    inputChange(type,name,event) {
        let obj = [];
        if (type == '1') {//1 直接取 event 0 取event.target.value
            obj[name] = event;
        } else {
            obj[name] = event.target.value;
        }
        this.props._loginAllHandle(obj);
    }

    render() {
        return (
            <div id='landlord-login'>
                
                {this.props.login.isShow_dialog?
                    <div className='login-dialog'>
                        <div className='login-dialog-body'>
                            <div className='mt10'>
                                <img src={require('../../images/account.png')} alt="" />
                                <input type="text" onChange={this.inputChange.bind(this,0,'account')} />
                            </div>
                            <div className='mt20'>
                                <img src={require('../../images/password.png')} alt="" />
                                <input type="password" onChange={this.inputChange.bind(this,0,'password')} />
                            </div>
                            <div className='login-btn mt30' onClick={()=> this.loginBtn()}>
                                <img src={require('../../images/login-btn.png')} alt="" />
                            </div>
                        </div>
                        <div className='login-dialog-close mt10' onClick={()=> this.closeDialog()}>
                            <img src={require('../../images/close.png')} alt="" />
                        </div>
                    </div>
                    :
                    <div className='action-btn' onClick={()=> this.actionBtn()}>
                        <img src={require('../../images/action-btn.png')} alt="" />
                    </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        _loginAllHandle: (options) => {
            dispatch(loginAllHandle(options))
        }
    }
};

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginMain);

export default withRouter(Login);