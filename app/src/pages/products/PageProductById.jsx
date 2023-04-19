import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as ProductsService from '../../services/products.service'
import * as AuthService from '../../services/auth.service'
import Product from '../../components/products/Product'
import Swal from 'sweetalert2'


export default function PageProductById() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [isUserProduct, setIsUserProduct] = useState(false)
    const idUser = AuthService.getUserId();

    useEffect(() => {
        ProductsService.getProductById(id)
            .then((res) => {
                setProduct(res.data)
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


    return (
        <main>
            <h1 className='visually-hidden'>Producto</h1>
            {product.length !== 0  ?
                <Product product={product} isUserProduct={isUserProduct} deleteProduct={deleteProduct}/>
                :
                <div className='not-exist'>
                    <p>El producto no existe</p>
                    <Link to='/dashboard' className="btn btn-primary">Volver al Inicio</Link>
                </div>
            }
        </main>
    )
}