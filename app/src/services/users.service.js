import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getUserById(id) {
    return fetch(`${URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getProductsByUser(id) {
    return fetch(`${URL}/users/${id}/products`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getDemandsByUser(id) {
    return fetch(`${URL}/demands/byUser/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}


export {
    getUserById,
    getProductsByUser,
    getDemandsByUser

}
