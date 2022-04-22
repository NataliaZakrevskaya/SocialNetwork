import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import s from "../Dialogs.module.scss";


export const AddMessageForm = (props: AddMessageFormPropsType) => {

    const [messageText, setMessageText] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.code === 'Enter') validate()

    }
    const validate = () => messageText.trim().length > 0 ? addMessage(messageText) : setError(true)
    const addMessage = (messageText: string) => {
        props.addNewMessage(props.userID, messageText)
        setMessageText('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(e.currentTarget.value)
        setError(false)
    }

    return (
        <div className={s.addMessageFormBlock}>
            <div className={s.addMessageFormContainer}>
                <div className={s.addMessageForm}>
                <textarea
                    value={messageText}
                    placeholder={"Enter your message..."}
                    className={!error ? s.textField : `${s.textField} ${s.errorField}`}
                    onChange={onChangeHandler}
                    onKeyPress={onEnter}
                />
                    {error && <span className={s.errorSpan}>Min length is 1 symbol</span>}
                </div>
                <button disabled={!props.userID} onClick={validate} >Send</button>
            </div>
        </div>
    )
}

// TYPES
type AddMessageFormPropsType = {
    userID: number | null
    addNewMessage: (userID: number | null, newMessage: string) => void
}
