import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {StatusType} from "../../../api/chat-api";
import {startMessagesListening, stopMessagesListening} from "../../../Redux/chat-reducer";
import {Messages} from "./Messages/Messages";
import {AddChatMessageForm} from "./Messages/AddChatMessageForm";

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
        <div>
            {status === 'error' && <div>Some error occurred. Please, refresh the page</div>}
            <>
                <Messages/>
                <AddChatMessageForm/>
            </>

        </div>
    )
}