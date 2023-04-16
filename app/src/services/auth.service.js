
async function login(email, password) {
    return fetch('https://api.appgpm.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
    .then(async res => {
        if(res.status === 200) {
            return res.json()
        } else if (res.status === 500) {
            return res.json('Error de autenticación: el correo o la contraseña son incorrectos')
        }
    })
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


export {
    login,
    logout,
    getUser,
    getUserId,
    setUser,
    getToken,
    setToken,
    deleteUser,
    deleteToken
}