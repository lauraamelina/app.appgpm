import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../../services/auth.service'
import * as UserService from '../../services/users.service'
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2'
import ListUsers from '../../components/users/listUsers/ListUsers'

export default function PageListUsers() {
    const navigate = useNavigate();
    const user = AuthService.getUser();
    const [isAdmin, setIsAdmin] = useState(user?.rol === 1 ? true : false);
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

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
            UserService.getAllUsers()
                .then(response => {
                    setUsers(response.data);
                    setIsLoaded(false);
                })
        } else {
            return
        }
        //eslint-disable-next-line
    }, [])

    const deleteUser = (id) => {
        UserService.deleteUser(id)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El usuario ha sido eliminado.',
                        icon: 'success',
                        confirmButtonColor: '#145388',
                    })
                    setIsLoaded(true)
                    UserService.getAllUsers()
                        .then(response => {
                            setUsers(response.data);
                            setIsLoaded(false);
                        })

                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: 'No se pudo eliminar el usuario.',
                        icon: 'error',
                        confirmButtonColor: '#145388',
                    })
                }
            })
    }

    return (
        <main>
            <h1>Lista de Usuarios</h1>

            {isLoaded &&
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            }

            {!isLoaded &&
                <ListUsers users={users} deleteUser={deleteUser} />
            }

        </main>
    );
}
