import React from 'react'
import {InitialStateType, sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type MapStateType = {
    dialodsPage: InitialStateType
    isAuth: boolean
}

type MapDispatchType = {
    updateNewMessageBody: (body: any) => void
    sendMessage: () => void
}

const mapStateToProps = (state: MapStateType): MapStateType => {
    return {
        dialodsPage: state.messagesPage,
        isAuth: state.auth.isAuth
    };
};
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        updateNewMessageBody: (body: any) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;