import {AppStateType} from "../../types";
import {DialogsInitialStateType} from "../../Reducers/dialogsReducer/types";

export const getDialogState = (state: AppStateType): DialogsInitialStateType => {
  return state.messagesPage
}