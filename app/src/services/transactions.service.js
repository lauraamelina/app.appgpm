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

async function finishOperation(id) {
    return fetch(`${URL}/transactions/${id}/solicitud`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        }
    }).then(response => response.json())
}

async function getSequences(id) {
    return fetch(`${URL}/transactions/${id}/sequences`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        }
    }).then(response => response.json())
}

async function addSequence(id, secuencia_id, ubicacion, descripcion) {
    return fetch(`${URL}/transactions/${id}/sequences`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secuencia_id,
            ubicacion,
            descripcion,
        })
    }).then(response => response.json())
}

async function uploadFile(id, formData) {
    return fetch(`${URL}/transactions/${id}/documents`, {
        method: 'POST', 
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: formData
    }).then(response => response.json())
}

async function getFiles(id) {
    return fetch(`${URL}/transactions/${id}/documents`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        }
    }).then(response => response.json())
}

async function calificateTransaction(id,fd) {
    return fetch(`${URL}/transactions/${id}/calificacion`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: fd
    }).then(response => response.json())
}

export {
    getTransactionsByUser,
    getTransactionById,
    finishOperation,
    getSequences,
    addSequence,
    uploadFile,
    getFiles,
    calificateTransaction
}
