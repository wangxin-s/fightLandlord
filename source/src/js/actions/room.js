/**
 * Created by ex-wangxin on 2018/9/29.
 */
export const room_handle='ROOM_HANDLE';
// const socket = require('socket.io-client')('http://localhost:3001');

export function roomHandle(text){
    return {
        type:room_handle,
        text
    }
}
export function getCard(options){
    return dispatch=>{
        socket.on('news', (data) => {
            console.log(data);
        });
    }
}
