import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import Swal from "sweetalert2";
import * as DocumentsService from '../../services/documents.service'

export default function TableDocuments({ documents, updateDocuments }) {

    function getDate(date) {
        if (date) {
            const newDate = new Date(date)
            const day = newDate.getDate()
            const month = newDate.getMonth() + 1
            const year = newDate.getFullYear()
            return `${day}/${month}/${year}`
        } else {
            return 'Sin fecha'
        }
    }

    function verify(document) {
        const extension = document?.nombre.split('.').pop()
        if (extension === 'pdf') {
            Swal.fire({
                title: 'Verificar documento',
                html: `
                <div>
                    <div>Usuario: ${document?.user?.name}</div>
                    <iframe src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://api.appgpm.com/public/files/documents/${document?.nombre}" width="300" height="300"></iframe>
                </div>
            `,
                showCancelButton: true,
                confirmButtonText: 'Verificar',
                confirmButtonColor: '#145388',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    DocumentsService.verifyDocument(document?.id)
                        .then((res) => {
                            if (res.message === 'Verificado.') {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Documento verificado',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#145388',
                                }).then(() => {
                                    updateDocuments()
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Algo salió mal',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#145388',
                                })
                            }
                        })
                }
            })
        } else {
            Swal.fire({
                title: 'Verificar documento',
                text: `Usuario: ${document?.user?.name}`,
                imageUrl: `https://api.appgpm.com/public/files/documents/${document?.nombre}`,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: document?.user?.name,
                showCancelButton: true,
                confirmButtonText: 'Verificar',
                confirmButtonColor: '#145388',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    DocumentsService.verifyDocument(document?.id)
                        .then((res) => {
                            if (res.message === 'Verificado.') {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Documento verificado',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#145388',
                                }).then(() => {
                                    updateDocuments()
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Algo salió mal',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#145388',
                                })
                            }
                        })
                }
            })
        }
    }

    function view(document) {
        const extension = document?.nombre.split('.').pop()
        if (extension === 'pdf') {
            Swal.fire({
                title: 'Ver documento',
                html: `
                <div>
                    <div>Usuario: ${document?.user?.name}</div>
                    <iframe src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://api.appgpm.com/public/files/documents/${document?.nombre}" width="300" height="300"></iframe>
                </div>
            `,
                showCancelButton: false,
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#145388'
            })
        } else {
            Swal.fire({
                title: 'Ver documento',
                text: `Usuario: ${document?.user?.name}`,
                imageUrl: `https://api.appgpm.com/public/files/documents/${document?.nombre}`,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: document?.user?.name,
                showCancelButton: false,
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#145388',
            })
        }
    }

    return (
        <table className="tableDocuments table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Tipo de documento</th>
                    <th>Fecha de revisión</th>
                    <th>Verificado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {documents?.map(document => {
                    return (
                        <tr key={document?.id}>
                            <td>{document?.id}</td>
                            <td className="text-start fw-bold">{document?.user?.name}</td>
                            <td className="fs-6 fst-italic">{document?.tipo === 1 ? 'Documento de identidad' : 'Certificado de existencia y Representacion Legal'}</td>
                            <td>{getDate(document?.fecha_revision)}</td>
                            <td>{document?.verificado === 1 ? <CheckCircleIcon color="success" /> : <UnpublishedIcon color="error" />}</td>
                            <td>
                                {document?.verificado === 0 ?
                                    <button className='me-2 btn btn-success' onClick={() => verify(document)}>Verificar</button>
                                    :
                                    <button className='btn btn-primary' onClick={() => view(document)}>Ver</button>
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}