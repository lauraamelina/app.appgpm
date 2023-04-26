import React, { useState, useEffect } from 'react'
import * as AuthService from '../../services/auth.service'
import * as TransactionsService from '../../services/transactions.service'
import * as SequencesService from '../../services/sequences.service'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FolderIcon from '@mui/icons-material/Folder';
import UploadIcon from '@mui/icons-material/Upload';
import EmailIcon from '@mui/icons-material/Email';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Swal from 'sweetalert2'

import OperationStatus from './OperationStatus'
import Files from './Files'
import UploadFiles from './UploadFiles'
import Services from './Services'
import ConnectedServices from './ConnectedServices'



export default function ContentTransaction({ transaction }) {
    const user = AuthService.getUserId()
    const [index, setIndex] = useState(0);
    const [typeUser, setTypeUser] = useState(0)
    const [state, setState] = useState(transaction?.estado)
    const [sequences, setSequences] = useState([])
    const [dataSequences, setDataSequences] = useState([])
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        if (transaction?.vendedor_id === user) {
            setTypeUser(0)
        }
        if (transaction?.comprador_id === user) {
            setTypeUser(1)
        }
        setState(transaction?.estado)
        TransactionsService.getSequences(transaction.id)
            .then(response => {
                setLoading(false)
                if (response.status === 200) {
                    setSequences(response.data)
                }
            })
        SequencesService.getSequences()
            .then(response => {
                setLoading(false)
                if (response.status === 200) {
                    setDataSequences(response.data)
                }
            })

        TransactionsService.getFiles(transaction?.id)
            .then(response => {
                setLoading(false)
                if (response.status === 200) {
                    setFiles(response.data)
                } else {
                    setFiles([])
                }
            })
        // eslint-disable-next-line
    }, [transaction]);


    const updateIndex = (index) => {
        setIndex(index)
    }

    function finishOparationBuyer() {
        Swal.fire({
            title: '¿Estás seguro de finalizar la operación?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#145388',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar!'
        }).then((result) => {
            if (result.isConfirmed) {
                TransactionsService.finishOperation(transaction.id)
                    .then(response => {
                        if (response.status === 200) {
                            setState(2)
                            Swal.fire(
                                'Finalizada!',
                                'La operación ha sido finalizada.',
                                'success'
                            )
                        } else {
                            Swal.fire(
                                'Error!',
                                'No se pudo finalizar la operación.',
                                'error'
                            )
                        }

                    })
            }
        })

    }

    return (
        <div>
            <div className="btns-transactions">
                <button className="btn" onClick={e => updateIndex(0)}>
                    <TrendingUpIcon />
                    <span>Estado de la operación</span>
                </button>
                <button className="btn" onClick={e => updateIndex(1)}>
                    <FolderIcon />
                    <span>Archivos</span>
                </button>
                {typeUser === 0 && (
                    <button className="btn" onClick={e => updateIndex(2)}>
                        <UploadIcon />
                        <span>Subir archivos</span>
                    </button>
                )}
                <button className="btn" onClick={e => updateIndex(3)}>
                    <EmailIcon />
                    <span>Servicios</span>
                </button>
                <button className="btn" onClick={e => updateIndex(4)}>
                    <SummarizeIcon />
                    <span>Servicios Conectados</span>
                </button>
            </div>

            <div className="content-transactions">
                {index === 0 && <OperationStatus transaction={transaction} typeUser={typeUser} sequences={sequences} dataSequences={dataSequences} loading={loading} />}
                {index === 1 && <Files files={files} />}
                {index === 2 && <UploadFiles transaction={transaction} />}
                {index === 3 && <Services transaction={transaction} typeUser={typeUser} />}
                {index === 4 && <ConnectedServices transaction={transaction} typeUser={typeUser} />}
            </div>

            {typeUser === 1 && state === 1 && (
                <div className='finalizar-operacion text-center'>
                    <h3>La operación está activa</h3>
                    <p>Confirma que has recibido el producto y finaliza la operación</p>
                    <button onClick={finishOparationBuyer} className="btn btn-primary">Finalizar operación</button>
                </div>
            )}

        </div>
    )
}
