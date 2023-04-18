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

async function getProductsName() {
    return fetch(`${URL}/products_name`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function getCountries() {
    return fetch(`${URL}/countries`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function getIncoterms() {
    return fetch(`${URL}/incoterms`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function addProduct(formData) {
    console.log(formData)

    return fetch(`${URL}/products`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'multipart/form-data;',
            'Content-Disposition': 'form-data; name="name"'

        },
        body: formData
    }).then(response => response.json())
}


export {
    getProductsByUser,
    getProductById,
    getProductsName,
    getCountries,
    getIncoterms,
    addProduct,
}
