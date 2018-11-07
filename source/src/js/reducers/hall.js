/**
 * Created by ex-shijinge on 2018/9/29.
 */
const hallState = sessionStorage.getItem('hallStateIndex')? JSON.parse(sessionStorage.getItem('hallStateIndex')):{
    hallInfo:[],//大厅数据
};
const hall=(state=hallState,action)=>{
    switch (action.type){
        case 'HALL_HANDLE':
            sessionStorage.setItem('hallStateIndex',JSON.stringify({...state,...action.data}));
            return {...state,...action.data};
        default:
            return state
    }
};
export default hall;