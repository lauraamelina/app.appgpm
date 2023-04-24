import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as ProductsService from '../../services/products.service'
import * as AuthService from '../../services/auth.service'
import ProductById from '../../components/products/ProductById'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress';

export default function PageProductById() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [isUserProduct, setIsUserProduct] = useState(false)
    const idUser = AuthService.getUserId();

    useEffect(() => {
        setLoading(true)
        ProductsService.getProductById(id)
            .then((res) => {
                setProduct(res.data)
                if (res.data.vendedor_id === idUser) {
                    setIsUserProduct(true)
                } else {
                    setIsUserProduct(false)
                }
                setLoading(false)
            })
            .catch((err) => {
                setProduct([])
                setLoading(false)
            })
    }, [id, idUser])

    const deleteProduct = () => {
        ProductsService.deleteProduct(id)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'El producto fue eliminado correctamente.',
                        showConfirmButton: false,
                        color: '#145388'
                    })
                    navigate('/dashboard/products/list')

                }
                else if (res.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'El producto no existe.',
                        showConfirmButton: false,
                    })
                    navigate('/dashboard/products/list')
                }

            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al eliminar el producto.',
                    showConfirmButton: false,
                })
                navigate('/dashboard/products/list')
            })
    }

    const buyProduct = (id, volumen) => {
        setLoading(true)
        ProductsService.buyProduct(id, volumen)
            .then((res) => {
                setLoading(false)
                if (res.status === 200) {
                    console.log(res)
                    Swal.fire({
                        icon: 'success',
                        title: 'El producto fue comprado correctamente.',
                        showConfirmButton: false,
                        color: '#145388'
                    })
                    navigate(`/dashboard/transactions/${res?.data?.id}`)
                }
                else if (res.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error al comprar el producto.',
                        showConfirmButton: false,
                    })
                }  
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <main>
            <h1 className='visually-hidden'>Producto</h1>
            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }
            {!loading && product.length !== 0 && (
                <ProductById product={product} isUserProduct={isUserProduct} deleteProduct={deleteProduct} buyProduct={buyProduct} />
            )}
            {!loading && product.length === 0 && (
                <div className='not-exist'>
                    <p>El producto no existe</p>
                    <Link to='/dashboard/products/new' className="btn btn-primary">Agregar Productos</Link>
                </div>
            )}
        </main>
    )
}