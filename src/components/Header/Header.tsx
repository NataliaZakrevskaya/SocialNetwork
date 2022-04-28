import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import style from "./Header.module.scss";
import logo from './../../Images/logo.png'
import {LOGIN} from "../../constants";
import {logout} from "../../Redux/Thunk/authThunk/authThunk";
import {getIsAuth, getLogin} from "../../Redux/Selectors/authSelectors/authSelectors";

const Header = () => {

  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
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