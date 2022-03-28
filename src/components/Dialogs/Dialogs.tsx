import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageFormRedux} from "./AddMessageFormRedux";


const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const state = props.dialogsPage;
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    const messagesElements = state.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)

    const addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={s.dialogsPage}>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

//TYPES
export type NewMessageFormType = {
    newMessageBody: string
}


export default Dialogs;