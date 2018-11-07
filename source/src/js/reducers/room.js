/**
 * Created by ex-wangxin on 2018/9/29.
 */
const roomState =sessionStorage.getItem('roomIndex')? JSON.parse(sessionStorage.getItem('roomIndex')):{
    topCard:[],//顶部中间的底牌
    myCard:[],//我的牌
    mySelectCard:{},//当前玩家选中的牌
    myCardOut:[],//已出的牌
    left:[],//左侧玩家的牌
    right:[],//右侧玩家的牌

    leftList:[],//左侧玩家出的牌
    rightList:[],//右侧玩家出的牌
    roomId:'',//roomId

    leftData:{
        id: '0',
        account: 'admin',
        isLogin: false,
        roomId: '1',
        locationSit: 'p1',
        password: '000000',
        headImg: 'https://pic.qqtn.com/up/2017-9/15063376742826581.jpg',
        //ready--准备按钮  readyEd--已准备  robAndNo--抢·不抢  rob--抢地主  noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出  hasDisCard--已出牌
        isReady:'ready',
        card:[],//当前未出的牌
        outCard:[],//已出的牌
        beanNum:'100',//豆子数量
        cardNum:'17',//还有多少张牌
        playType:'landlord',//Landlord 地主  farmer 农民
    },//左侧玩家数据
    rightData:{
        id: '1',
        account: 'admin',
        isLogin: false,
        roomId: '1',
        locationSit: 'p2',
        password: '000000',
        headImg: 'https://pic.qqtn.com/up/2017-9/15063376742826581.jpg',
        //ready--准备按钮  readyEd--已准备  robAndNo--抢·不抢  rob--抢地主  noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出  hasDisCard--已出牌
        isReady:'ready',
        card:[],//当前未出的牌
        outCard:[],//已出的牌
        beanNum:'100',//豆子数量
        cardNum:'17',//还有多少张牌
        playType:'landlord',//Landlord 地主  farmer 农民
    },//右侧玩家数据
    bottomData:{
        id: '2',
        account: 'admin',
        isLogin: false,
        roomId: '1',
        locationSit: 'p3',
        password: '000000',
        headImg: 'https://pic.qqtn.com/up/2017-9/15063376742826581.jpg',
        //ready--准备按钮  readyEd--已准备  robAndNo--抢·不抢  rob--抢地主  noRob--不抢  discardOrNo--出牌·不出  discard--出牌  noDiscard--不出  hasDisCard--已出牌
        isReady:'ready',
        card:[],//当前未出的牌
        outCard:[],//已出的牌
        beanNum:'100',//豆子数量
        cardNum:'17',//还有多少张牌
        playType:'landlord',//Landlord 地主  farmer 农民
    }//当前玩家数据
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