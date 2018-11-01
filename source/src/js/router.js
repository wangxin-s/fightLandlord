/**
 * Created by ex-wangxin on 2018/9/11.
 */
import React from 'react';
import ReactDom from 'react-dom';
require('./../css/index.scss');
require('./../css/config.scss');
import {Router, Route, Link, BrowserRouter} from 'react-router-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {createBrowserHistory, createHashHistory, createMemoryHistory} from 'history';
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducers/index';

import Index from './containers/index';
import ProductDetail from './containers/websocket';
import About from './containers/about';
import Login from './containers/login';
import Hall from './containers/hall';
import Room from './containers/room';
// const socket = require('socket.io-client')('http://localhost:3001');//{'reconnect':false,'auto connect':false}

// export default socket;
//redux 传入中间件
const store = createStore(Reducer, compose(
    applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
//路由生成规则, 与 redux 结合.
const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <BrowserRouter>
                <div className='h100'>
                    <Route exact path="/" component={Index}/>
                    <Route path="/about" component={About}/>
                    <Route path="/ProductDetail" component={ProductDetail}/>
                    <Route path="/login" component={Login}/>
                    {/* <Route path="/hall/:id" component={Hall}/> */}
                    <Route path="/hall" component={Hall}/>
                    <Route path="/room/:id" component={Room}/>
                </div>
            </BrowserRouter>
        </Router>
    </Provider>,
    document.getElementById('content')
);