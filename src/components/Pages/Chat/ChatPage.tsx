import React from "react";
import style from "./ChatPage.module.scss";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Chat} from "./Chat/Chat";
import {LOGIN} from "../../../constants";
import {getIsAuth} from "../../../Redux/Selectors/authSelectors/authSelectors";

const ChatPage: React.FC = () => {

  const isAuth = useSelector(getIsAuth);

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