import React, { useEffect, useState } from 'react'
import * as AuthService from '../../services/auth.service'
import Verification from '../../assets/img/verification.png'
import logo from '../../assets/img/logo-color.png'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function PageVerification() {
    let navigate = useNavigate()
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const user = AuthService.getUser()
        if (user) {
            setUserId(user.id)
        }
    // eslint-disable-next-line 
    }, [])

    function handleLogout() {
        AuthService.logout()
        navigate('/login')
    }

    function handleSubmit(e) {
        e.preventDefault();
        AuthService.sendEmailVerification(userId)
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: '¡Correo enviado!',
                        text: 'Se ha enviado un correo a su bandeja de entrada para verificar su cuenta',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#145388'
                    })
                } else {
                    Swal.fire({
                        title: '¡Correo no enviado!',
                        text: 'Hubo un problema al enviar el correo de verificación.',
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
                    <h1 className='h4'>¡TE HEMOS ENVIADO UN EMAIL PARA QUE VERIFIQUES TU CUENTA!</h1>
                    <p>Abre tu correo electronico para que logres verificar tu cuenta. Es totalmente sencillo.</p>
                    <div className='d-flex flex-column'>
                        <button className="btn btn-primary mt-3" onClick={handleSubmit}>Reenviar otro correo</button>
                        <button className="btn btn-secondary mt-3" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </div>
            </section>
        </section>
    )

}
