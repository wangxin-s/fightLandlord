/**
 * Created by ex-shijinge on 2018/9/29.
 */
const hallState = {
    hallInfo:[],//大厅房间数据
    isGetHallInfo: true,
};
const hall=(state=hallState,action)=>{
    switch (action.type){
        case 'HALL_HANDLE':
            return {...state,...action.data};
        default:
            return state
    }
};
export default hall;