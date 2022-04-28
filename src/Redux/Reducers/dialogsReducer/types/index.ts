import {InferActionsTypes} from "../../../reduxStore";
import {dialogsReducerActions} from "../dialogsReducer";

export type DialogType = {
  id: number
  name: string
  avatar: string
}
export type MessageType = {
  id: string
  message: string
  isAuth: boolean
}
export type MessagesType = {
  [key: number]: Array<MessageType>
}
export type DialogsInitialStateType = {
  dialogs: Array<DialogType>
  messages: MessagesType
}
export type DialogsReducerActionType = InferActionsTypes<typeof dialogsReducerActions>