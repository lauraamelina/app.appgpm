import React from 'react'

export default function Files({ files }) {
    function formattedDate(date) {
        const newDate = new Date(date)
        return newDate.toLocaleDateString()
    }

    return (
        <section>
            {files.length > 0 &&
                <div className='table-files'>
                    <h3>Archivos</h3>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Fecha</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files?.map(file => (
                                <tr key={file.id}>
                                    <td>{file.id}</td>
                                    <td>{file.titulo}</td>
                                    <td>{file.descripcion}</td>
                                    <td>{formattedDate(file.created_at)}</td>
                                    <td>
                                        <a className='btn btn-success' rel="noreferrer" href={`https://api.appgpm.com/public/files/transactions/${file.archivo}`} target='_blank'>Abrir</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            }
            {files.length === 0 &&
                <div className='not-exist'>
                    <h3>No hay archivos</h3>
                </div>
            }
        </section>

    )
}