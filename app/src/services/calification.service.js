import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getCalificationByUser() {
    return fetch(`${URL}/califications/${authService.getUserId()}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

export {
    getCalificationByUser,
}