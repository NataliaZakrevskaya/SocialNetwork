import React from "react";
import {Chat} from "./Chat/Chat";
import s from "./ChatPage.module.css";

const ChatPage: React.FC = () => {
    return (
        <div className={s.chatPage}>
            <Chat/>
        </div>
    )
}


export default ChatPage;