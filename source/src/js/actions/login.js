/**
 * Created by ex-fuyunfeng on 2018/9/20.*/

 export const login_handle='LOGIN_HANDLE';

 export function loginAllHandle(options){
    return {
        type:login_handle,
        options
    }
 }