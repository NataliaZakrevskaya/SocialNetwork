import React from 'react'
import {InitialStateType, sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import WithAuthRedirect from "../../HOC/WithAuthRedirect";


type MapStateType = {
    dialodsPage: InitialStateType
}

type MapDispatchType = {
    updateNewMessageBody: (body: any) => void
    sendMessage: () => void
}

const mapStateToProps = (state: MapStateType): MapStateType => {
    return {
        dialodsPage: state.dialodsPage
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)
(Dialogs);