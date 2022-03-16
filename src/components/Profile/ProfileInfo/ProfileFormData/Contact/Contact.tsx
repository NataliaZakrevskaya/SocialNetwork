import s from "../../ProfileInfo.module.css";
import React from "react";

export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}