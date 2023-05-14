import React from 'react';
import * as EnterprisesService from '../../services/enterprises.service'
import Swal from 'sweetalert2'
import ImgGenerica from '../../../src/assets/img/img_generica.png'

export default function CardEnterprise({ enterprise, updateEnterprises }) {
    function getImage(image) {
        if (image) {
            return `https://api.appgpm.com/files/img/${image}`
        } else {
            return ImgGenerica
        }
    }

    function handleDelete() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                EnterprisesService.deleteEnterprise(enterprise.id)
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire({
                                title: '¡Eliminado!',
                                text: 'La empresa ha sido eliminada.',
                                icon: 'success',
                                confirmButtonColor: '#145388',
                            })
                            updateEnterprises()
                        } else {
                            Swal.fire({
                                title: '¡Error!',
                                text: 'No se pudo eliminar la empresa.',
                                icon: 'error',
                                confirmButtonColor: '#145388',
                            })
                        }
                       
                    })
            }
        })
    }

    function handleView() {
        Swal.fire({
            title: enterprise.razon_social,
            html: `
                <p><strong>N.I.T:</strong> ${enterprise.nit}</p>
                <p><strong>Email:</strong> ${enterprise.email}</p>
                <p><strong>Teléfono:</strong> ${enterprise.telefono}</p>
                <p><strong>Dirección:</strong> ${enterprise.direccion}</p>
                <p><strong>Ciudad:</strong> ${enterprise.ciudad}</p>
                <p><strong>País:</strong> ${enterprise?.country?.nombre}</p>

            `,
            confirmButtonColor: '#145388',
        })
    }

    return (
        <div className="card">
            <div className="header">
                <h2>{enterprise?.razon_social}</h2>
                <img src={getImage(enterprise?.avatar)} alt={enterprise?.name} />
            </div>

            <div className="info">
                <p> <strong>N.I.T:</strong> <span>{enterprise?.nit}</span> </p>
                <p> <strong>Dirección:</strong> <span>{enterprise?.direccion}</span> </p>
                <p> <strong>Ciudad:</strong> <span>{enterprise?.ciudad}</span> </p>
                <p> <strong>Teléfono:</strong> <span>{enterprise?.telefono}</span> </p>
            </div>

            <div className="buttons">
                <button className="btn btn-danger" onClick={handleDelete}>Eliminar </button>
                <button className="btn btn-primary" onClick={handleView}>Ver</button>
            </div>

        </div>
    )
}