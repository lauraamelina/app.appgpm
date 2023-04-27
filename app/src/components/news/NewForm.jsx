import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImgGenerica from '../../assets/img/img_generica.png'
import Swal from 'sweetalert2'
import CircularProgress from "@mui/material/CircularProgress";


export default function NewForm({ dataProductsName, loading, onSubmit }) {
    const [title, setTitle] = useState('')
    const [contenido, setContenido] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [producto_id, setProducto_id] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [previewThumbnail, setPreviewThumnbail] = useState('')

    const handleThumbnail = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        setThumbnail(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewThumnbail(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title === '' || contenido === '' || descripcion === '' || producto_id === '' || thumbnail === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
                confirmButtonColor: '#145388'
            })
            return
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Se publicará la noticia",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#145388',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, publicar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('title', title)
                    formData.append('contenido', contenido)
                    formData.append('descripcion', descripcion)
                    formData.append('producto_id', producto_id)
                    formData.append('thumbnail', thumbnail)
                    onSubmit(formData)
                }
            })
        }
    }

    useEffect(() => {
        setPreviewThumnbail(ImgGenerica)

    }, [])

    return (
        <section className="formNew row">
            <div className="col-md-9">
                <div>
                    <label className="form-label" htmlFor="title">Título</label>
                    <input className="form-control" type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="descripcion">Descripción</label>
                    <textarea className="form-control" name="descripcion" id="descripcion" rows="2" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                </div>
                <div>
                    <label className="form-label" htmlFor="contenido">Contenido</label>
                    <ReactQuill theme="snow" value={contenido} onChange={setContenido} />
                </div>
                {loading &&
                    <div className="text-center">
                        <CircularProgress />
                    </div>
                }

                {!loading &&
                    <button onClick={handleSubmit} className="text-center btn btn-primary">Publicar noticia</button>
                }
            </div>

            <div className="col-md-3">
                <div>
                    <label className="form-label" htmlFor="producto_id">Selecciona el producto</label>
                    <select className="form-select" name="producto_id" id="producto_id" value={producto_id} onChange={(e) => setProducto_id(e.target.value)}>
                        <option value="">Selecciona un producto</option>
                        {dataProductsName.map((product) => {
                            return (
                                <option key={product.id} value={product.id}>{product.nombre}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label className="form-label" htmlFor="thumbnail">Imagen</label>
                    <img src={previewThumbnail} alt="Imagen de la noticia" />
                    <input className="form-control" type="file" name="thumbnail" id="thumbnail" onChange={handleThumbnail} accept="image/png, image/jpeg, image/jpg" />
                </div>
            </div>


        </section>
    )
}