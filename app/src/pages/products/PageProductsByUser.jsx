import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ProductsService from '../../services/products.service'
import CardProducts from "../../components/products/productsByUser/CardProducts";


export default function PageProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductsService.getProductsByUser()
            .then((data) => {
                console.log(data)
                if (data?.data?.length !== 0) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <main className="container productsByUser">
            <div className="header">
                <h1>Mis productos</h1>
                <button className="btn btn-primary">Agregar productos</button>
            </div>

            {products.length !== 0 ?
                <CardProducts products={products} />
                :
                <div className='not-exist'>
                    <p>No has publicado productos...</p>
                    <Link to='/dashboard' className="btn btn-primary">Agregar Productos</Link>
                </div>
            }
        </main>
    );
}
