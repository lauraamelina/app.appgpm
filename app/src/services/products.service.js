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

async function getProductByIdShare(id) {
    return fetch(`${URL}/products/share/${id}`, {
        method: 'GET',
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

async function getIncoterms() {
    return fetch(`${URL}/incoterms`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken()
        },
    }).then(response => response.json())
}

async function addProduct(formData) {
    return fetch(`${URL}/products/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
        body: formData
    }).then(response => response.json())
}

async function deleteProduct(id) {
    return fetch(`${URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getAllProducts() {
    return fetch(`${URL}/products/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function buyProduct(id, volumen) {
    return fetch(`${URL}/products/${id}/buy`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ volumen })
    }).then(response => response.json())
}

export {
    getProductsByUser,
    getProductById,
    getProductByIdShare,
    getProductsName,
    getIncoterms,
    addProduct,
    deleteProduct,
    getAllProducts,
    buyProduct,
}
