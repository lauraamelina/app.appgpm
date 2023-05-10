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

async function updateUser(id, user) {
    return fetch(`${URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
}

async function updateAvatar(avatar) {
    return fetch(`${URL}/users/avatar`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: avatar
    }).then(response => response.json())
}

async function changePassword(antPassword, password, repeatPassword) {
    return fetch(`${URL}/users/password`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            antPassword,
            password,
            repeatPassword
        })
    }).then(response => response.json())
}

async function getAllUsers() {
    return fetch(`${URL}/users`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function deleteUser(id) {
    return fetch(`${URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function register(type, nit, name, rol, country, email, password) {
    return fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, nit, name, rol, country, email, password })
    }).then(response => response.json())
}



export {
    getUserById,
    getProductsByUser,
    getDemandsByUser,
    updateUser,
    updateAvatar,
    changePassword,
    getAllUsers,
    deleteUser,
    register

}
