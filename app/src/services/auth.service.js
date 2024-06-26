
async function login(email, password) {
    return fetch('https://api.appgpm.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(async res => {
            if (res.status === 200) {
                return res.json()
            } else if (res.status === 500) {
                return res.json('Error de autenticación: el correo o la contraseña son incorrectos')
            }
        })
}

async function freeEmailRegister(email) {
    return fetch('https://api.appgpm.com/free', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    }).then(response => response.json())
}

async function register(email, password, type, name, nit, country) {
    return fetch('https://api.appgpm.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, type, name, nit, country })
    }).then(response => response.json())
}

async function recuperationPassword(email) {
    return fetch('https://api.appgpm.com/change_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    }).then(response => response.json())
}

async function sendEmailVerification(id) {
    return fetch(`https://api.appgpm.com/verify/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
        },
    }).then(response => response.json())
}




function logout() {
    deleteUser()
    deleteToken()
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}

function getUserId() {
    return JSON.parse(localStorage.getItem('user')).id
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function getToken() {
    return JSON.parse(localStorage.getItem('token')).token;
}

function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
}

function deleteUser() {
    localStorage.removeItem('user')
}

function deleteToken() {
    localStorage.removeItem('token')
}

function isAuthenticated() {
    return !!localStorage.getItem('token')
}

async function uploadFileVerification(formData) {
    return fetch(`https://api.appgpm.com/verification`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
        },
        body: formData
    }).then(response => response.json())
}


export {
    login,
    logout,
    getUser,
    getUserId,
    setUser,
    getToken,
    setToken,
    deleteUser,
    deleteToken,
    freeEmailRegister,
    register,
    recuperationPassword,
    sendEmailVerification,
    isAuthenticated,
    uploadFileVerification
}