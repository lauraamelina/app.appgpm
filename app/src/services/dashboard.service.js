import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getFobData() {
    return fetch(`${URL}/products_name`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function getInfoPerMonth() {
    return fetch(`${URL}/stats/charts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function getStats() {
    return fetch(`${URL}/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())

}

async function getContinents() {
    return fetch(`${URL}/market/continents`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function getCountries() {
    return fetch(`${URL}/market/countries`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

export {
    getFobData,
    getInfoPerMonth,
    getStats,
    getContinents,
    getCountries
}
