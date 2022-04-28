import {chatAPI, ChatMessageApiType, StatusType} from "../../../API/chatAPI";
import {Dispatch} from "redux";
import {chatReducerActions} from "../../Reducers/chatReducer/chatReducer";
import {ChatThunkType} from "./types";

let _newMessageHandlerCreator: ((messages: ChatMessageApiType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandlerCreator === null) {
    _newMessageHandlerCreator = (messages: ChatMessageApiType[]) => {
      dispatch(chatReducerActions.messagesReceived(messages))
    }
  }
  return _newMessageHandlerCreator
}

let _statusChangedHandlerCreator: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandlerCreator === null) {
    _statusChangedHandlerCreator = (status: StatusType) => {
      dispatch(chatReducerActions.statusChanged(status))
    }
  }
  return _statusChangedHandlerCreator
}

export const startMessagesListening = (): ChatThunkType => async (dispatch: Dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ChatThunkType => async (dispatch: Dispatch) => {
  chatAPI.stop()
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const sendMessage = (message: string): ChatThunkType => async () => {
  chatAPI.sendMessage(message)
}