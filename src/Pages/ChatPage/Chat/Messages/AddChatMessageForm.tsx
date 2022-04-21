import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import {StatusType} from "../../../../api/chat-api";
import {sendMessage} from "../../../../Redux/chat-reducer";
import s from "../../ChatPage.module.css";

export const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<boolean | null>(null)
    const dispatch = useDispatch()
    const status = useSelector<AppStateType, StatusType>(state => state.chat.status)

    const onEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.code === 'Enter') validate()

    }
    const validate = () => {
        {
            message.trim().length > 0 ? sendMessageHandler(message) : setError(true)
        }
    }
    const sendMessageHandler = (message: string) => {
        dispatch(sendMessage(message))
        setMessage('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
        setError(false)
    }

    return (
        <div className={s.addChatMessageForm}>
                <textarea onChange={onChangeHandler}
                          value={message}
                          className={!error ? s.textField : s.errorField}
                          placeholder={'Write your message...'}
                          onKeyPress={onEnter}
                />
            {error && <span className={s.errorSpan}>Min length is 1 symbol</span>}
                <button
                    disabled={status !== 'ready'}
                    onClick={validate}
                >Send</button>

        </div>
    )
}