
/*const socket = require('socket.io-client')('http://localhost:3001');
export default socket;*/
import openSocket from 'socket.io-client';
let  socket = openSocket('http://localhost:3001');
export function socket_emit(router,obj){
    socket.emit(router,obj);
}
export function socket_on(router,fun){
    socket.on(router,fun);
}