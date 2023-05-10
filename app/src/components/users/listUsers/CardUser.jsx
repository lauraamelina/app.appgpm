import React from "react";
import ImgGenerica from '../../../assets/img/img_generica.png'
import Swal from 'sweetalert2'

export default function CardUser({ user, onDelete }) {
    const getImage = (avatar) => {
        if (avatar) {
            return `https://api.appgpm.com/files/img/${avatar}`
        } else {
            return ImgGenerica
        }
    }
    const handleView = () => {
        Swal.fire({
            title: `<strong>Información de ${user.name}</strong>`,
            html: `
            <div>
                <p> <strong> N.I.T:</strong> <span>${user.nit ? user.nit : ''} </span></p>
                <p> <strong> Dirección:</strong> <span>${user.direccion ? user.direccion : ''}</span></p>
                <p> <strong> País:</strong> <span>${user.country ? user.country : ''}</span></p>
                <p> <strong>Rol: </strong> <span>${user.rol === 1 ? 'Administrador' : 'Vendedor/Comprador'}</span> </p>
                <p> <strong>Email:</strong> <span>${user.email}</span> </p>
                <p> <strong>${user.verificado === 0 ? 'No verificado' : 'Verificado'}</strong> </p>
            </div>
            `,
            showCloseButton: true,
            confirmButtonColor: '#145388'
        })
    }

    const handleDelete = () => {
        Swal.fire({
            title: `¿Estás seguro de eliminar a ${user.name}?`,
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(user.id)
            }
        })
    }

                


    return (
        <div className="card">
            <div className="header">
                <h2>{user.name}</h2>
                <img src={getImage(user.avatar)} alt={user.name} />
            </div>

            <div className="info">
                <p> <strong>Nombre Completo:</strong> <span>{user.name}</span> </p>
                <p> <strong>Nombre de Usuario:</strong> <span>{user.slug}</span> </p>
                <p> <strong>Email:</strong> <span>{user.email}</span> </p>
                <p> <strong>Rol:</strong> <span>{user.rol === 1 ? 'Administrador' : 'Vendedor/Comprador'}</span> </p>
            </div>

            <div className="buttons">
                <button className="btn btn-danger" onClick={handleDelete}>Eliminar </button>
                <button className="btn btn-primary" onClick={handleView}>Ver</button>
            </div>

        </div>
    )

}