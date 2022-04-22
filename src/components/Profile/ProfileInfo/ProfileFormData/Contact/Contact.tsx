import React from "react";
import s from "../../ProfileInfo.module.scss";


export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}: </b>
            <a href={contactValue} rel={"noreferrer"} target="_blank">{contactValue}</a>
        </div>
    )
}

// TYPES
type ContactPropsType = {
    contactTitle: string
    contactValue: string
}