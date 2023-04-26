import React from 'react'
import * as TransactionsService from '../../services/transactions.service'
import Swal from 'sweetalert2'
import TimelineSequences from './TimelineSequences'
import { CircularProgress } from '@mui/material'

export default function OperationStatus({ transaction, typeUser, sequences, dataSequences, loading }) {
    const htmlAddSequence = `
            <div>
                <label style="display: block; text-align: left;margin-bottom: .5em;">Estado</label>
                <select id="sequence" style="display: block; width: 100%; padding: 0.375rem 0.75rem; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529; background-color: #fff; background-clip: padding-box; appearance: none; border-radius: 0.375rem; margin-bottom: 1em;">
                    <option value="" disable>Selecciona una secuencia</option>
                        ${dataSequences.map(sequence =>
        `<option key=${sequence.id} value="${sequence.id}">${sequence.nombre}</option>`
    )}
                </select>
            </div>

            <div>
                <label style="display: block; text-align: left;margin-bottom: .5em;"> Ubicación</label>
                <input type="text" id="ubication" style="display: block; width: 100%; padding: 0.375rem 0.75rem; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529; background-color: #fff; background-clip: padding-box; border: 1px solid #ced4da; appearance: none; border-radius: 0.375rem; margin-bottom: 1em;">
            </div>

            <div>
                <label style="display: block; text-align: left; margin-bottom: .5em;"> Descripción</label>
                <input type="text" id="description" style="display: block; width: 100%; padding: 0.375rem 0.75rem; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529; background-color: #fff; background-clip: padding-box; border: 1px solid #ced4da; appearance: none; border-radius: 0.375rem; margin-bottom: 1em;">
            </div>

    `
    const addSequence = () => {
        Swal.fire({
            title: 'Agregar secuencia',
            html: htmlAddSequence,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            focusConfirm: false,
            preConfirm: () => {
                const sequence = Swal.getPopup().querySelector('#sequence').value
                const ubication = Swal.getPopup().querySelector('#ubication').value
                const description = Swal.getPopup().querySelector('#description').value
                if (!sequence || !ubication || !description) {
                    Swal.showValidationMessage(`Por favor ingrese todos los datos`)
                }
                return { sequence: sequence, ubication: ubication, description: description }
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    TransactionsService.addSequence(transaction.id, result.value.sequence, result.value.ubication, result.value.description)
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire({
                                    title: 'Secuencia agregada',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar',
                                    confirmButtonColor: '#145388',
                                }).then((response) => {
                                    window.location.reload()
                                })
                               
                            } else {
                                Swal.fire({
                                    title: 'Error al agregar secuencia',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar',
                                    confirmButtonColor: '#145388',
                                })
                            }
                        })
                }
            })
    }


    return (
        <div>
            {!loading && sequences.length > 0 &&
                <>
                    <TimelineSequences sequences={sequences} />
                    {typeUser === 0 && <button onClick={addSequence} className='btn btn-primary'>Agregar secuencia</button>}
                </>
            }
            
            {!loading && sequences.length === 0 &&
                <div className="not-exist my-5">
                    <h3>No hay secuencias para mostrar</h3>
                    {typeUser === 0 && <button onClick={addSequence} className='btn btn-primary mt-3'>Agregar secuencias</button>}
                </div>
            }
            {loading && <div className="text-center my-3"><CircularProgress /></div>}


        </div>
    )
}