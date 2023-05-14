import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../../services/auth.service'
import * as EnterprisesService from '../../services/enterprises.service'
import * as CountriesService from '../../services/countries.service'
import Swal from 'sweetalert2'
import FormNewEnterprise from '../../components/enterprises/FormNewEnterprise'

export default function PageNewEnterprises() {
    const navigate = useNavigate();
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);
    const [dataCountries, setDataCountries] = useState([])
    const [isLoading, setIsLoading] = useState(false)


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

    useEffect(() => {
        if (isAdmin) {
            CountriesService.getCountries()
                .then(response => {
                    setDataCountries(response.data);
                })
        } else {
            return
        }
        //eslint-disable-next-line
    }, [])

    function onSubmit(formData) {
        EnterprisesService.createEnterprise(formData)
            .then(response => {
                setIsLoading(false)
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Empresa creada!',
                        text: 'La empresa se ha creado correctamente',
                        showConfirmButton: true,
                        confirmButtonText: 'Volver a la lista de empresas',
                        confirmButtonColor: '#145388',
                    }).then(() => {
                        navigate('/dashboard/enterprises/list');
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error al crear la empresa',
                        showConfirmButton: true,
                        confirmButtonText: 'Volver a intentar',
                        confirmButtonColor: '#145388',
                    })
                }

            })
    }

    return (
        <main className='formNewEnterprise'>
            <h1>Agregar nueva empresa</h1>
            <FormNewEnterprise dataCountries={dataCountries} onSubmit={onSubmit} isLoading={isLoading} setIsLoading={setIsLoading} />
        </main>
    );
}

