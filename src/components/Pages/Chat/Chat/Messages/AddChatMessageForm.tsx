import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../../Redux/redux-store";
import {StatusType} from "../../../../../API/chat-api";
import style from "../../ChatPage.module.scss";
import {Nullable} from "../../../../../types";
import {WRITE_MESSAGE} from "../../../../../constants";

export const AddChatMessageForm: React.FC = () => {

    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<Nullable<boolean>>(null);
    const dispatch = useDispatch();
    const status = useSelector<AppStateType, StatusType>(state => state.chat.status);

    const validate = () => {message.trim().length > 0 ? sendMessage(message) : setError(true)}
    const sendMessage = (message: string) => {
        dispatch(sendMessage(message))
        setMessage('')
    }
    const onTextareaKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.code === 'Enter') validate()
    }
    const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
        setError(false)
    }

    return (
        <div className={style.addChatMessageForm}>
                <textarea onChange={onTextareaChange}
                          value={message}
                          className={!error ? style.textField : `${style.textField} ${style.errorField}`}
                          placeholder={WRITE_MESSAGE}
                          onKeyPress={onTextareaKeyPress}
                />
            {error && <span className={style.errorSpan}>Min length is 1 symbol</span>}
                <button
                    disabled={status !== 'ready'}
                    onClick={validate}
                >Send</button>
        </div>
    )
}