/**
 * Created by ex-wangxin on 2018/9/12.
 */
const aboutState = {
    type:'add',
    creatDate:'',
    index:'',
    title:'',
    content:'',
};
const about=(state=aboutState,action)=>{
    switch (action.type){
        case 'ABOUT_HANDLE':
            return {...state,...action.text};
        default:
            return state
    }
};
export default about;