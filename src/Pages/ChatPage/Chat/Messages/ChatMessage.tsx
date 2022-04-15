import React from "react";
import {ChatMessageType} from "../../../../Redux/chat-reducer";

export const ChatMessage: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo} width={'30px'} alt={'user image'}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})