import React, { useState, useEffect } from "react";
import * as AuthService from '../../services/auth.service'
import * as UserService from '../../services/users.service'
import FormEditProfile from '../../components/users/FormEditProfile'
import Swal from 'sweetalert2'



export default function PageEditProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = AuthService.getUser();
        setUser(user);
    }, []);

    function onSubmitUpdateUser(id, user) {
        UserService.updateUser(id, user)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Perfil actualizado',
                        text: 'Los datos de tu perfil han sido actualizados',
                        showConfirmButton: false,
                        confirmButtonColor: '#145388'
                    })
                    AuthService.setUser(res.data)
                    setUser(res.data)

                } else if (res.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido un error al actualizar los datos',
                        confirmButtonColor: '#145388'
                    })

                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error al actualizar los datos',
                    confirmButtonColor: '#145388'
                })
            })
    }

    function onSubmitUpdateAvatar(avatar) {
        UserService.updateAvatar(avatar)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Foto de perfil actualizada',
                        text: 'La foto de perfil ha sido actualizada',
                        showConfirmButton: false,
                        confirmButtonColor: '#145388'
                    })
                    AuthService.setUser(res.data)
                    setUser(res.data)
                    window.location.reload()
                } else if (res.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido un error al actualizar los datos',
                        confirmButtonColor: '#145388'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error al actualizar los datos',
                    confirmButtonColor: '#145388'
                })
            })
    }



    return (
        <main className="edit-profile">
            <h1>Editar mi perfil</h1>
            <FormEditProfile user={user} onSubmitUpdateUser={onSubmitUpdateUser} onSubmitUpdateAvatar={onSubmitUpdateAvatar} />

        </main>
    )
}