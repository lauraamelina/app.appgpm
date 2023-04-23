import React, { useState, useEffect } from "react";
import * as ProductService from '../../services/products.service'
import CircularProgress from '@mui/material/CircularProgress';
import AllProducts from "../../components/operations/AllProducts";
import { Link } from "react-router-dom";

export default function PageAllProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        ProductService.getAllProducts()
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
    }, [])

    return (
        <main className="container">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="mb-0">Market Productos</h1>
                <Link to="/dashboard/products/new" className="btn btn-primary">Agregar nuevo producto</Link>
            </div>

            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }

            {!loading && products !== [] && (
                <AllProducts products={products} />
            )}

            {!loading && products.length === 0 && (
                <div className="not-exist">
                    <p>No hay productos</p>
                    <Link to="/dashboard/products/new" className="btn btn-primary">Agregar nuevo producto</Link>
                </div>
            )}


        </main>
    )
}