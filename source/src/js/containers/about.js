/**
 * Created by ex-wangxin on 2018/9/11.
 */
import React from 'react';
import { connect } from 'react-redux'
import {aboutAllHandle} from '../actions/about'
class AboutMain extends React.Component {
    test(){
        console.log(this.props.about);
        console.log($('body'));
        this.props._aboutHandle({
            index:'new'
        });
    }

    render(){
        return(
            <div onClick={this.test.bind(this)}>
                这是about页面
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return {about:state.about}
};

const mapDispatchToProps =(dispatch)=>{
    return {
        _aboutHandle:(text)=>{
            dispatch(aboutAllHandle(text))
        }
    }
};

const About = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMain);

export default About