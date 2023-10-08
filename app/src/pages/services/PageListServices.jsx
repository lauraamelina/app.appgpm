import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as ServicesService from '../../services/services.service'
import TableServices from "../../components/services/TableServices";
import Swal from "sweetalert2";

export default function PageListService() {
    const { id } = useParams();
    const [services, setServices] = useState([])
    const [stat, setStat] = useState([])

    useEffect(() => {
        ServicesService.getEnterprises(id)
            .then(response => {
                setServices(response.data)
            })
        ServicesService.getStatsServices()
            .then(response => {
                response?.data?.forEach(stat => {
                    if (stat.id === parseInt(id)) {
                        setStat(stat)
                    }
                })
            })

    }, [id])

    function onSubmit(id, fd) {
        ServicesService.contactEnterpriseByService(id, fd)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mensaje enviado',
                        text: 'El mensaje fue enviado correctamente',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#145388',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al enviar el mensaje',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#145388',
                    })
                }
            })
    }

    return (
        <main>
            <h1>Servicios {stat.name}</h1>
            <TableServices services={services} onSubmit={onSubmit} />
        </main>
    )
}