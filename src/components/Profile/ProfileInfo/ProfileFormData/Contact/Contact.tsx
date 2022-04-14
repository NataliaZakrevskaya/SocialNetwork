import s from "../../ProfileInfo.module.css";
import React from "react";
import {Link} from "react-router-dom";

export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}: </b>
            <a href={contactValue} className={s.link} target="_blank">{contactValue}</a>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}