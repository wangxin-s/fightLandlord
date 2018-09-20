/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux'
// import {aboutAllHandle} from '../actions/about'
class LoginMain extends React.Component {
    test(){
        
    }

    render(){
        return(
            <div>
                login
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return state;
};

const mapDispatchToProps =(dispatch)=>{
    return {
        _aboutHandle:(options)=>{
            dispatch(aboutAllHandle(text))
        }
    }
};

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginMain);

export default Login;