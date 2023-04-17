import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getProductsByUser() {
    return fetch(`${URL}/products/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function getProductById(id) {
    return fetch(`${URL}/products/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}


export {
    getProductsByUser,
    getProductById
}
