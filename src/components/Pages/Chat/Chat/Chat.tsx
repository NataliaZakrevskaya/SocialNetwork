import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Messages} from "./Messages/Messages";
import {AddChatMessageForm} from "./Messages/AddChatMessageForm";
import style from "../ChatPage.module.scss"
import {startMessagesListening, stopMessagesListening} from "../../../../Redux/Thunk/chatThunk/chatThunk";
import {getStatus} from "../../../../Redux/Selectors/chatSelectors/chatSelectors";

export const Chat: React.FC = () => {

  const dispatch = useDispatch()

  const status = useSelector(getStatus);

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div className={style.chatPageBlock}>
      {status === 'error' && <div>Some error occurred. Please, refresh the page</div>}
      <>
        <Messages/>
        <AddChatMessageForm/>
      </>
    </div>
  )
}