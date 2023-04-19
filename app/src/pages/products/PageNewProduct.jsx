import React, { useEffect, useState } from 'react'
import ProductNewForm from '../../components/products/ProductNewForm'
import * as ProductService from '../../services/products.service'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PageNewProduct() {
    const navigate = useNavigate();

    const [dataNombreProductos, setDataNombreProductos] = useState("");
    const [dataCountries, setDataCountries] = useState("");
    const [dataIncoterms, setDataIncoterms] = useState("");

    useEffect(() => {
        ProductService.getProductsName().then((data) => {
            setDataNombreProductos(data);
        });

        ProductService.getCountries().then((data) => {
            setDataCountries(data);
        });

        ProductService.getIncoterms().then((data) => {
            setDataIncoterms(data);
        });
    }, [setDataNombreProductos, setDataCountries, setDataIncoterms])

    function onSubmit(fd) {
        ProductService.addProduct(fd)
            .then((data) => {
                if (data?.status === 200) {
                    navigate('/dashboard/products/list');
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo agregar el producto, intente nuevamente más tarde.',
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
            <ProductNewForm dataNombreProductos={dataNombreProductos} dataCountries={dataCountries} dataIncoterms={dataIncoterms} onSubmit={onSubmit} />

        </main>
    )
}