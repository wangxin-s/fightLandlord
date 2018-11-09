/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux'
import {loginAllHandle} from '../actions/login'
import {withRouter} from "react-router-dom";
import {hallHandle} from '../actions/hall';
const socket = require('socket.io-client')('http://localhost:3001');
class LoginMain extends React.Component {

    componentDidMount() {
        socket.on('login',(data)=> {
            console.log(data)
            if(data.code==200) {
                alert('登陆成功')
                this.props.history.push("/hall/"+data.data.party_id);
                this.props._hallHandle({
                    imgUrl: data.data.player_img,
                })
                //this.props.history.push("/hall/"+12);
                return;
            }else {
                alert(data.msg)
                return;
            }
        })
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
        },
        _hallHandle : (options)=>{
            dispatch(hallHandle(options))
        }
    }
};

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginMain);

export default withRouter(Login);