import React, {useState} from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";


const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const [userID, setUserID] = useState<number | null>(null)

    const state = props.dialogsPage;
    console.log(userID)
    let messagesElements;
    const showMessages = (userId: number) => {
        setUserID(userId)
    }

    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} avatar={d.avatar}
                                                               showMessages={showMessages}/>);


    if (userID !== null) {
        messagesElements = state.messages[userID].map(m => <Message key={m.id} id={m.id} message={m.message}/>)
    }


    const addNewMessage = (userID: number | null, newMessage: string) => {
        props.sendMessage(userID, newMessage);
    };

    return (
        <div className={s.dialogsPage}>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={userID ? s.messagesField : s.fieldWithoutMessages}>
                    {userID ? messagesElements : <span>Select a chat to start messaging</span>}
                </div>
            </div>
            <AddMessageForm addNewMessage={addNewMessage} userID={userID}/>
        </div>
    )
}

//TYPES
export type NewMessageFormType = {
    newMessageBody: string
}


export default Dialogs;