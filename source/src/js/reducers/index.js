/**
 * Created by ex-wangxin on 2018/9/12.
 */
import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import about from './about';
import login from './login';
const reducer=combineReducers({
    about,
    login,
    routing:routerReducer
});
export default reducer;