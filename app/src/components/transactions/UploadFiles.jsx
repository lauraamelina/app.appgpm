import React, { useState } from "react";
import * as TransactionsService from "../../services/transactions.service";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";

export default function UploadFiles({ transaction }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)

    function handleFile(e) {
        setFile(e.target.files[0])

    }

    function uploadFile(e) {
        e.preventDefault()
        if (!title || !description || !file) {
            Swal.fire(
                'Error!',
                'Todos los campos son obligatorios.',
                'error'
            )
            return
        }

        Swal.fire({
            title: '¿Estás seguro de subir el archivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, subir!'

        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append('document', file);
                formData.append('titulo', title);
                formData.append('descripcion', description);
                setLoading(true)
                TransactionsService.uploadFile(transaction.id, formData)
                    .then(response => {
                        setLoading(false)
                        if (response.status === 200) {
                            setDescription('')
                            setTitle('')
                            setFile('')
                            Swal.fire({
                                title: 'Archivo subido',
                                icon: 'success',
                                confirmButtonColor: '#145388',
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload()
                                }
                            })

                        } else {
                            Swal.fire({
                                title: 'Error',
                                text: 'No se pudo subir el archivo',
                                icon: 'error',
                                confirmButtonColor: '#145388',
                                confirmButtonText: 'Ok'
                            })
                        }
                    })
            }
        })

    }


    return (

        <section>
            <form action="">
                <   h3>Subir archivos</h3>
                <div className="mb-3">
                    <label htmlFor="title">Título</label>
                    <input type="text" name="title" id="title" className="form-control" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Descripción</label>
                    <input type="text" name="description" id="description" className="form-control" onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="file">Archivo</label>
                    <input type="file" name="file" id="file" className="form-control" onChange={handleFile} accept="image/*,.pdf" />
                </div>
                {loading && (
                    <div className="text-center mt-2">
                        <CircularProgress />
                    </div>
                )}
                {!loading && (
                    <button onClick={uploadFile} className="btn btn-primary">Subir archivo</button>
                )}
            </form>

        </section>
    );
}