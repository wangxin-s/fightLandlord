/**
 * Created by ex-wangxin on 2018/9/12.
 */
import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import about from './about';
import login from './login';
import room from './room';
const reducer=combineReducers({
    about,
    login,
    room,
    routing:routerReducer
});
export default reducer;