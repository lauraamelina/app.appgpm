import React, { useState, useEffect } from "react";
import * as ProductService from '../../services/products.service'
import CircularProgress from '@mui/material/CircularProgress';
import AllProducts from "../../components/operations/AllProducts";

export default function PageAllProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        ProductService.getAllProducts()
            .then((res) => {
                console.log(res)
                setProducts(res.data)
                setLoading(false)
            })
    }, [])

    return (
        <main className="container">
            <h1>Market Productos</h1>
            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }

            {!loading && products !== [] && (
                <AllProducts products={products} />
            )}
              

        </main>
    )
}