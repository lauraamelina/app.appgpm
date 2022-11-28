
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
        } else {
            throw new Error('Error de autenticación: el correo o la contraseña son incorrectos')
        }
    })
}

export {
    login
}