import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as CountriesService from '../../services/countries.service'
import * as AuthService from '../../services/auth.service'
import * as UsersService from '../../services/users.service'
import Swal from "sweetalert2";

export default function FormNewUser() {
    const navigate = useNavigate();
    const [type, setType] = useState([])
    const [name, setName] = useState('')
    const [rol, setRol] = useState([])
    const [country, setCountry] = useState([])
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [nit, setNit] = useState('')
    const [dataCountry, setDataCountry] = useState([])

    useEffect(() => {
        CountriesService.getCountries()
            .then((response) => {
                setDataCountry(response.data)
            })
        // eslint-disable-next-line
    }, [])

    const types = [
        { id: 1, name: 'Empresa' },
        { id: 2, name: 'Personal' }
    ];

    const roles = [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Comprador/Vendedor' }
    ];

    function handleSubmit(e) {
        e.preventDefault();
        if (email === '' || password === '' || type === undefined || name === '' || nit === '' || country === undefined || rol === undefined) {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor, complete todos los campos',
                icon: 'error',
                confirmButtonColor: '#145388',
                confirmButtonText: 'Aceptar'
            })
        }


        AuthService.freeEmailRegister(email)
            .then((response) => {
                if (response.data === false) {
                    Swal.fire({
                        title: '¡Error!',
                        text: 'El correo electrónico ya se encuentra registrado',
                        icon: 'error',
                        confirmButtonColor: '#145388',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    UsersService.register(type, nit, name, rol, country, email, password)
                        .then((response) => {
                            if (response.status === 200) {
                                Swal.fire({
                                    title: 'Usuario creado!',
                                    text: 'Se ha registrado correctamente el usuario',
                                    icon: 'success',
                                    confirmButtonColor: '#145388',
                                    confirmButtonText: 'Aceptar'
                                })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            navigate("/dashboard/users/list")
                                        }
                                    })
                            } else {
                                Swal.fire({
                                    title: '¡Error!',
                                    text: 'Ha ocurrido un error, por favor intente de nuevo',
                                    icon: 'error',
                                    confirmButtonColor: '#145388',
                                    confirmButtonText: 'Aceptar'
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex">
                <div>
                    <label htmlFor="type" className="form-label" required>Tipo de cuenta</label>
                    <select className="form-select" id="type" onChange={e => setType(types.find(t => t.id === Number(e.target.value)))} required>
                        <option value="">Seleccione el tipo de cuenta</option>
                        {types?.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="rol" className="form-label" required>Rol</label>
                    <select className="form-select" id="rol" onChange={e => setRol(roles.find(t => t.id === Number(e.target.value)))} required>
                        <option value="">Seleccione su rol</option>
                        {roles?.map((rol) => (
                            <option key={rol.id} value={rol.id}>{rol.name}</option>
                        ))}
                    </select>
                </div>

            </div>


            <div className="d-flex">
                <div>
                    <label htmlFor="nit" className="form-label" required>N.I.T.</label>
                    <input placeholder="Ingrese su N.I.T." type="text" className="form-control" id="nit" value={nit} onChange={e => setNit(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="country" className="form-label" required>País</label>
                    <select className="form-select" id="country" onChange={e => setCountry(dataCountry.find(t => t.id === Number(e.target.value)))} required>
                        <option value="">Seleccione su país</option>
                        {dataCountry.map((country, index) => (
                            <option key={index} value={country.id}>{country.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>



            <div className="mb-3">
                <label htmlFor="name" className="form-label" required>Nombre</label>
                <input placeholder="Ingrese su nombre" type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>




            <div className="mb-3">
                <label htmlFor="email" className="form-label" required>Email</label>
                <input placeholder="Ingrese su correo electronico" type="text" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label" required>Contraseña</label>
                <input placeholder="Ingrese su contraseña" type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <div className="text-center mt-0 botones-login">
                <button className="btn btn-primary my-2" type="submit">Crear Usuario</button>
            </div>
        </form>
    )
}