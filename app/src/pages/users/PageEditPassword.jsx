import React, { useEffect, useState } from "react";
import * as UsersService from '../../services/users.service'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from "sweetalert2";

export default function PageEditPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false)


    useEffect(() => {
        if (confirmPassword !== newPassword) {
            setErrorConfirmPassword('Las contraseñas no coinciden')
        } else {
            setErrorConfirmPassword('')
        }
    }, [confirmPassword, newPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!oldPassword || !confirmPassword || !newPassword) {
            setError('Todos los campos son obligatorios')
            return
        }
        if (confirmPassword !== newPassword) {
            setErrorConfirmPassword('Las contraseñas no coinciden')
        } else {
            setErrorConfirmPassword('')
            setError('')
            setLoading(true)

            UsersService.changePassword(oldPassword, newPassword, confirmPassword)
                .then(res => {
                    setLoading(false)
                    if (res.status === 200) {
                        setViewPassword(false)
                        setOldPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                        Swal.fire({
                            icon: 'success',
                            title: 'Contraseña cambiada',
                            text: 'La contraseña se ha cambiado correctamente',
                            showConfirmButton: false,
                        })
                    } else if (res.status === 500) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'La contraseña anterior es incorrecta',
                            confirmButtonColor: '#145388'
                        })
                    }
                })
        }
    }



    return (
        <main className="editPassword">
            <h1>Cambiar contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="oldPassword">Contraseña actual</label>
                    <input className="form-control" type={viewPassword ? 'text' : 'password'} name="oldPassword" id="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input className="form-control" type={viewPassword ? 'text' : 'password'} name="newPassword" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input className="form-control" type={viewPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    {errorConfirmPassword &&
                        <div className="text-danger">
                            {errorConfirmPassword}
                        </div>
                    }
                </div>
                <div className="mb-3">
                    <input className="form-check-input me-2" type="checkbox" name="viewPassword" id="viewPassword" value={viewPassword} onChange={e => setViewPassword(!viewPassword)} />
                    <label className="form-check-label" htmlFor="viewPassword">Mostrar contraseña</label>
                </div>

                <button className="btn btn-primary" type="submit">Cambiar contraseña</button>

                {error &&
                    <div className="text-danger mt-3">
                        {error}
                    </div>
                }

                {loading &&
                    <div className="text-center mt-3">
                        <CircularProgress />
                    </div>
                }
            </form>
        </main>
    )
}

