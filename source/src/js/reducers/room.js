/**
 * Created by ex-wangxin on 2018/9/29.
 */
const roomState =sessionStorage.getItem('roomIndex')? sessionStorage.getItem('roomIndex'):{
    bottomCard:[],//顶部中间的底牌
    myCard:[],//我的牌
};
const room=(state=roomState,action)=>{
    switch (action.type){
        case 'ROOM_HANDLE':
            sessionStorage.setItem('roomIndex',JSON.stringify({...state,...action.options}));
            return {...state,...action.options};
        default:
            return state
    }
};
export default room;