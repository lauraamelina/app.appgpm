import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getAllDemands() {
    return fetch(`${URL}/demands`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function addDemand(formData) {
    return fetch(`${URL}/demands`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: formData
    }).then(response => response.json())
}

async function getDemandById(id) {
    return fetch(`${URL}/demands/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function deleteDemand(id) {
    return fetch(`${URL}/demands/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function sellDemand(id, volumen, precio) {
    return fetch(`${URL}/demands/${id}/sell`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ volumen, precio })
    }).then(response => response.json())
}



export {
    getAllDemands,
    addDemand,
    getDemandById,
    deleteDemand,
    sellDemand

}
