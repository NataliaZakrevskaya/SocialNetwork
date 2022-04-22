import React from 'react';
import s from "./Header.module.css"
import logo from './../../Images/Social network.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {logout} from "../../Redux/Reducers/auth-reducer";


const Header = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const login = useSelector<AppStateType, string | null>(state => state.auth.data.login)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return <header className={s.header}>
        <div className={s.headerContainer}>
        <img
            src={logo} alt={"logo"}/>
        {
            isAuth
                ? (<div className={s.logoutBlock}>
                    <span>{login}</span>
                    <button onClick={logoutHandler}>Log out</button>
                </div>)
                : (<NavLink to={'/login'} className={s.login}>Login</NavLink>)
        }
        </div>
    </header>
}

export default Header;