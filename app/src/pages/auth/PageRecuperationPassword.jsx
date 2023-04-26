import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as AuthService from '../../services/auth.service'
import Verification from '../../assets/img/verification.png'
import logo from '../../assets/img/logo-color.png'
import Swal from 'sweetalert2'

export default function PageRecuperationPassword() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        AuthService.recuperationPassword(email)
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: '¡Correo enviado!',
                        text: 'Se ha enviado un correo a su bandeja de entrada para recuperar su contraseña',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#145388'
                    })
                    navigate('/login')
                } else if (response.status === 500) {
                    Swal.fire({
                        title: '¡Correo no enviado!',
                        text: 'El correo ingresado no se encuentra registrado',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#145388'
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <section className="login">
            <section className="row">
                <div className="col-md-6">
                    <img src={Verification} alt="Imagen de recuperación de contraseña" />
                </div>

                <div className="col-md-6 start">
                    <img src={logo} alt="" />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="visually-hidden" required>Email</label>
                            <input placeholder="Ingrese su correo electronico" type="text" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className="text-center mt-0 botones-login">
                            <button className="btn btn-primary mt-3" type="submit">Recuperar</button>
                            <Link to='/login' className='btn btn-secondary mt-3'>Iniciar Sesión</Link>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    )

}