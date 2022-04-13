import s from "../../ProfileInfo.module.css";
import React from "react";

export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return (
        <div className={`${s.contact} ${!!contactValue ? s.withLinks : s.withoutLinks}`}>
            <b>{contactTitle}</b>: {!!contactValue ? contactValue : 'no info'}
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}