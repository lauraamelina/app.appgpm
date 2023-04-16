import React from "react";
import * as ProductsService from '../services/products.service'
import * as AuthService from '../services/auth.service'

export default function PageProducts() {
    const [products, setProducts] = React.useState([]);
    const userId = AuthService.getUserId()

    React.useEffect(() => {
        ProductsService.getProductsById(userId)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);


    return (
        <main className="container">
            <h1>Mis productos</h1>




        </main>
    );
}
