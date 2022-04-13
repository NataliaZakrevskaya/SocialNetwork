import React from 'react';
import s from "./Header.module.css"
import logo from './../../Images/Social network.png'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType} from "../../Redux/profile-reducer";

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}


const Header = ({login, logout, isAuth}: HeaderPropsType) => {

    const profile = useSelector<AppStateType, ProfileType>(state => state.profilePage.profile)

    return <header className={s.header}>
        <img
            src={logo} alt={"logo"}/>
        <div className={s.loginBlock}>
            {
                isAuth
                    ? <div className={s.login}>
                        <img
                            className={s.profileImg}
                            src={profile && profile.photos.small !== null ? profile.photos.small : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU'}
                            alt={"avatar"}/>
                        <div>
                            {login}
                        </div>
                        <button onClick={logout}>Log out</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header;