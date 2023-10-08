import React, { useState } from 'react'
import { CircularProgress } from '@mui/material'
import Swal from 'sweetalert2'

export default function FormNewService({ dataEnterprises, statsService, onSubmit, isLoading, setIsLoading }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [empresa_id, setEmpresaId] = useState('')
    const [type, setType] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        if (name === '' || description === '' || empresa_id === '' || type === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#145388',
            })
            return
        }

        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, crear servicio',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true)
                const formData = new FormData()
                formData.append('name', name)
                formData.append('description', description)
                formData.append('empresa_id', empresa_id)
                formData.append('type', type)
                onSubmit(formData)
            }
        })
    }



    return (
        <form className='container'>
            <div className="row">
                <div className="mb-3 col-6">
                    <label htmlFor="name" className='form-label'>Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="type" className='form-label'>Tipo de servicio</label>
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="" disabled>Seleccione el tipo de servicio</option>
                        {statsService.map((service, index) => (
                            <option key={index} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="empresa_id" className='form-label'>Empresa</label>
                    <select className="form-select" value={empresa_id} onChange={(e) => setEmpresaId(e.target.value)}>
                        <option value="" disabled>Seleccione la empresa</option>
                        {dataEnterprises.map((enterprise, index) => (
                            <option key={index} value={enterprise.id}>{enterprise.razon_social}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea className="form-control" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}> Crear servicio</button>
                {isLoading &&
                    <div className="mt-3 text-center">
                        <CircularProgress />
                    </div>
                }

            </div>
        </form>
    )
}