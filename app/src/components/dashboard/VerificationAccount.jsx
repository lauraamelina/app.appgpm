import React, { useEffect, useState } from "react";
import * as AuthService from '../../services/auth.service';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function VerificationAccount() {
    const [user, setUser] = useState([])
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        setUser(AuthService.getUser())
        setVerified(user.verificado)
    }, [])

    return (
        <section className="verification-account">
            <Alert severity="error" variant="filled" >
                <h2 className="h4">¡Alerta! Verificación de la cuenta.</h2>
                Para ser un usuario verificado y mejorar tu perfil solicitamos la <strong>carga de unos documentos.</strong>
                <button className="btn">Enviar documentos</button>
            </Alert>

        </section>
    )
}