/**
 * Created by ex-wangxin on 2018/9/12.
 */
import React from 'react';
const socket = require('socket.io-client')('http://localhost:3001');

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
    }

    webTest(){
        socket.emit('news', '发送消息');
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
            </div>
        );
    }
}

export default ProductDetail;