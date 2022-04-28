import React from 'react'
import {useSelector} from 'react-redux';
import {Users} from './Users';
import {Navigate} from "react-router-dom";
import {LOGIN} from "../../../constants";
import {getIsAuth} from "../../../Redux/Selectors/authSelectors/authSelectors";


const UsersPage: React.FC = () => {

  const isAuth = useSelector(getIsAuth);

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

