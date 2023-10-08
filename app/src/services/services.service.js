import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getStatsServices() {
    return fetch(`${URL}/services/stats`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getEnterprises(id) {
    return fetch(`${URL}/services/type/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function createService(formData) {
    return fetch(`${URL}/services`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: formData
    }).then(response => response.json())

}

async function contactEnterpriseByService(id, formData) {
    return fetch(`${URL}/services/contact/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: formData
    }).then(response => response.json())
}

export {
    getStatsServices,
    getEnterprises,
    createService,
    contactEnterpriseByService
}
