/**
 * Created by ex-wangxin on 2018/9/12.
 */
import React from 'react';
// const socket = require('socket.io-client')('http://localhost:3001');

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    componentDidMount() {
        socket.on('news', (data) => {
            console.log(data);
            this.setState({
                count:this.state.count+1
            })
        });
        socket.on('add user', (data) => {
            console.log(data)
        });
        socket.on('new message', (data) => {
            console.log(data)
        });
        socket.on('dealCards',(data)=>{
            console.log(data);
        })
        socket.on('typeJudge',(data)=>{
            console.log(data);
        })
        socket.on('palyCard',(data)=>{
            console.log(data);
        })
    }

    webTest(){
        socket.emit('news', '发送消息');
    }

    dealCards(){
        let data = {
            room_id : 1
        }
        socket.emit('dealCards',data);
    }

    typeJudgeFun(){
        let data = [
            {icon: 'k3.jpg', type: '4', val: 4},
            {icon: 'k4.jpg', type: '4', val: 4},
            {icon: 'k4.jpg', type: '4', val: 4},
        ]
        socket.emit('typeJudge',data);
    }

    palyCardFun(){
        let data = [
            {icon: 'k3.jpg', type: '4', val: 4},
            {icon: 'k4.jpg', type: '4', val: 4},
            {icon: 'k4.jpg', type: '4', val: 4},
        ]
        socket.emit('palyCard',data);
    }
    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
    }

    render() {
        return (
            <div>
                <div>
                    Count: <strong>{this.state.count}</strong>
                </div>
                <button onClick={this.webTest.bind(this)}>发送信息</button>
                {/*<Websocket url='ws://localhost:3000/live/product.json'
                           onMessage={this.handleData.bind(this)}/>*/}
                <button onClick={this.dealCards.bind(this)}>发牌</button>
                <button onClick={this.typeJudgeFun.bind(this)}>判断牌型</button>
                <button onClick={this.palyCardFun.bind(this)}>出牌</button>
            </div>
        );
    }
}

export default ProductDetail;