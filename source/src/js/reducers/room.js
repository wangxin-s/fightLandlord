/**
 * Created by ex-wangxin on 2018/9/29.
 */
const roomState =sessionStorage.getItem('roomState')? JSON.parse(sessionStorage.getItem('roomState')):{
    bottomCard:[],//顶部中间的底牌
    myCard:[],//我的牌
    mySelectCard:{},//当前玩家选中的牌
    myCardOut:[],//已出的牌
    left:[],//左侧玩家的牌
    right:[],//右侧玩家的牌

    leftList:[],//左侧玩家出的牌
    rightList:[],//右侧玩家出的牌


    roomPlayerInfo: {
        roomId: '',
        leftPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready:'',
        },
        rightPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready:'',
        },
        bottomPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready:'',
        }
    },//当前房间玩家信息
};
const room=(state=roomState,action)=>{
    switch (action.type){
        case 'ROOM_HANDLE':
            sessionStorage.setItem('roomState',JSON.stringify({...state,...action.text}));
            return {...state,...action.text};
        default:
            return state
    }
};
export default room;