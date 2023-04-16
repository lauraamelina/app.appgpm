import SocketIo from "socket.io-client";

const URL = "http://localhost:";
const PORT = 3001

const socket = SocketIo(URL + PORT , {
        transports: ['websocket']

});

export default socket;