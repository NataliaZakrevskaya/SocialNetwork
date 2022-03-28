import React, {ComponentType} from 'react'
import {dialogsReducerActions, InitialStateType} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../Redux/redux-store";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";


type MapStateToPropsType = {
    dialogsPage: InitialStateType
}
type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.messagesPage
    };
};
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(dialogsReducerActions.sendMessage(newMessageBody));
        }
    }
}


export default compose<ComponentType>(
    connect
    (mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)
(Dialogs);