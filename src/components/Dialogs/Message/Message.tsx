import React from 'react'
import s from './../Dialogs.module.css'

type MessageType = {
    id: string
    message: string
    isAuth: boolean
}

const Message = (props: MessageType) => {

    return (
        <div>
                <span className={props.isAuth ? s.isAuthMessages : s.message}>{props.message}</span>
        </div>
    )
}

export default Message;