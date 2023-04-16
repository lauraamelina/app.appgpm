import * as authService from './auth.service'
const URL = "https://api.appgpm.com";

async function getProductsById() {
    return fetch (`${URL}/products/`, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + authService.getToken()
      },
      }).then(response => response.json())
}


export {
    getProductsById,
}
