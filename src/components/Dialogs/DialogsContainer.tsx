import React, {ComponentType} from 'react'
import {InitialStateType, sendMessage} from "../../Redux/dialogs-reducer";
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
            dispatch(sendMessage(newMessageBody));
        }
    }
}

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, DialogsPropsType, AppStateType>
    (mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)
(Dialogs);