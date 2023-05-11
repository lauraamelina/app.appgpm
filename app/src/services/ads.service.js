import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getAdsRandom() {
    return fetch(`${URL}/ads/random`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getAds() {
    return fetch(`${URL}/ads`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getAdById (idCampaign, idAd) {
    return fetch(`${URL}/campaigns/${idCampaign}/ads/${idAd}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function approveAd(id) {
    return fetch(`${URL}/ads/approved/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

export {
    getAdsRandom,
    getAds,
    getAdById,
    approveAd,

}
