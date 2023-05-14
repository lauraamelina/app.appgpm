import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as AuthService from '../../services/auth.service'
import * as EnterprisesService from '../../services/enterprises.service'
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2'
import TableEnterprises from '../../components/enterprises/CardsEnterprises'

export default function PageListDocuments() {
    const navigate = useNavigate();
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [enterprises, setEnterprises] = useState([])

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
            setIsLoaded(true)
            EnterprisesService.getAllEnterprises()
                .then(response => {
                    setEnterprises(response.data);
                    setIsLoaded(false);
                })
        } else {
            return
        }

        //eslint-disable-next-line
    }, [])

    function updateEnterprises() {
        setIsLoaded(true)
        EnterprisesService.getAllEnterprises()
            .then(response => {
                setEnterprises(response.data);
                setIsLoaded(false);
            })
    }

    return (
        <main className='pageListEnterprises'>
            <div className="header">
                <h1>Lista de Empresas</h1>
                <Link to={'/dashboard/enterprises/new'} className="btn btn-primary mt-2">Agregar una empresa</Link>
            </div>


            {isLoaded &&
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            }

            {!isLoaded && enterprises.length !== 0 &&
                <TableEnterprises enterprises={enterprises} updateEnterprises={updateEnterprises} />
            }

            {!isLoaded && enterprises.length === 0 &&
                <div className="not-exist">
                    <h2>No hay empresas registradas</h2>
                    <Link to={'/dashboard/enterprises/new'} className="btn btn-primary mt-2">Agregar una empresa</Link>
                </div>
            }

        </main>
    );
}

