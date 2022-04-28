import {v1} from "uuid"
import {ChatMessageApiType, StatusType} from "../../../API/chat-api";
import {ChatReducerEnum} from "./enums";
import {ChatInitialStateType, ChatMessageType, ChatReducerActionType} from "./types";

export const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
}

const chatReducer = (state: ChatInitialStateType = initialState, action: ChatReducerActionType) => {
  switch (action.type) {
    case ChatReducerEnum.MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages
          .map(message => ({...message, id: v1()}))]
          .filter((m, index, array) => index >= array.length - 100)
      }
    case ChatReducerEnum.STATUS_CHANGED:
      return {...state, status: action.payload.status}
    default:
      return state;
  }
}

export const chatReducerActions = {
  messagesReceived: (messages: ChatMessageApiType[]) => {
    return {
      type: ChatReducerEnum.MESSAGES_RECEIVED,
      payload: {messages}
    } as const
  },
  statusChanged: (status: StatusType) => {
    return {
      type: ChatReducerEnum.STATUS_CHANGED,
      payload: {status}
    } as const
  },
}

export default chatReducer;
