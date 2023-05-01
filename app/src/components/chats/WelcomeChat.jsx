import React from "react";
import ChatMobile from '../../assets/img/chat_mobile.svg'

export default function WelcomeChat() {
    return (
        <div className="welcome__chat">
            <h2>¡Bienvenido!</h2>
            <p>Selecciona una conversación para comenzar a chatear</p>

            <img src={ChatMobile} alt="Chat" />

        </div>
    )
}