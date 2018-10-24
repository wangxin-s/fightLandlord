/**
 * Created by ex-wangxin on 2018/9/12.*/

export const hall_handle='HALL_HANDLE';

 export function hallHandle(data){
    return {
        type:hall_handle,
        data
    }
 }