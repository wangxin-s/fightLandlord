/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
const loginState = {
   token:'',
   userName:'',
   passworld:'',
   isShow_dialog:false,//登陆弹窗dialog 是否显示
};
const login=(state=loginState,action)=>{
    switch (action.type){
        case 'LOGIN_HANDLE':
            return {...state,...action.options};
        default:
            return state
    }
};
export default login;