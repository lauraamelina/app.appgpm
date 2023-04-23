import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getTransactionsByUser() {
    return fetch(`${URL}/transactions`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function getTransactionById(id) {
    return fetch(`${URL}/transactions/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        }
    }).then(response => response.json())
}


export {
    getTransactionsByUser,
    getTransactionById,
}
