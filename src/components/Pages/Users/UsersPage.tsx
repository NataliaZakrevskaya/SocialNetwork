import React from 'react'
import {useSelector} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from "../../../Redux/redux-store";
import {Navigate} from "react-router-dom";


const UsersPage: React.FC = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    if (!isAuth) {
        return <Navigate to='/login'/>
    }
    return (
            <>
                <Users/>
            </>
        )
}

export default UsersPage

