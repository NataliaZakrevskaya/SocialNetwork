import React from 'react'
import {useSelector} from 'react-redux';
import {Users} from './Users';
import {Preloader} from "../Common/Preloader/Preloader";
import {getIsFetching} from "../../Redux/Selectors/users-selectors";
import {AppStateType} from "../../Redux/redux-store";
import {Navigate} from "react-router-dom";


const UsersPage: React.FC<UsersPropsType> = (props) => {

const isFetching = useSelector(getIsFetching)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    if (!isAuth) {
        return <Navigate to='/login'/>
    }
    return (
            <>
                {isFetching ? <Preloader/> : null}
                <Users/>
            </>
        )
}
// TYPES
type UsersPropsType = {}

export default UsersPage

