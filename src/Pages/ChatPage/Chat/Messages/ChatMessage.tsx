import React from "react";
import {ChatMessageType} from "../../../../Redux/Reducers/chat-reducer";
import s from "./../../ChatPage.module.css";
import userDefaultPhoto from "./../../../../Images/flat-face-icon-23.png"
import {NavLink} from "react-router-dom";

export const ChatMessage: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return (
        <div className={s.message}>
            <div className={s.userInfoContainer}>
                <NavLink to={'/profile/' + message.userId}>
                <img
                    src={message.photo !== null ? message.photo : userDefaultPhoto}
                    alt={'user image'}
                />
                </NavLink>
                <span>{message.userName}</span>

            </div>
            <span className={s.messageText}>{message.message}</span>
        </div>
    )
})