import React from 'react'
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import dialogProfileImg from './dilaogProfileImg.png'

type DialogsType = {
    name?: string
    id?: number
}


const DialogItem = (props: DialogsType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img className={s.dialogImg}
                 src={dialogProfileImg}
                 alt={"dialogProfilePhoto"}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;