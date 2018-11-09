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
        landlordCard: [],//地主牌数据源
        status: 'ready',//房间内当前进行到哪一步 状态
        subStatus:'',//子状态=> 抢地主
        is_playLandlord:[],//谁是地主
        playerLandlordNum:0,//叫地主 抢地主次数
        leftPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',//当前玩家的位置  进入大厅赋值 返回给前端缓存
            is_ready:'',//当前玩家是否准备
            cardData: [],//当前玩家  卡牌数据源
            is_is_playLandlord1:'false',//谁在抢地主
            isPlayLandlordTitle: '',//存储当前玩家是否叫地主 仅给前端做页面展示
            playCard:'false',//当前是谁在出牌
            showOutCardIcon: [],//当前玩家  上一轮出牌操作 (已出的牌||不出) Icon 用作前端展示
            showOutCardVal: [],//当前玩家  上一轮出牌操作 (已出的牌||不出) Val  用作比牌
        },
        rightPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready:'',
            cardData: [],//当前玩家  卡牌数据源
            is_is_playLandlord1:'false',//谁在抢地主
            isPlayLandlordTitle: '',
            playCard:'false',
            showOutCardIcon: [],
            showOutCardVal: [],
        },
        bottomPlayer: {
            id: '',
            account: '',
            password: '',
            headImg: '',
            creation_date: '',
            seat: '',
            is_ready:'',
            cardData: [],//当前玩家  卡牌数据源
            is_is_playLandlord1:'false',//谁在抢地主
            isPlayLandlordTitle: '',
            playCard:'false',
            showOutCardIcon: [],
            showOutCardVal: [],
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