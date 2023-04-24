const URL = "https://api.appgpm.com";

async function getCountries() {
    return fetch(`${URL}/countries`, {
        method: 'GET',
    }).then(response => response.json())
}


export {
    getCountries,
}
