import React from 'react'
import {useSelector} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from "../../../Redux/reduxStore";
import {Navigate} from "react-router-dom";
import {LOGIN} from "../../../constants";


const UsersPage: React.FC = () => {

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

  if (!isAuth) {
    return <Navigate to={LOGIN}/>
  }
  return (
    <>
      <Users/>
    </>
  )
}

export default UsersPage

