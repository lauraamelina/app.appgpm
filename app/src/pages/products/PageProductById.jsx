import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as ProductsService from '../../services/products.service'
import * as AuthService from '../../services/auth.service'
import Product from '../../components/products/Product'

export default function PageProductById() {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [isUserProduct, setIsUserProduct] = useState(false)
    const idUser = AuthService.getUserId();


    useEffect(() => {
        ProductsService.getProductById(id)
            .then((res) => {
                setProduct(res.data)
                console.log(res.data)
                if (res.data.vendedor_id === idUser) {
                    setIsUserProduct(true)
                } else {
                    setIsUserProduct(false)
                }
            })
            .catch((err) => {
                setProduct([])
            })
    }, [id, idUser])

    return (
        <main>
            <h1 className='visually-hidden'>Producto</h1>
            {product.length !== 0  ?
                <Product product={product} isUserProduct={isUserProduct} />
                :
                <div className='not-exist'>
                    <p>El producto no existe</p>
                    <Link to='/dashboard' className="btn btn-primary">Volver al Inicio</Link>
                </div>
            }
        </main>
    )
}