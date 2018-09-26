/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
import React from 'react';
import { connect } from 'react-redux'

const socket = require('socket.io-client')('http://localhost:3001');
class RoomMain extends React.Component {

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
            <div id="landlord-room">
                
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

const Room = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomMain);

export default Room;