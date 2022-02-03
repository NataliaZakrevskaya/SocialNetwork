import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";


const Dialogs = (props: DialogsPropsType) => {

    const state = props.dialogsPage;
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    const messagesElements = state.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)
    const newMessageBody = state.newMessageBody;

    const onSendMessageClick = () => {
        props.sendMessage();
    };
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
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
                        value={props.dialogsPage.newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder={"Enter your message"}
                    />
                </div>
                <div>
                    <button
                        disabled={props.dialogsPage.newMessageBody.trim() === ''}
                        onClick={onSendMessageClick}>Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;