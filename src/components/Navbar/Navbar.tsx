import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

import {AppStateType} from "../../Redux/redux-store";
//@ts-ignore
import s from "./Navbar.module.scss";

const Navbar = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    return (
        <nav className={isAuth ? s.navPage : ''}>
            {isAuth &&
                <div className={s.navContainer}>
                    <NavLink className={(navData) => navData.isActive ? s.activeLink : ""}
                             to="/profile">Profile</NavLink>
                    <NavLink className={(navData) => navData.isActive ? s.activeLink : ""}
                             to="/users">Users</NavLink>
                    <NavLink className={(navData) => navData.isActive ? s.activeLink : ""}
                             to="/dialogs">Messages</NavLink>
                    <NavLink className={(navData) => navData.isActive ? s.activeLink : ""} to="/chat">Chat</NavLink>
                </div>}
        </nav>
    )
}

export default Navbar;