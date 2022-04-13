import s from "../../ProfileInfo.module.css";
import React from "react";
import {Link} from "react-router-dom";

export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}: </b>
            <Link to={contactValue} className={s.link}>{contactValue}</Link>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}