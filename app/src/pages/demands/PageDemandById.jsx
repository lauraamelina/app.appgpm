import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as DemandService from '../../services/demands.service'
import * as AuthService from '../../services/auth.service';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import DemandById from '../../components/demands/DemandById';

export default function PageDemandById() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [isUserProduct, setIsUserProduct] = useState(false)
    const idUser = AuthService.getUserId();

    useEffect(() => {
        setLoading(true)
        DemandService.getDemandById(id)
            .then((res) => {
                setProduct(res.data)
                if (res.data.user_id === idUser) {
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
        DemandService.deleteDemand(id)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'El bid fue eliminado correctamente.',
                        showConfirmButton: false,
                        color: '#145388'
                    })
                    navigate('/dashboard/operations/bids')

                }
                else if (res.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'El bid no existe.',
                        showConfirmButton: false,
                    })
                    navigate('/dashboard/operations/bids')
                } else if (res.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error al eliminar el bid.',
                        showConfirmButton: false,
                    })
                    navigate('/dashboard/operations/bids')
                }

            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al eliminar el bid.',
                    showConfirmButton: false,
                })
                navigate('/dashboard/operations/bids')
            })
    }

    const sellProduct = (id, volumen, price) => {
        setLoading(true)
        DemandService.sellDemand(id, volumen, price)
            .then((res) => {
                setLoading(false)
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'El bid fue vendido correctamente.',
                        showConfirmButton: false,
                        color: '#145388'
                    })
                    navigate(`/dashboard/transactions/${res?.data?.id}`)
                } else if (res.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error al vender el bid.',
                        showConfirmButton: false,
                    })
                }
            })
    }

    return (
        <main>
            <h1 className='visually-hidden'>Bid</h1>
            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }
            {!loading && product.length !== 0 && (
                <DemandById product={product} isUserProduct={isUserProduct} deleteProduct={deleteProduct} sellProduct={sellProduct} />
            )}
            {!loading && product.length === 0 && (
                <div className='not-exist'>
                    <p>El bid no existe</p>
                    <Link to='/dashboard/demands/new' className="btn btn-primary">Agregar Bid</Link>
                </div>
            )}
        </main>
    )
}