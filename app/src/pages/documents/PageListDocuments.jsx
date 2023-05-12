import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../../services/auth.service'
import * as DocumentsService from '../../services/documents.service'
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2'
import ListDocuments from '../../components/documents/ListDocuments'

export default function PageListDocuments() {
    const navigate = useNavigate();
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [documents, setDocuments] = useState([])

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
            DocumentsService.getAllDocuments()
                .then(response => {
                    setDocuments(response.data);
                    setIsLoaded(false);
                })
        } else {
            return
        }
        //eslint-disable-next-line
    }, [])

    function updateDocuments() {
        setIsLoaded(true)
        DocumentsService.getAllDocuments()
            .then(response => {
                setDocuments(response.data);
                setIsLoaded(false);
            })
    }

    return (
        <main>
            <h1>Lista de Documentos</h1>

            {isLoaded &&
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            }

            {!isLoaded &&
                <ListDocuments documents={documents} updateDocuments={updateDocuments} />
            }

        </main>
    );
}

