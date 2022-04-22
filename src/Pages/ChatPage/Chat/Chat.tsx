import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {StatusType} from "../../../API/chat-api";
import {startMessagesListening, stopMessagesListening} from "../../../Redux/Reducers/chat-reducer";
import {Messages} from "./Messages/Messages";
import {AddChatMessageForm} from "./Messages/AddChatMessageForm";
import s from "./../ChatPage.module.css"

export const Chat: React.FC = () => {

    const dispatch = useDispatch()
    const status = useSelector<AppStateType, StatusType>(state => state.chat.status)

    useEffect(() => {

        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }

    }, [])

    return (
        <div className={s.chatPageBlock}>
            {status === 'error' && <div>Some error occurred. Please, refresh the page</div>}
            <>
                <Messages/>
                <AddChatMessageForm/>
            </>

        </div>
    )
}