import React, { useEffect, useState } from 'react'
import DemandNewForm from '../../components/demands/DemandNewForm'
import * as ProductService from '../../services/products.service'
import * as DemandsService from '../../services/demands.service'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
    
export default function PageNewDemand() {
    const navigate = useNavigate();

    const [dataNombreProductos, setDataNombreProductos] = useState("");
    const [dataCountries, setDataCountries] = useState("");
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        ProductService.getProductsName().then((data) => {
            setDataNombreProductos(data);
        });

        ProductService.getCountries().then((data) => {
            setDataCountries(data);
        });

    }, [setDataNombreProductos, setDataCountries])

    function onSubmit(fd) {
        setLoading(true)
        DemandsService.addDemand(fd)
            .then((data) => {
                setLoading(false)
                if (data?.status === 200) {
                    navigate('/dashboard/operations/bids');
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo agregar el bid, intente nuevamente más tarde.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#145388',
                    })
                }
            })
    }

    return (
        <main>
            <h1>Agregar nuevo</h1>
            <DemandNewForm dataNombreProductos={dataNombreProductos} dataCountries={dataCountries} onSubmit={onSubmit} loading={loading} />

        </main>
    )
}