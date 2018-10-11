/**
 * Created by ex-wangxin on 2018/9/29.
 */
const roomState =sessionStorage.getItem('roomIndex')? JSON.parse(sessionStorage.getItem('roomIndex')):{
    bottomCard:[],//顶部中间的底牌
    myCard:[],//我的牌
    mySelectCard:[],//当前玩家选中的牌
    left:[],//左侧玩家的牌
    right:[],//右侧玩家的牌

    leftList:[],//左侧玩家出的牌
    rightList:[],//右侧玩家出的牌
};
const room=(state=roomState,action)=>{
    switch (action.type){
        case 'ROOM_HANDLE':
            sessionStorage.setItem('roomIndex',JSON.stringify({...state,...action.text}));
            return {...state,...action.text};
        default:
            return state
    }
};
export default room;