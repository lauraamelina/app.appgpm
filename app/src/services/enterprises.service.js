import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getAllEnterprises() {
    return fetch(`${URL}/enterprises`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getEnterpriseById(id) {
    return fetch(`${URL}/enterprises/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function createEnterprise(formData) {
    return fetch(`${URL}/enterprises`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: formData
    }).then(response => response.json())

}

async function deleteEnterprise(id) {
    return fetch(`${URL}/enterprises/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function updateEnterprise(id, formData) {
    return fetch(`${URL}/enterprises/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: formData
    }).then(response => response.json())
}


export {
    getAllEnterprises,
    getEnterpriseById,
    createEnterprise,
    deleteEnterprise,
    updateEnterprise,
}