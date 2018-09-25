/**
 * Created by ex-wangxin on 2018/9/11.
 */
import React from 'react';
import { connect } from 'react-redux'
import Login from './login'
class IndexMain extends React.Component {
    test(){
        let a={name:'李白'};
        let b={age:'123'};
        console.log({...a,...b});
    }

    render(){
        if(!this.props.login.token) {
            return(
                <div className="h100">
                    <Login />
                </div>
            )
        }else {
            return(
                <div>
                    holle world
                    {this.test()}
                </div>
            )
        }
        
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

const Index = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexMain);
export default Index