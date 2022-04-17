import React from 'react'
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import dialogProfileImg from './dilaogProfileImg.png'



const DialogItem = (props: DialogsType) => {
    let path = "/dialogs/" + props.id;

    const showMessages = () => {
        props.showMessages(props.id)
    }

    return (
        <div className={s.dialog + ' ' + s.active} onClick={showMessages}>
            <img className={s.dialogImg}
                 src={props.avatar}
                 alt={"dialogProfilePhoto"}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;

// TYPES
type DialogsType = {
    name: string
    id: number
    avatar: string
    showMessages: (userID: number) => void
}