import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'


export default function FormEditProfile({ user, onSubmitUpdateUser, onSubmitUpdateAvatar }) {
    const [imgAvatar, setImgAvatar] = useState('')
    const [preview, setPreview] = useState('')
    const [name, setName] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [nit, setNit] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [celular, setCelular] = useState('')
    const [direccion, setDireccion] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [id, setId] = useState(user?.id)

    useEffect(() => {
        if (user) {
            setPreview(`https://api.appgpm.com/files/img/${user?.avatar}`)
            setName(user?.name)
            setDescripcion(user?.descripcion)
            setNit(user?.nit)
            setEmail(user?.email)
            setTelefono(user?.telefono)
            setCelular(user?.celular)
            setDireccion(user?.direccion)
            setCiudad(user?.ciudad)
            setId(user?.id)
        }

    }, [user])

    function handleAvatar(e) {
        e.preventDefault()
        const file = e.target.files[0];
        setImgAvatar(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file);


    }

    function handleSubmit(e) {
        e.preventDefault()
        if (name && nit && email && telefono && celular && direccion && ciudad) {
            const user = {
                name,
                descripcion,
                nit,
                email,
                telefono,
                celular,
                direccion,
                ciudad
            }
            onSubmitUpdateUser(id, user)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
                confirmButtonColor: '#145388'

            })

        }

    }

    function handleSubmitAvatar(e) {
        e.preventDefault()
        if (imgAvatar) {
            const formData = new FormData();
            formData.append('avatar', imgAvatar);
            onSubmitUpdateAvatar(formData)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes seleccionar una imagen',
                confirmButtonColor: '#145388'
            })
        }
    }



    return (
        <form className='container'>
            <section className='row col-md-9 col-12'>
                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="name">Nombre</label>
                    <input className='form-control' type="text" name="name" id="name" defaultValue={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="descripcion">Descripción</label>
                    <input onChange={e => setDescripcion(e.target.value)} className='form-control' type="text" name="descripcion" id="descripcion" defaultValue={descripcion} />
                </div>

                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="nit">N.I.T.</label>
                    <input onChange={e => setNit(e.target.value)} className='form-control' type="text" name="nit" id="nit" defaultValue={nit} />
                </div>

                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="email">E-mail</label>
                    <input onChange={e => setEmail(e.target.value)} className='form-control' type="email" name="email" id="email" defaultValue={email} readOnly />
                </div>

                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="telefono">Teléfono</label>
                    <input onChange={e => setTelefono(e.target.value)} className='form-control' type="text" name="telefono" id="telefono" defaultValue={telefono} />
                </div>

                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="celular">Celular</label>
                    <input onChange={e => setCelular(e.target.value)} className='form-control' type="text" name="celular" id="celular" defaultValue={celular} />
                </div>

                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="direccion">Dirección</label>
                    <input onChange={e => setDireccion(e.target.value)} className='form-control' type="text" name="direccion" id="direccion" defaultValue={direccion} />
                </div>

                <div className="form-group col-md-6 col-12 mb-3">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input onChange={e => setCiudad(e.target.value)} className='form-control' type="text" name="ciudad" id="ciudad" defaultValue={ciudad} />
                </div>

                <button onClick={handleSubmit} className='mt-4 btn btn-primary'>Actualizar perfil</button>
            </section>

            <section className='avatar'>
                <div className="form-group">
                    <label htmlFor="avatar" className='mb-4'>Foto de perfil</label>
                    <img src={preview} alt="avatar" className='mb-4' />
                    <input className='form-control' type="file" name="avatar" id="avatar" onChange={handleAvatar} />
                </div>
                <button onClick={handleSubmitAvatar} className='mt-4 btn btn-secondary'>Actualizar foto de perfil</button>
            </section>
        </form>
    )
}