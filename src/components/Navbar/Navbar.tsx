import React from 'react';
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink className={(navData) => navData.isActive ? s.activeLink : ""} to="/profile">Profile</NavLink>
        </div>
        <div className={`${s.item} ${s.active} `}>
            <NavLink className={(navData) => navData.isActive ? s.activeLink : ""} to="/users">Users</NavLink>
        </div>
        <div className={`${s.item} ${s.active} `}>
            <NavLink className={(navData) => navData.isActive ? s.activeLink : ""} to="/dialogs">Messages</NavLink>
        </div>
        <div className={`${s.item} ${s.active} `}>
            <NavLink className={(navData) => navData.isActive ? s.activeLink : ""} to="/chat">Chat</NavLink>
        </div>
    </nav>
}

export default Navbar;