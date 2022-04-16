import React from "react";
import s from "../../ProfileInfo.module.css";


export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}: </b>
            <a href={contactValue} className={s.link} target="_blank">{contactValue}</a>
        </div>
    )
}

// TYPES
type ContactPropsType = {
    contactTitle: string
    contactValue: string
}