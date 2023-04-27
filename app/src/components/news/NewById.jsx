import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';
import * as AuthService from '../../services/auth.service'
import * as NewsService from '../../services/news.service'
import Comments from "./Comments";

export default function NewById({ newById }) {
    const idUser = AuthService.getUserId();
    const [likeUser, setLikeUser] = useState(false)
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])


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

    useEffect(() => {
        if (newById?.interactions) {
            newById?.interactions.forEach((interaction) => {
                if (interaction.user_id === idUser) {
                    setLikeUser(true)
                }
                setLikes(newById?.interactions.length);
            })
        }

        if (newById?.comments) {
            setComments(newById?.comments?.data)
        }

    }, [newById, idUser])

    function updateLike() {
        if (likeUser) {
            NewsService.deleteLike(newById?.id)
                .then((res) => {
                    if (res.status === 200) {
                        setLikeUser(false)
                        setLikes(likes - 1)
                    }
                })
        } else {
            NewsService.addLike(newById?.id)
                .then((res) => {
                    if (res.status === 200) {
                        setLikeUser(true)
                        setLikes(likes + 1)
                    }
                })
        }
    }



    return (
        <section className="newId">
            <div className="post">
                {newById?.archivo && <div className="img">
                    <img src={getImage(newById?.archivo)} alt={newById?.title} />
                </div>}
                <div className="header">
                    <h2>{newById?.title ? newById?.title : newById.nombre_producto?.nombre}</h2>
                    <p className="autor">Publicado por {newById?.author?.name}</p>
                    <p className="date">Publicado el {formattedDate(newById?.created_at)}</p>
                </div>
                <div className="content">
                    <p>{newById?.descripcion}</p>
                    <div dangerouslySetInnerHTML={{ __html: newById?.contenido }}></div>
                </div>
            </div>
            <div className="interactions">
                <div className="likes">
                    <p>{likeUser ? <FavoriteIcon onClick={updateLike} /> : <FavoriteBorderIcon onClick={updateLike} />} {likes} {likes === 1 ? 'Me gusta' : 'Me gustas'} </p>
                </div>

                <div className="comments">
                    <p><ForumIcon /> {comments.length} {comments.length === 1 ? 'Comentario' : 'Comentarios'}</p>
                </div>
            </div>
            <Comments comments={comments} idNew={newById?.id} />
        </section>

    )
}