import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getSequences() {
    return fetch(`${URL}/sequences`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}


export {
    getSequences,
}
