import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import style from "../Dialogs.module.scss";
import {WRITE_MESSAGE} from "../../../../constants";
import {AddMessageFormPropsType} from "../../types";


export const AddMessageForm = (props: AddMessageFormPropsType) => {

    const [messageText, setMessageText] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const validate = () => messageText.trim().length > 0 ? addMessage(messageText) : setError(true)
    const addMessage = (messageText: string) => {
        props.addNewMessage(props.userID, messageText)
        setMessageText('')
    }
    const onTextareaKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.code === 'Enter') validate()
    }
    const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(e.currentTarget.value)
        setError(false)
    }

    return (
        <div className={style.addMessageFormBlock}>
            <div className={style.addMessageFormContainer}>
                <div className={style.addMessageForm}>
                <textarea
                    value={messageText}
                    placeholder={WRITE_MESSAGE}
                    className={!error ? style.textField : `${style.textField} ${style.errorField}`}
                    onChange={onTextareaChange}
                    onKeyPress={onTextareaKeyPress}
                />
                    {error && <span className={style.errorSpan}>Min length is 1 symbol</span>}
                </div>
                <button disabled={!props.userID} onClick={validate} >Send</button>
            </div>
        </div>
    )
}
