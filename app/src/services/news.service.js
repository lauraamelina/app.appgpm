import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getAllNews() {
    return fetch(`${URL}/news`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function getNewById(id) {
    return fetch(`${URL}/news/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function addComment(id, comentarios) {
    return fetch(`${URL}/news/${id}/comments`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({comentarios})
    }).then(response => response.json())
}

async function deleteLike(id) {
    return fetch(`${URL}/news/${id}/interactions`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
        },
    }).then(response => response.json())
}

async function addLike(id) {
    return fetch(`${URL}/news/${id}/interactions`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authService.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id: id,
            type: 1
        })
    }).then(response => response.json())

}

    


export {
    getAllNews,
    getNewById,
    addComment,
    deleteLike,
    addLike
}
