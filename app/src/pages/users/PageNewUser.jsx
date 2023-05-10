import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../../services/auth.service'
import Swal from 'sweetalert2'
import FormNewUser from '../../components/users/FormNewUser'

export default function PageNewUser() {
    const navigate = useNavigate();
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);

    useEffect(() => {
        if (user?.rol === 1) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user])

    useEffect(() => {
        if (isAdmin === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No tienes permisos para acceder a esta sección',
                showConfirmButton: true,
                confirmButtonText: 'Volver al inicio',
                confirmButtonColor: '#145388',
            }).then(() => {
                navigate('/dashboard');
            })
        }
        //eslint-disable-next-line
    }, [isAdmin])



    return (
        <main className='adminRegister'>
            <h1>Agregar nuevo usuario</h1>
            <FormNewUser  />

        </main>
    );
}
