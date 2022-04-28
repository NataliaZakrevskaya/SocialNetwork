import React from "react";
import style from "./ChatPage.module.scss";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/reduxStore";
import {Chat} from "./Chat/Chat";
import {LOGIN} from "../../../constants";

const ChatPage: React.FC = () => {

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

  if (!isAuth) {
    return <Navigate to={LOGIN}/>
  }
  return (
    <div className={style.chatPage}>
      <Chat/>
    </div>
  )
}

export default ChatPage;