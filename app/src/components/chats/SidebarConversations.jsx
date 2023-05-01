import React from 'react'
import { Link } from 'react-router-dom'

export default function SidebarConversations({ chats, setIdChat }) {
    return (
        <div className="sidebar__conversations">
            <h2>Conversaciones</h2>
            {chats.map(chat => {
                return (
                    <Link onClick={() => setIdChat(chat.id)} key={chat.id}>
                        <div className="sidebar__conversation">
                            <img src={`https://api.appgpm.com/files/img/${chat.avatar}`} alt={chat.name} />
                            <p>{chat.name}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}