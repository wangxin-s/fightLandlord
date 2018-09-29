/**
 * Created by ex-wangxin on 2018/9/29.
 */
export const room_handle='ROOM_HANDLE';

export function roomHandle(text){
    return {
        type:room_handle,
        text
    }
}