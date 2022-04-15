import React from "react";
import {ChatMessageType} from "../../../../Redux/chat-reducer";
import s from "./../../ChatPage.module.css";
import userDefaultPhoto from "./../../../../Images/flat-face-icon-23.png"

export const ChatMessage: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return (
        <div className={s.message}>
            <div className={s.userInfoContainer}>
                <img src={message.photo !== null ? message.photo : userDefaultPhoto} alt={'user image'}/>
                <span>{message.userName}</span>
            </div>
            <span className={s.messageText}>{message.message}</span>
        </div>
    )
})