import React, { useEffect, useState, useLayoutEffect } from 'react'
import * as AuthService from '../../services/auth.service'
import * as ChatService from '../../services/chats.service'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import SendIcon from '@mui/icons-material/Send';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import * as SocketService from '../../services/socket.service'
import WelcomeChat from './WelcomeChat';

export default function ChatById({ chat, infoUser, onSubmit }) {
    const [userId, setUserId] = useState(0)
    const [isUserInChat, setUserInChat] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const groupMessagesByDate = (messages) => {
        const groups = [];
        messages.forEach((message) => {
            const messageDate = new Date(message.created_at).toDateString();
            const groupIndex = groups.findIndex((group) => group.date === messageDate);
            if (groupIndex === -1) {
                groups.push({ date: messageDate, messages: [message] });
            } else {
                groups[groupIndex].messages.push(message);
            }
        });
        return groups;
    };
    const [groupedMessages, setGroupedMessages] = useState(groupMessagesByDate(chat))

    useLayoutEffect(() => {
        const messages = document.querySelector('.messages');
        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    }, [groupedMessages]);

    useEffect(() => {
        setUserId(AuthService.getUserId())
        setUserInChat(chat.some(chat => {
            return chat.from_user === userId || chat.to_user === userId
        }))

        setGroupedMessages(groupMessagesByDate(chat));

        SocketService.listen('new-message').subscribe((data) => {
            setGroupedMessages((prevGroupedMessages) => {
                const newGroupedMessages = [...prevGroupedMessages];
                const lastGroup = newGroupedMessages[newGroupedMessages.length - 1];
                const lastMessage = lastGroup.messages[lastGroup.messages.length - 1];
                if (lastMessage && lastMessage.from_user === data.from_user) {
                    lastGroup.messages.push(data);
                } else {
                    newGroupedMessages.push({
                        date: new Date(data.created_at).toDateString(),
                        messages: [data],
                    });
                }
                return newGroupedMessages;
            });
        });

        const id = chat[0].from_user;
        ChatService.viewed(id);

        return () => {
            SocketService.removeAllListeners('new-message');
        };

    }, [chat, userId])

    const formatDate = (date) => {
        const today = new Date()
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        if (today.toDateString() === dateObj.toDateString()) {
            return 'Hoy';
        }

        return `${day}/${month}/${year}`;
    };
    const formatTime = (date) => {
        const dateObj = new Date(date);
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    if (!isUserInChat) {
        return <WelcomeChat />
    }

    const getView = (message) => {
        if (message?.viewed) {
            return <DoneAllIcon />
        } else {
            return <DoneIcon />
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (message) {
            setLoading(true)
            const idToUser = chat[0]?.to_user

            const dataMessage = {
                identity: JSON.parse(localStorage.getItem('identity')),
                user: infoUser,
                content: message
            }
            SocketService.emit('send-message', dataMessage)

            onSubmit(idToUser, message)
            setTimeout(() => {
                setMessage('')
                setLoading(false)
            }, 1000)
        }
    }

    return (
        <div className="chatById">
            <div className="chat-header">
                <h2>{infoUser.name}</h2>
                <img
                    src={`https://api.appgpm.com/files/img/${infoUser.avatar}`}
                    alt={infoUser.name}
                />
            </div>
            <div className="messages">
                {groupedMessages.map((group, index) => (
                    <React.Fragment key={group.date}>
                        <div className="chat-date">{formatDate(group.date)}</div>
                        {group.messages.map((message, messageIndex) => (
                            <div className="chat" key={`${group.date}-${messageIndex}`}>
                                <div className={`chat_message ${message.from_user === userId ? 'from' : 'to'}`}>
                                    <p className='mb-0'>{message.content}</p>
                                    <span className='date'>{formatTime(message.created_at)} {message.from_user === userId && getView(message)}</span>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div className="send-message">
                <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
                <div className="icons">
                    {loading && <ScheduleSendIcon />}
                    {!loading && <SendIcon onClick={handleSubmit} />}
                </div>
            </div>

        </div>
    );
}
