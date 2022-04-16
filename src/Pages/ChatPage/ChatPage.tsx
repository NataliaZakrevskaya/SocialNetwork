import React from "react";
import {Chat} from "./Chat/Chat";
import s from "./ChatPage.module.css";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";

const ChatPage: React.FC = () => {

   const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    if (!isAuth) {
        return <Navigate to='/login'/>
    }
    return (
        <div className={s.chatPage}>
            <Chat/>
        </div>
    )
}


export default ChatPage;