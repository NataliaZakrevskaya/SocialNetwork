import React from 'react'
import s from '../Dialogs.module.scss'



const Message = (props: MessageType) => {

    return (
        <div>
                <span className={props.isAuth ? `${s.message} ${s.isAuthMessages}` : s.message}>{props.message}</span>
        </div>
    )
}

export default Message;

// TYPES
type MessageType = {
    id: string
    message: string
    isAuth: boolean
}