import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "../../Redux/store";

export type StateDialogsPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (body: string) => void
    dialodsPage: DialogsPropsType
}

const Dialogs = (props: StateDialogsPropsType) => {

    const state = props.dialodsPage;
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    const messagesElements = state.messages.map(m => <Message id={m.id} message={m.message}/>)
    const newMessageBody = state.newMessageBody;
    const onSendMessageClick = () => {
        props.sendMessage();
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div className={s.textInput}>
                <div>
                    <textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder={"Enter your message"}
                    ></textarea>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;