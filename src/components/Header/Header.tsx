import React from 'react';
import s from "./Header.module.css"
import logo from './headerLogo.png'

type HeaderPropsType = {

}

const Header = (props: HeaderPropsType) => {
    return <header className={s.header}>
        <img
            src={logo} alt={"img"}/>
    </header>
}

export default Header;