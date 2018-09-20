/**
 * Created by ex-fuyunfeng on 2018/9/20.
 */
const loginState = {
   token:'',
   userName:'',
   passworld:'',
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