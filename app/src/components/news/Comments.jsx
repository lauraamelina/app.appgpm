import React, { useState } from "react";
import Swal from 'sweetalert2'
import * as NewsService from '../../services/news.service'

export default function Comments({ comments, idNew }) {
    const [comment, setComment] = useState('')

    function getImage(image) {
        if (image) {
            return `https://api.appgpm.com/files/img/${image}`
        } else {
            return
        }
    }

    function formattedDate(date) {
        const newDate = new Date(date)
        const day = newDate.getDate()
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        return `${day}/${month}/${year}`
    }

    function addComment() {
        if (comment !== '') {
            Swal.fire({
                title: '¿Quieres publicar este comentario?',
                text: `"${comment}"`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#145388',
                cancelButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    NewsService.addComment(idNew, comment)
                        .then((res) => {
                            setComment('')
                            if (res.status === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Comentario publicado!',
                                    confirmButtonColor: '#145388',

                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload()
                                    }
                                })

                            } else {
                                Swal.fire(
                                    '¡Error!',
                                    'Ha ocurrido un error al publicar tu comentario',
                                    'error'
                                )
                            }

                        })
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes publicar un comentario vacío',
            })
        }

    }

    return (
        <div className="comments">
            {comments?.length > 0 && <h3>Comentarios</h3>}
            {comments?.length > 0 && (
                comments?.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <div className="comment-header">
                            <p className="name">{comment.user.name}</p>
                            <p className="date">{formattedDate(comment.created_at)}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.comentarios}</p>
                        </div>
                        <img src={getImage(comment?.user?.avatar)} alt="Foto de perfil de usuario" />
                    </div>
                ))
            )}

            <div className="mt-5">
                <h4 className="text-center">Añadir comentario</h4>
                <label className="form-label" htmlFor="comment">Comentario</label>
                <textarea className="form-control" rows="3" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <div className="d-flex">
                    <button onClick={addComment} className="btn btn-primary mt-3 ms-auto">Publicar</button>
                </div>

            </div>
        </div>

    )
}