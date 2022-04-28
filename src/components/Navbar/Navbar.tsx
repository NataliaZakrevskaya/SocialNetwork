import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import style from "./Navbar.module.scss";
import {CHAT, DIALOGS, PROFILE, USERS} from "../../constants";
import {getIsAuth} from "../../Redux/Selectors/authSelectors/authSelectors";

const Navbar = () => {

  const isAuth = useSelector(getIsAuth);

  return (
    <nav className={isAuth ? style.navPage : ''}>
      {isAuth &&
          <div className={style.navContainer}>
              <NavLink className={(navData) => navData.isActive ? style.activeLink : ""}
                       to={PROFILE}>Profile</NavLink>
              <NavLink className={(navData) => navData.isActive ? style.activeLink : ""}
                       to={USERS}>Users</NavLink>
              <NavLink className={(navData) => navData.isActive ? style.activeLink : ""}
                       to={DIALOGS}>Messages</NavLink>
              <NavLink className={(navData) => navData.isActive ? style.activeLink : ""} to={CHAT}>Chat</NavLink>
          </div>}
    </nav>
  )
}

export default Navbar;