import React from 'react';
import s from "./Header.module.css"
import logo from './../../Images/Social network.png'
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}


const Header = ({login, logout, isAuth}: HeaderPropsType) => {
    return <header className={s.header}>
        <img
            src={logo} alt={"logo"}/>
        <div className={s.loginBlock}>
            {
                isAuth
                    ? <div>{login}
                        <button onClick={logout}>Log out</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header;