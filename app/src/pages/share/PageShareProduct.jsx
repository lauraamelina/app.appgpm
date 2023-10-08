import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as ProductsService from '../../services/products.service'
import ProductByIdShare from '../../components/products/ProductByIdShare'
import CircularProgress from '@mui/material/CircularProgress';
import Header from './layouts/Header'

export default function PageShareProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        ProductsService.getProductByIdShare(id)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setProduct([])
                setLoading(false)
            })
    }, [id])


    return (
        <>
            <Header />
            <main>
                <h1 className='visually-hidden'>Producto</h1>
                {loading &&
                    <div className="text-center">
                        <CircularProgress />
                    </div>
                }
                {!loading && product.length !== 0 && (
                    <ProductByIdShare product={product} />
                )}
                {!loading && product.length === 0 && (
                    <div className='not-exist'>
                        <p>El producto no existe</p>
                    </div>
                )}
            </main>
        </>

    )
}