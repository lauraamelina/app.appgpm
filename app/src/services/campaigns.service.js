import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getCampaigns() {
    return fetch(`${URL}/campaigns`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function createCampaign(name, description) {
    return fetch(`${URL}/campaigns`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, description})
    }).then(response => response.json())
}

async function updateCampaign(id, name, description) {
    return fetch(`${URL}/campaigns/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, description})
    }).then(response => response.json())
}

async function deleteCampaign(id) {
    return fetch(`${URL}/campaigns/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

export {
    getCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
}
