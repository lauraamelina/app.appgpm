import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ProductsService from '../../services/products.service'
import CardProducts from "../../components/products/productsByUser/CardProducts";
import CircularProgress from '@mui/material/CircularProgress';



export default function PageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        ProductsService.getProductsByUser()
            .then((data) => {
                setLoading(false);
                if (data?.data?.length !== 0) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <main className="container productsByUser">
            <div className="header">
                <h1>Mis productos</h1>
                <Link to='/dashboard/products/new' className="btn btn-primary">Agregar productos</Link>
            </div>

            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }
            {!loading && products.length !== 0 && (
                <CardProducts products={products} />
            )}
            {!loading && products.length === 0 && (
                <div className='not-exist'>
                    <p>No has publicado productos...</p>
                    <Link to='/dashboard/products/new' className="btn btn-primary">Agregar Productos</Link>
                </div>
            )}
        </main>
    );
}
