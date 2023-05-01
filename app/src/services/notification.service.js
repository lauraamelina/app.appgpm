import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getNotifications() {
    return fetch(`${URL}/notifications`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}


export {
    getNotifications,
}
