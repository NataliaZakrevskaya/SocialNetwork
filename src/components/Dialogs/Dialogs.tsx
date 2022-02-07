import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageFormRedux} from "./AddMessageFormRedux";


const Dialogs = (props: DialogsPropsType) => {

    const state = props.dialogsPage;
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    const messagesElements = state.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)

    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}


export default Dialogs;