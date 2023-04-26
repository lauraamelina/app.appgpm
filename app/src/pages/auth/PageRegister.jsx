import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as CountriesService from '../../services/countries.service'
import * as AuthService from '../../services/auth.service'
import logo from '../../assets/img/logo-color.png'
import uso from '../../assets/img/icono_facil_uso.png'
import diseno from '../../assets/img/icono_diseno_sencillo.png'
import conexion from '../../assets/img/icono_conexion_inmediata.png'
import Swal from "sweetalert2";

export default function Register() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [type, setType] = useState([])
    const [name, setName] = useState('')
    const [nit, setNit] = useState('')
    const [country, setCountry] = useState([])
    const [dataCountry, setDataCountry] = useState([])


    useEffect(()=>{
        CountriesService.getCountries()
        .then((response)=>{
            setDataCountry(response.data)
        })
    // eslint-disable-next-line
    },[])

    const types = [
        { id: 1, name: 'Empresa' },
        { id: 2, name: 'Personal' }
    ];


    function handleSubmit(e) {
        e.preventDefault();
        if (email === '' || password === '' || type === '' || name === '' || nit === '' || country === '') {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor, complete todos los campos',
                icon: 'error',
                confirmButtonColor: '#145388',
                confirmButtonText: 'Aceptar'
            })
        }
        AuthService.freeEmailRegister(email) 
        .then((response)=>{
            if(response.data === false){
                Swal.fire({
                    title: '¡Error!',
                    text: 'El correo electrónico ya se encuentra registrado',
                    icon: 'error',
                    confirmButtonColor: '#145388',
                    confirmButtonText: 'Aceptar'
                })
            }else{
                AuthService.register(email, password, type, name, nit, country)
                .then((response)=>{
                    if(response.status === 200){
                        Swal.fire({
                            title: '¡Bienvenido!',
                            text: 'Se ha registrado correctamente, por favor confirma tu correo electrónico',
                            icon: 'success',
                            confirmButtonColor: '#145388',
                            confirmButtonText: 'Aceptar'
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/login";
                            }
                        })
                    }else{
                        Swal.fire({
                            title: '¡Error!',
                            text: 'Ha ocurrido un error, por favor intente de nuevo',
                            icon: 'error',
                            confirmButtonColor: '#145388',
                            confirmButtonText: 'Aceptar'
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        })
    }

    return (
        <section className="register">
            <h1 className="visually-hidden">Registro</h1>
            <section className="row ">
                <div className="col-md-6  col-12 info">
                    <div>
                        <img src={uso} alt="Facil uso" />
                        <div>
                            <h2>FÁCIL USO</h2>
                            <p>La plataforma contará con filtros y características específicas para que sea una herramienta rápida y efectiva.</p>
                        </div>
                    </div>

                    <div>
                        <img src={diseno} alt="Diseño sencillo" />
                        <div>
                            <h2>DISEÑO SENCILLO</h2>
                            <p>Manteniendo un diseño sencillo se estructurara una interfaz agradable para el usuario.</p>
                        </div>
                    </div>

                    <div>
                        <img src={conexion} alt="Conexion inmediata" />
                        <div>
                            <h2>CONEXIÓN INMEDIATA</h2>
                            <p>Por medio de la base de datos, los usuarios podrán relacionarse y establecer relaciones comerciales globales a un click.</p>
                        </div>
                    </div>

                </div>

                <div className="col-md-6  col-12 start">
                    <img src={logo} alt="Logo APP GPM" />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="type" className="visually-hidden" required>Tipo de cuenta</label>
                            <select className="form-select" id="type" onChange={e => setType(e.target.value)} required>
                                <option value="">Seleccione el tipo de cuenta</option>
                                {types?.map((type) => (
                                    <option key={type.id} value={type}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nit" className="visually-hidden" required>N.I.T.</label>
                            <input placeholder="Ingrese su N.I.T." type="text" className="form-control" id="nit" value={nit} onChange={e => setNit(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="visually-hidden" required>Nombre</label>
                            <input placeholder="Ingrese su nombre" type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="country" className="visually-hidden" required>País</label>
                            <select className="form-select" id="country" onChange={e => setCountry(e.target.value)} required>
                                <option value="">Seleccione su país</option>
                                {dataCountry.map((country, index) => (
                                    <option key={index} value={country}>{country.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="visually-hidden" required>Email</label>
                            <input placeholder="Ingrese su correo electronico" type="text" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="visually-hidden" required>Contraseña</label>
                            <input placeholder="Ingrese su contraseña" type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>

                        <div className="text-center mt-0 botones-login">
                            <button className="btn btn-primary mb-2" type="submit">Registrate</button>
                            <Link className="btn btn-secondary" to={'/login'}> Iniciar Sesión</Link>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    )
}