import React, {useState} from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {DialogsInitialStateType, dialogsReducerActions} from "../../Redux/Reducers/dialogs-reducer";


const DialogsPage = () => {


    const [activeUserID, setActiveUserID] = useState<number | null>(null)
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const state = useSelector<AppStateType, DialogsInitialStateType>(state => state.messagesPage)

    let messagesElements;
    const showMessages = (userId: number) => {
        setActiveUserID(userId)
    }

    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} avatar={d.avatar}
                                                               showMessages={showMessages}
                                                               activeUserID={activeUserID}/>);


    if (activeUserID !== null) {
        messagesElements = state.messages[activeUserID].map(m => <Message key={m.id} id={m.id} message={m.message}
                                                                          isAuth={m.isAuth}/>)
    }


    const addNewMessage = (userID: number | null, newMessage: string) => {
        if (userID) {
            dispatch(dialogsReducerActions.sendMessage(userID, newMessage));
        }
    };

    if (!isAuth) {
        return <Navigate to='/login'/>
    }

    return (
        <div className={s.dialogsPage}>
            <div className={s.dialogsPageBlock}>
                <div className={s.dialogs}>
                    <div className={s.dialogsItems}>
                        {dialogsElements}
                    </div>
                    <div className={`${activeUserID ? s.messagesField : s.fieldWithoutMessages}`}>
                        {activeUserID ? messagesElements : <span>Select a chat to start messaging</span>}
                    </div>
                </div>
                <AddMessageForm addNewMessage={addNewMessage} userID={activeUserID}/>
            </div>
        </div>
    )
}


export default DialogsPage;