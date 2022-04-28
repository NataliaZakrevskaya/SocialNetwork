import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";
import {AppStateType} from "../../../Redux/reduxStore";
import {DialogsInitialStateType, dialogsReducerActions} from "../../../Redux/Reducers/dialogsReducer/dialogsReducer";
import style from './Dialogs.module.scss';
import {Nullable} from "../../../types";
import {LOGIN} from "../../../constants";

const DialogsPage = () => {
  let messagesElements;

  const [activeUserID, setActiveUserID] = useState<Nullable<number>>(null);

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth);
  const state = useSelector<AppStateType, DialogsInitialStateType>(state => state.messagesPage);

  const dispatch = useDispatch();

  const showMessages = (userId: number) => {
    setActiveUserID(userId)
  };

  const dialogsElements = state.dialogs.map(dialog =>
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} avatar={dialog.avatar}
                showMessages={showMessages}
                activeUserID={activeUserID}/>);

  if (activeUserID !== null) {
    messagesElements = state.messages[activeUserID].map(massage =>
      <Message key={massage.id} id={massage.id} message={massage.message}
               isAuth={massage.isAuth}/>)
  }

  const addNewMessage = (userID: Nullable<number>, newMessage: string) => {
    if (userID) {
      dispatch(dialogsReducerActions.sendMessage(userID, newMessage));
    }
  };

  if (!isAuth) {
    return <Navigate to={LOGIN}/>
  }

  return (
    <div className={style.dialogsPage}>
      <div className={style.dialogsPageBlock}>
        <div className={style.dialogs}>
          <div className={style.dialogsItems}>
            {dialogsElements}
          </div>
          <div className={activeUserID ? style.messagesField : style.fieldWithoutMessages}>
            {activeUserID ? messagesElements : <span>Select a chat to start messaging</span>}
          </div>
        </div>
        <AddMessageForm addNewMessage={addNewMessage} userID={activeUserID}/>
      </div>
    </div>
  )
}

export default DialogsPage;