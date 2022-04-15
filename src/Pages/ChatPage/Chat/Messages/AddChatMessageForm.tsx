import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import {StatusType} from "../../../../api/chat-api";
import {sendMessage} from "../../../../Redux/chat-reducer";
import s from "../../ChatPage.module.css";

export const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector<AppStateType, StatusType>(state => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div className={s.addChatMessageForm}>

                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}
                          className={s.textField}
                          placeholder={'Write your message...'}
                ></textarea>
                <button
                    disabled={status !== 'ready'}
                    onClick={sendMessageHandler}
                >Send</button>

        </div>
    )
}