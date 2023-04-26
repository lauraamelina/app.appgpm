import React, { useEffect, useState } from 'react';
import Img from '../../assets/img/img_generica.png'
import Swal from 'sweetalert2'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import * as CountriesService from '../../services/countries.service'

export default function DemandById({ product, isUserProduct, deleteProduct, sellProduct }) {
    const [country, setCountry] = useState([])

    useEffect(() => {
        CountriesService.getCountries()
            .then((res) => {
                //eslint-disable-next-line
                res.data.map((country) => {
                    if (country.id === product?.pais_id) {
                        setCountry(country.nombre)
                    }
                }
                )
            })
    }, [product])

    function getTypes() {
        let types = [];
        if (product?.tipo1) {
            types.push(product?.tipo1)
        }
        if (product?.tipo2) {
            types.push(product?.tipo2)
        }
        if (product?.tipo3) {
            types.push(product?.tipo3)
        }
        return types.join(', ')
    }

    function getImage(image) {
        if (image) {
            return `https://api.appgpm.com/files/demands/${image}`
        } else {
            return Img
        }
    }

    function handleDelete() {
        Swal.fire({
            title: '¿Estás seguro de eliminar este bid?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(product?.id)
            }
        })
    }

    function handleSell() {
        let volumen = 0;
        let price = 0;
        Swal.fire({
            title: '¿Qué cantidad desea vender?',
            input: 'number',
            inputPlaceholder: 'Ingrese el volumen',
            inputAttributes: {
                min: 1,
                max: parseInt(product?.volumen),
                step: 1
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar un volumen'
                }
                if (value > parseInt(product?.volumen)) {
                    return `El volumen no puede ser mayor al disponible (${product?.volumen})`
                }
                volumen = value
            },
            showCancelButton: true,
            confirmButtonText: 'Vender',
            showLoaderOnConfirm: true,
            confirmButtonColor: '#145388',
            preConfirm(login) {
                volumen = parseInt(login)
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Precio / TN/TN',
                    input: 'number',
                    inputPlaceholder: 'Ingrese el precio',
                    inputAttributes: {
                        min: 1,
                        step: 1
                    },
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Debes ingresar un precio'
                        }
                        price = value
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Vender',
                    showLoaderOnConfirm: true,
                    confirmButtonColor: '#145388',
                    preConfirm(login) {
                        price = parseInt(login)
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: '¿Estás seguro de vender?',
                            html: `<p>Producto: ${product?.nombre_producto?.nombre}</p>
                            <p>Volumen: ${volumen} TN</p>
                            <p>Precio: ${price} / TN/TN</p>
                            `
                            ,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#145388',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, vender',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                sellProduct(product?.id, volumen, price)
                            }
                        })
                    }
                })
            }
        })
    }


    return (
        <section className='container demandId'>
            <div className="row">
                <div className='col-md-6 col-12'>
                    <div className="product">
                        <h2>{product?.nombre_producto?.nombre}</h2>
                        <ul>
                            <li> <span>Publicado por: </span>{product?.user?.email}</li>
                            <li> <span>Tipo de producto: </span>{getTypes()}</li>
                            <li> <span>Plazo de carga: </span>{product?.plazo_carga}</li>
                            <li> <span>Volumen: </span>{product?.volumen}</li>
                            <li> <span>País de Origen: </span>{country}</li>
                            <li> <span>Ciudad: </span>{product?.ciudad}</li>
                        </ul>
                    </div>

                    <div className="buttons">
                        {isUserProduct && (<>
                            <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
                        </>)}

                        {!isUserProduct && (<>
                            <button onClick={handleSell} className="btn btn-primary mb-2">Vender producto</button>
                            <button className="btn btn-secondary">Chatear con el vendedor</button>
                        </>)}
                    </div>
                </div>
                <div className="col-md-5 col-12 images">
                    <p className="precio"> {product?.precio} USD/TN</p>
                    <img src={getImage(product?.image)} alt={product?.nombre_producto?.nombre} />
                </div>
            </div>
        </section>
    )
}