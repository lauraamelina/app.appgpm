import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getAllDocuments() {
    return fetch(`${URL}/verification`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function verifyDocument(id) {
    return fetch(`${URL}/verification/${id}/submit`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

export {
    getAllDocuments,
    verifyDocument,
}

