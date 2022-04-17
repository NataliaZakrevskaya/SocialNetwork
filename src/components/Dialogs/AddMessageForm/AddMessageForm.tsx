import React, {ChangeEvent, useState} from "react";
import s from "../Dialogs.module.css";




export const AddMessageForm = (props: AddMessageFormPropsType) => {

    const [messageText, setMessageText] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const validate = () => {
        {
            messageText.length > 0 ? addMessage(messageText) : setError(true)
        }
    }
    const addMessage = (messageText: string) => {
        props.addNewMessage(props.userID, messageText)
        setMessageText('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(e.currentTarget.value)
        setError(false)
    }

    return (
        <div className={s.addMessageForm}>
            <div className={s.addMessageContainer}>
                <textarea
                    value={messageText}
                    placeholder={"Enter your message..."}
                    className={!error ? s.textField : s.errorField}
                    onChange={onChangeHandler}
                />
            {error && <span className={s.errorSpan}>Min length is 1 symbol</span>}
            </div>
                <button disabled={!props.userID} onClick={validate}>Send</button>
        </div>
    )
}

// TYPES
type AddMessageFormPropsType = {
    userID: number | null
    addNewMessage: (userID: number | null, newMessage: string) => void
}
