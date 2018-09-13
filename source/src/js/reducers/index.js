/**
 * Created by ex-wangxin on 2018/9/12.
 */
import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import about from './about';
const reducer=combineReducers({
    about,
    routing:routerReducer
});
export default reducer;