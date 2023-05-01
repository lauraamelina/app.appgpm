import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as ChatsService from '../../services/chats.service'
import SidebarConversations from "../../components/chats/SidebarConversations";
import ChatById from "../../components/chats/ChatById";
import { CircularProgress } from "@mui/material";
import Swal from 'sweetalert2'
import WelcomeChat from "../../components/chats/WelcomeChat";

export default function PageChats() {
    const location = useLocation()
    const [idChat, setIdChat] = useState(location?.state?.id)
    const [infoUser, setInfoUser] = useState([])
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        ChatsService.getChats()
            .then(res => {
                setChats(res.data)
            })

        ChatsService.getChat(idChat)
            .then(res => {
                setChat(res.data)
                setLoading(false)
            })
        //eslint-disable-next-line
        chats.map(chat => {
            if (chat.id === idChat) {
                setInfoUser(chat)
            }
        })
        //eslint-disable-next-line
    }, [idChat])

    function onSubmit(id, content) {
        ChatsService.sendMessage(id, content)
            .then(res => {
                if (res.status === 200) {
                    ChatsService.getChat(idChat)
                        .then(res => {
                            setChat(res.data)
                        })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo enviar el mensaje, intenta de nuevo',
                    })
                }
            })
    }

    return (
        <main className="container chats">
            <h1 className="visually-hidden">Chats</h1>

            <div className="row">
                <div className="col-12 col-md-4">
                    <SidebarConversations chats={chats} setIdChat={setIdChat} />
                </div>

                {loading &&
                    <div className="col-12 col-md-8 text-center my-5">
                        <CircularProgress />
                    </div>
                }

                {!loading && !chat.length &&
                    <div className="col-12 col-md-8">
                       <WelcomeChat />
                    </div>
                }

                {!loading && chat.length &&
                    <div className="col-12 col-md-8">
                        <ChatById chat={chat} infoUser={infoUser} onSubmit={onSubmit}/>
                    </div>
                }
            </div>
        </main>

    )
}