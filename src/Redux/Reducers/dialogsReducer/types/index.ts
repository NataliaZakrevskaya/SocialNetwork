import {dialogsReducerActions} from "../dialogsReducer";
import {InferActionsTypes} from "../../../types";

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