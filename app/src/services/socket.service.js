import io from "socket.io-client";
import { Observable } from 'rxjs';

const socket = io("https://api.appgpm.com");


function listen(event) {
  return new Observable((observer) => {
    socket.on(event, (data) => {
      observer.next(data);
    });
  });
}

function emit(event, data) {
  socket.emit(event, data);
}

function removeAllListeners() {
  socket.removeAllListeners();
}



export {
  listen,
  emit,
  removeAllListeners
}

