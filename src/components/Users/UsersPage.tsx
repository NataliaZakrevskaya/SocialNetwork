import React from 'react'
import {useSelector} from 'react-redux';
import {Users} from './Users';
import {Preloader} from "../Common/Preloader/Preloader";
import {getIsFetching} from "../../Redux/Selectors/users-selectors";


export const UsersPage: React.FC<UsersPropsType> = (props) => {

const isFetching = useSelector(getIsFetching)

        return (
            <>
                {isFetching ? <Preloader/> : null}
                <Users/>
            </>
        )
}
// TYPES
type UsersPropsType = {}

