import React, { useEffect, useState } from "react";
import * as AuthService from '../../services/auth.service';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'

export default function VerificationAccount() {
    const [user, setUser] = useState(AuthService.getUser() || [])
    const [verified, setVerified] = useState(user.verificado || 0);

    useEffect(() => {
        setUser(AuthService.getUser())
        setVerified(user.verificado)
        // eslint-disable-next-line
    }, [])

    const handleSubmit = () => {
        Swal.fire({
            title: 'Carga de documentos',
            text: 'Para verificar tu cuenta, necesitamos que nos envies tu documento.',
            input: 'file',
            confirmButtonColor: '#145388',
            inputAttributes: {
                accept: 'image/*,application/pdf',
                'aria-label': 'Upload your profile picture'
            },
            inputValidator: (value) => {
                if (!value) {
                    return '¡Necesitas cargar un documento!'
                }
            }
        }).then((file) => {
            if (file.isConfirmed) {
                const formData = new FormData();
                formData.append('file', file.value);
                AuthService.uploadFileVerification(formData)
                    .then(res => {
                        console.log(res)
                        if (res.status === 200) {
                            Swal.fire({
                                title: '¡Documento enviado!',
                                text: 'En breve nos pondremos en contacto contigo para verificar tu cuenta.',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: '#145388'
                            })
                        } else {
                            Swal.fire({
                                title: '¡Error!',
                                text: 'Ha habido un error al enviar el documento.',
                                icon: 'error',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: '#145388'
                            })
                        }
                    })
            }
        })
    }





    return (
        <section className="verification-account">
            {verified === 0 &&
                <Alert severity="error" variant="filled" >
                    <h2 className="h4">¡Alerta! Verificación de la cuenta.</h2>
                    Para ser un usuario verificado y mejorar tu perfil solicitamos la <strong>carga de unos documentos.</strong>
                    <button className="btn" onClick={handleSubmit}>Enviar documentos</button>
                </Alert>
            }
        </section>
    )
}