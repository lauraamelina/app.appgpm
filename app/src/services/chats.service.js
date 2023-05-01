import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getChats() {
    return fetch(`${URL}/chats`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}
async function getChat(id) {
    return fetch(`${URL}/chats/conversation/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function sendMessage(id, content) {
    return fetch(`${URL}/chats/send/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: content
        })
    }).then(response => response.json())
}

async function viewed(id) {
    return fetch(`${URL}/chats/viewed/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    })
}

async function getChatsCount() {
    return fetch(`${URL}/chats/count`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}


export {
    getChats,
    getChat,
    sendMessage,
    viewed,
    getChatsCount
}
