import React, { useState } from 'react'
import ImgGenerica from '../../assets/img/img_generica.png'
import Swal from 'sweetalert2'
import { CircularProgress } from '@mui/material'

export default function FormNewEnterprise({ dataCountries, onSubmit, isLoading, setIsLoading }) {
    const [razon_social, setRazonSocial] = useState('')
    const [nit, setNit] = useState('')
    const [direccion, setDireccion] = useState('')
    const [country, setCountry] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState(ImgGenerica)


    function handleAvatar(e) {
        const file = e.target.files[0]
        setAvatar(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setAvatarPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (razon_social === '' || nit === '' || direccion === '' || country === '' || ciudad === '' || telefono === '' || email === '' || avatar === '') {
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
            confirmButtonText: 'Sí, crear empresa',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true)
                const formData = new FormData()
                formData.append('razon_social', razon_social)
                formData.append('nit', nit)
                formData.append('direccion', direccion)
                formData.append('country', country)
                formData.append('ciudad', ciudad)
                formData.append('telefono', telefono)
                formData.append('email', email)
                formData.append('avatar', avatar)
                onSubmit(formData)
            }
        })



    }



    return (
        <form>
            <div className="mb-3">
                <label htmlFor="razon_social" className="form-label">Razón social</label>
                <input type="text" className="form-control" id="razon_social" name="razon_social" value={razon_social} onChange={(e) => setRazonSocial(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="nit" className="form-label">NIT</label>
                <input type="text" className="form-control" id="nit" name="nit" value={nit} onChange={(e) => setNit(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <input type="text" className="form-control" id="direccion" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="country" className="form-label">País</label>
                <select className="form-select" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">Selecciona un país</option>
                    {dataCountries.map((country) => (
                        <option key={country.id} value={country.id}>{country.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <input type="text" className="form-control" id="ciudad" name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />

            </div>

            <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input type="text" className="form-control" id="telefono" name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-3 avatar">
                <div>
                    <label htmlFor="avatar" className="form-label">Avatar</label>
                    <input type="file" className="form-control" id="avatar" name="avatar" onChange={(e) => handleAvatar(e)} accept='image/png, image/jpeg, image/jpg, image/gif' />
                </div>

                <div className='img'>
                    <img src={avatarPreview} alt="Avatar" />
                </div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}> Crear empresa</button>
            {isLoading &&
                <div className="mt-3 text-center">
                    <CircularProgress />
                </div>
            }


        </form>
    )
}