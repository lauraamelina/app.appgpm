import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ChatsService from '../../services/chats.service'
import ForumIcon from '@mui/icons-material/Forum';
import ImgGenerica from '../../assets/img/img_generica.png'
import { CircularProgress } from "@mui/material";

export default function ChatsModal() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)

    const getImage = (avatar) => {
        if (avatar) {
            return `https://api.appgpm.com/files/img/${avatar}`
        } else {
            return ImgGenerica
        }
    }

    useEffect(() => {
        setIsCollapsed(true)
        setLoading(true)
        ChatsService.getChats()
            .then(res => {
                setChats(res.data)
                setLoading(false)
            })
    }, [])

    return (
        <div className="modalChats" onClick={() => setIsCollapsed(!isCollapsed)}>
            {!isCollapsed &&
                <div className="content">
                    <p className="h2 mb-4">Chats</p>
                    <div>
                        {loading &&
                            <div className="text-center">
                                <CircularProgress />
                            </div>
                        }
                        {!loading && chats.map((chat, index) => {
                            return (
                                <Link to={{ pathname: '/dashboard/chats', state: { id: chat.id } }} key={index}>
                                    <div className="chat" >
                                        <img src={getImage(chat.avatar)} alt={chat.name} />
                                        <p>{chat.name}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            }

            <div className="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
                <ForumIcon />
            </div>
        </div>
    )


}