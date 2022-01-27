import React from 'react';
import s from "./Header.module.css"
import logo from './headerLogo.png'
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean
    login: string

}

const Header = (props: any) => {
    return <header className={s.header}>
        <img
            src={logo} alt={"img"}/>
        <div className={s.loginBlock}>
            {props.isAuth ? props.login
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;