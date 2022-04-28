import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {logout} from "../../Redux/Reducers/authReducer/authReducer";
import {logo} from './../../Images/Social network.png';
import style from "./Header.module.scss";
import {LOGIN} from "../../constants";

const Header = () => {

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth);
  const login = useSelector<AppStateType, string | null>(state => state.auth.data.login);
  const dispatch = useDispatch();

  const onLogoutButtonClick = () => {
    dispatch(logout())
  }

  return <header className={style.header}>
    <div className={style.headerContainer}>
      <img src={logo} alt={"logo"}/>
      {
        isAuth
          ? (
            <div className={style.logoutBlock}>
              <span>{login}</span>
              <button onClick={onLogoutButtonClick}>Log out</button>
            </div>
          )
          : (<NavLink to={LOGIN} className={style.login}>Log in</NavLink>)
      }
    </div>
  </header>
}

export default Header;