import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress';

export default function ProductNewForm({ dataNombreProductos, dataCountries, onSubmit, loading }) {
    const [isValidCountry, setIsValidCountry] = useState(false)
    const [thumbnail, setThumbnail] = useState([])
    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [nombre_producto, setNombreProducto] = useState("")
    const [tipo1, setTipo1] = useState("")
    const [tipo2, setTipo2] = useState("")
    const [tipo3, setTipo3] = useState("")
    const [peso, setPeso] = useState("")
    const [volumen, setVolumen] = useState("")
    const [precio, setPrecio] = useState("")
    const [country, setCountry] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [plazo_carga, setPlazoCarga] = useState("")


    const datatipo1 = [
        { id: '1', name: 'Organico' },
        { id: '2', name: 'Convencional' }
    ];
    const datatipo2 = [
        { id: '1', name: 'Granos Enteros' },
        { id: '2', name: 'Granos Partidos' }
    ];
    const datatipo3 = [
        { id: '1', name: 'Natural' },
        { id: '2', name: 'Procesado' }
    ];
    const dataplazo_carga = [
        { id: '1', name: 'Inmediata' },
        { id: '2', name: '5-30 días' },
        { id: '1', name: 'Mayor 30 días' }
    ];
    const datapeso = [
        { id: '2', name: 'TONELADAS' }
    ];

    function handleSubmit(e) {
        e.preventDefault()
        if (nombre_producto !== "" && tipo1 !== "" && tipo2 !== "" && tipo3 !== "" && country !== "" && plazo_carga !== "" && peso !== "" && volumen !== "" && ciudad !== "" && precio !== "" && thumbnail !== []) {

            const fd = new FormData();
            fd.append('nombre_producto', nombre_producto);
            fd.append('tipo1', tipo1);
            fd.append('tipo2', tipo2);
            fd.append('tipo3', tipo3);
            fd.append('country', country);
            fd.append('plazo_carga', plazo_carga);
            fd.append('peso', peso);
            fd.append('volumen', volumen);
            fd.append('precio', precio);
            fd.append('ciudad', ciudad);
            if (thumbnail) {
                fd.append('thumbnail', thumbnail);
            }

            onSubmit(fd);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Completa todos los datos',
                confirmButtonColor: '#145388',
            })
        }
    }

    const validOptionsPais = dataCountries?.data?.map((country) => country.id) || [];
    useEffect(() => {
        const selectedCountryId = country;
        if (selectedCountryId) {
            const isValid = validOptionsPais.includes(parseInt(selectedCountryId));
            setIsValidCountry(isValid);
        }
        // eslint-disable-next-line
    }, [country, setIsValidCountry]);

    function handleThumbnailPreview(event) {
        const selectedFile = event.target.files[0];
        setThumbnail(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        } else {
            setThumbnailPreview(null);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="formNewProduct" encType="multipart/form-data">
            <h2>Información del Bid - Complete la información</h2>
            <div>
                <div className="form-group">
                    <label className="visually-hidden" htmlFor="nombre_producto">Nombre del producto</label>
                    <select className="form-control" id="nombre_producto" defaultValue={nombre_producto}
                        onChange={(e) => setNombreProducto(e.target.value)}>
                        <option value="" disabled>Selecciona el nombre del producto</option>
                        {dataNombreProductos && dataNombreProductos?.data?.map((producto) => {
                            return <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                        })}
                    </select>
                </div>

                <div className="form-group tipe">
                    <div>
                        <label className="visually-hidden" htmlFor="tipo1">Tipo 1</label>
                        <select className="form-control" id="tipo1" defaultValue={tipo1}
                            onChange={(e) => setTipo1(e.target.value)}>
                            <option value="" disabled>Selecciona el tipo</option>
                            {datatipo1 && datatipo1?.map((tipo) => {
                                return <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="visually-hidden" htmlFor="tipo2">Tipo 2</label>
                        <select className="form-control" id="tipo2" defaultValue={tipo2}
                            onChange={(e) => setTipo2(e.target.value)}>
                            <option value="" disabled>Selecciona el tipo</option>
                            {datatipo2 && datatipo2?.map((tipo) => {
                                return <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="visually-hidden" htmlFor="tipo3">Tipo 3</label>
                        <select className="form-control" id="tipo3" defaultValue={tipo3}
                            onChange={(e) => setTipo3(e.target.value)}>
                            <option value="" disabled>Selecciona el tipo</option>
                            {datatipo3 && datatipo3?.map((tipo) => {
                                return <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                            })}
                        </select>
                    </div>



                </div>

                <div className="container caracteristicas mt-5">
                    <h2>Precio del producto</h2>
                    <div className="row justify-content-between">
                        <div className="col-md-4 col-6 mt-3">
                            <label htmlFor="peso">Peso</label>
                            <select className="form-select" id="peso" name="peso" value={peso} onChange={(e) => setPeso(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datapeso?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 col-6 mt-3">
                            <label htmlFor="volumen">Volumen</label>
                            <input type="number" className="form-control" id="volumen" name="volumen" value={volumen} onChange={(e) => setVolumen(e.target.value)} />
                        </div>

                        <div className="col-md-4 col-6 mt-3">
                            <label htmlFor="precio">Precio</label>
                            <input type="number" className="form-control" id="precio" name="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        </div>

                        <div className="col-md-4 col-6 mt-3">
                            <label htmlFor="country">País</label>
                            <input className="form-select" list="countryList" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Selecciona el país" autoComplete="off" />
                            <datalist id="countryList">
                                {dataCountries?.data?.map((country) => (
                                    <option key={country.id} value={country.id}>{country.nombre}</option>
                                ))}
                            </datalist>
                            {!isValidCountry && (
                                <div className="invalid">
                                    Ingrese un país correcto
                                </div>
                            )}
                        </div>
                        <div className="col-md-4 col-6 mt-3">
                            <label htmlFor="ciudad">Ciudad</label>
                            <input type="text" className="form-control" id="ciudad" name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                        </div>
                        <div className="col-md-4 col-6 mt-3">
                            <label htmlFor="plazo_carga">Plazo de carga</label>
                            <select className="form-select" id="plazo_carga" name="plazo_carga" value={plazo_carga} onChange={(e) => setPlazoCarga(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {dataplazo_carga?.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>

                <div className="container caracteristicas my-5">
                    <h2>Imágenes del producto</h2>
                    <div className="row justify-content-between">
                        <div className="col-12 mt-3">
                            <label htmlFor="thumbnail">Imagen principal (Obligatorio)</label>
                            <input type="file" className="form-control" id="thumbnail" name="thumbnail" onChange={handleThumbnailPreview} accept=".png, .jpg, .jpeg" />

                            {thumbnailPreview && (
                                <div className="img">
                                    <img src={thumbnailPreview} alt="Preview" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-md-3 col-12 my-2 align-self-center text-center">
                        <Link className="btn btn-danger w-100" to={'dashboard/products/list'} >Cancelar</Link>
                    </div>
                    <div className="col-md-3 col-12 my-2 align-self-center text-center">
                        <button className="btn btn-primary w-100" type="submit">Agregar</button>
                    </div>
                </div>
            </div>

            {loading &&
                <div className="text-center">
                    <CircularProgress />
                </div>
            }

        </form>

    )
}