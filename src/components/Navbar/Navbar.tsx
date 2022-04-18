import React from 'react';
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";

const Navbar = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)


    return (
        <nav className={isAuth ? s.navPage : s.withoutAuth}>
            {isAuth &&
                <div className={s.navContainer}>
                    <div className={s.item}>
                        <NavLink className={(navData) => navData.isActive ? s.activeLink : ""}
                                 to="/profile">Profile</NavLink>
                    </div>
                    <div className={`${s.item} ${s.active} `}>
                        <NavLink className={(navData) => navData.isActive ? s.activeLink : ""}
                                 to="/users">Users</NavLink>
                    </div>
                    <div className={`${s.item} ${s.active} `}>
                        <NavLink className={(navData) => navData.isActive ? s.activeLink : ""}
                                 to="/dialogs">Messages</NavLink>
                    </div>
                    <div className={`${s.item} ${s.active} `}>
                        <NavLink className={(navData) => navData.isActive ? s.activeLink : ""} to="/chat">Chat</NavLink>
                    </div>
                </div>}
        </nav>
    )
}

export default Navbar;