import React from 'react'
import s from '../Dialogs.module.scss'



const DialogItem = (props: DialogsType) => {

    const showMessages = () => {
        props.showMessages(props.id)
    }

    return (
        <div className={props.id !== props.activeUserID ? s.dialog : `${s.dialog} ${s.activeDialog}`} onClick={showMessages}>
            <img className={s.dialogImg}
                 src={props.avatar}
                 alt={"dialogProfilePhoto"}/>
            <span>{props.name}</span>
        </div>
    )
}

export default DialogItem;

// TYPES
type DialogsType = {
    name: string
    id: number
    avatar: string
    activeUserID: number | null
    showMessages: (userID: number) => void
}