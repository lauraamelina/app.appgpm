import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../../services/auth.service'
import * as EnterprisesService from '../../services/enterprises.service'
import * as ServicesService from '../../services/services.service'
import Swal from 'sweetalert2'
import FormNewService from '../../components/services/FormNewService';

export default function PageNewEnterprises() {
    const navigate = useNavigate();
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);
    const [dataEnterprises, setDataEnterprises] = useState([])
    const [statsService, setStatsService] = useState([])
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
            EnterprisesService.getAllEnterprises()
                .then(response => {
                    setDataEnterprises(response.data);
                })

            ServicesService.getStatsServices()
                .then(response => {
                    setStatsService(response.data);
                })

        } else {
            return
        }
        //eslint-disable-next-line
    }, [])

    function onSubmit(formData) {
        ServicesService.createService(formData)
            .then(response => {
                setIsLoading(false)
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Servicio creada!',
                        text: 'El servicio se ha creado correctamente',
                        showConfirmButton: true,
                        confirmButtonText: 'Volver a la lista de servicios',
                        confirmButtonColor: '#145388',
                    }).then(() => {
                        navigate('/dashboard/services/list');
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error al crear el servicio',
                        showConfirmButton: true,
                        confirmButtonText: 'Volver a intentar',
                        confirmButtonColor: '#145388',
                    })
                }

            })
    }

    return (
        <main className='formNewEnterprise'>
            <h1>Agregar nuevo servicio</h1>
            <FormNewService dataEnterprises={dataEnterprises} statsService={statsService} onSubmit={onSubmit} isLoading={isLoading} setIsLoading={setIsLoading} />
        </main>
    );
}

