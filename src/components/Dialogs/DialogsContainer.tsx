import React, {ComponentType} from 'react'
import {dialogsReducerActions, InitialStateType} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../Redux/redux-store";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";



const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.messagesPage
    };
};

//TYPES
type MapStateToPropsType = {
    dialogsPage: InitialStateType
}
type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType



export default compose<ComponentType>(
    connect
    (mapStateToProps, {sendMessage:dialogsReducerActions.sendMessage }),
    WithAuthRedirect
)
(Dialogs);