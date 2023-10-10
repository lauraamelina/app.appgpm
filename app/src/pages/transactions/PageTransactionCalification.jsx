import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import * as TransactionService from '../../services/transactions.service'
import { useParams, useNavigate } from "react-router-dom";
import * as AuthService from '../../services/auth.service'

export default function PageTransactionCalification() {
    let navigate = useNavigate()
    const { id } = useParams()
    const userId = AuthService.getUserId()
    const [transaction, setTransaction] = useState([])
    const [calification, setCalification] = useState([])
    const [rating, setRating] = useState(3)
    const [comment, setComment] = useState('')
    const [typeUser, setTypeUser] = useState(transaction?.vendedor_id === userId ? 'vendedor' : 'comprador')

    useEffect(() => {
        TransactionService.getTransactionById(id)
            .then(response => {
                setTransaction(response.data)
                setCalification(response.data?.calification)
                setTypeUser(response.data?.vendedor_id === userId ? 'vendedor' : 'comprador')
            })
            .catch(error => {
                console.log(error)
            })
    }, [id, userId])

    useEffect(() => {
        if (transaction.length !== 0) {
            const isSeller = transaction?.vendedor_id === userId;
            const isBuyer = transaction?.comprador_id === userId;

            if (!isSeller && !isBuyer) {
                Swal.fire({
                    icon: 'error',
                    title: 'No tienes permiso para ver esta pagina',
                    showConfirmButton: false,
                    confirmButtonColor: '#145388'
                });
                navigate(`/dashboard/transactions/${id}`);
            }
        }
    }, [transaction, userId, navigate, id]);

    function handleCalification() {
        Swal.fire({
            title: '¿Estas seguro de calificar esta transaccion?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Calificar`,
            denyButtonText: `No calificar`,
            confirmButtonColor: '#145388'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = new FormData();
                data.append('calification', rating)
                data.append('comentario', comment)
                TransactionService.calificateTransaction(id, data)
                    .then(response => {
                        console.log(response)
                        Swal.fire({
                            icon: 'success',
                            title: 'Calificacion exitosa',
                            showConfirmButton: false,
                        })
                        navigate(`/dashboard/transactions/${id}`)
                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al calificar',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }
        })

    }

    return (
        <main className="text-center calification">
            {(typeUser === 'vendedor' && !calification?.estado_vendedor) || (typeUser === 'comprador' && !calification?.estado_comprador) ?
                <div className="text-center">
                    <h1>Califica tu experiencia {typeUser && 'como ' + typeUser} </h1>
                    <div className="d-flex justify-content-center">
                        <Stack spacing={2}>
                            <Rating name="size-large" defaultValue={5} size="large" onChange={(event, newValue) => { setRating(newValue) }} />
                            <TextField id="outlined-basic" label="Comentario" variant="outlined" onChange={(event) => { setComment(event.target.value) }} multiline rows={4} />
                            <button className="btn btn-primary" onClick={handleCalification}>Calificar</button>
                        </Stack>
                    </div>
                </div>
                : <h1>¡Ya calificaste esta transaccion!</h1>
            }
            {calification?.estado_vendedor === 1 && (
                <div className="group">
                    <h2> {typeUser === 'vendedor' ? 'Tu calificación' : 'Calificacion del vendedor'} </h2>
                    <Rating name="read-only" value={calification?.estrellas_vendedor} readOnly />
                    <p>{calification?.comentario_vendedor}</p>
                </div>
            )}

            {calification?.estado_comprador === 1 && (
                <div className="group">
                    <h2> {typeUser === 'comprador' ? 'Tu calificación' : 'Calificacion del comprador'} </h2>
                    <Rating name="read-only" value={calification?.estrellas_comprador} readOnly />
                    <p>{calification?.comentario_comprador}</p>
                </div>
            )}
            <button className="btn btn-secondary mt-3" onClick={() => navigate(`/dashboard/transactions/${id}`)}>Volver a la transacción</button>
        </main>

    )
}