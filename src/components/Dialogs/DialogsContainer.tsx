import React from 'react'
import {StoreType} from "../../Redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

/*
export type StateDialogsPropsType = {
    store: StoreType
}
*/

const DialogsContainer = () => {



    return (
        <StoreContext.Consumer>
            {(store) => {
                const state = store.getState().messagesPage;
                const onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }
                const onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyCreator(body));
                }
                return <Dialogs
                    sendMessage={onSendMessageClick}
                    updateNewMessageBody={onNewMessageChange}
                    dialodsPage={state}
                />
            }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;