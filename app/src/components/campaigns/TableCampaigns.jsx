import React from 'react'
import * as CampaignsService from '../../services/campaigns.service'
import Swal from 'sweetalert2'

export default function TableCampaigns({ campaigns, updateCampaigns }) {

    function formatedDate(date) {
        const dateObj = new Date(date)
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth() + 1
        const day = dateObj.getDate()
        const formatedDate = `${day}/${month}/${year}`
        return formatedDate
    }

    function handleView(campaign) {
        return () => {
            Swal.fire({
                icon: 'info',
                title: `Campaña: ${campaign.name}`,
                html: `
                    <p> Descripción: ${campaign.description}  </p>
                    <p> Creación: ${formatedDate(campaign.created_at)}  </p>
                `,
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#145388',
            })
        }
    }

    function handleEdit(campaign) {
        return () => {
            Swal.fire({
                icon: 'info',
                title: `Campaña: ${campaign.name}`,
                confirmButtonColor: '#145388',
                html: `<div>
                            <label style="margin-left:3em"> Nombre del campaña: </label>
                            <input type="text" id="name" class="swal2-input" value="${campaign.name}" style="width:100%"> 
                        </div>
                        <div style="margin-top:2em">
                            <label style="margin-left:3em"> Descripción del campaña: </label>
                            <textarea id="description" class="swal2-input" style="width:100%">${campaign.description}</textarea>
                        </div>`,
                focusConfirm: false,
                preConfirm: () => {
                    const name = Swal.getPopup().querySelector('#name').value
                    const description = Swal.getPopup().querySelector('#description').value
                    if (!name || !description) {
                        Swal.showValidationMessage(`Por favor ingrese todos los datos`)
                    }
                    return { name: name, description: description }
                }
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        CampaignsService.updateCampaign(campaign.id, result.value.name, result.value.description)
                            .then(response => {
                                if (response.status === 200) {
                                    Swal.fire({
                                        title: 'Campaña editada',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                        confirmButtonColor: '#145388',
                                    }).then((response) => {
                                        updateCampaigns()
                                    })

                                } else {
                                    Swal.fire({
                                        title: 'Error al editar campaña',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                        confirmButtonColor: '#145388',
                                    })
                                }
                            })
                    }
                })
        }
    }

    function handleDelete(campaign) {
        return () => {
            Swal.fire({
                title: `¿Está seguro que desea eliminar la campaña ${campaign.name}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#145388',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    CampaignsService.deleteCampaign(campaign.id)
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire({
                                    title: 'Campaña eliminada',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar',
                                    confirmButtonColor: '#145388',
                                }).then((response) => {
                                    updateCampaigns()
                                })

                            } else {
                                Swal.fire({
                                    title: 'Error al eliminar campaña',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar',
                                    confirmButtonColor: '#145388',
                                })
                            }
                        })
                }
            })
        }

    }



    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha de creación</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {campaigns.map(campaign => (
                    <tr key={campaign.id}>
                        <td>{campaign.id}</td>
                        <td>{campaign.name}</td>
                        <td>{campaign.description}</td>
                        <td>{formatedDate(campaign.created_at)}</td>
                        <td>
                            <button className="btn btn-primary me-1" onClick={handleView(campaign)}>Ver</button>
                            <button className="btn btn-secondary me-1" onClick={handleEdit(campaign)}>Editar</button>
                            <button className="btn btn-danger me-1" onClick={handleDelete(campaign)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}