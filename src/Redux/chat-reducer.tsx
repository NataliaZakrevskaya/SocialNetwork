import {AppThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";

// CONSTANTS
export enum ChatReducerEnum {
    MESSAGES_RECEIVED = 'MESSAGES-RECEIVED',
    STATUS_CHENGED = 'STATUS_CHENGED',
}

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state: InitialStateType = initialState, action: ChatReducerActionType) => {
    switch (action.type) {
        case ChatReducerEnum.MESSAGES_RECEIVED:
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        case ChatReducerEnum.STATUS_CHENGED:
            return {...state, status: action.payload.status}
        default:
            return state;
    }
}

//ACTIONS
export const chatReducerActions = {
    messagesReceived: (messages: ChatMessageType[]) => {
        return {
            type: ChatReducerEnum.MESSAGES_RECEIVED,
            payload: {messages}
        } as const
    },
    statusChanged: (status: StatusType) => {
        return {
            type: ChatReducerEnum.STATUS_CHENGED,
            payload: {status}
        } as const
    },
}

//THUNKS
let _newMessageHandlerCreator: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandlerCreator === null) {
        _newMessageHandlerCreator = (messages: ChatMessageType[]) => {
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

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


//TYPES

type InitialStateType = typeof initialState
type ChatReducerActionType = InferActionsTypes<typeof chatReducerActions>
type ThunkType = AppThunkType<ChatReducerActionType>


export default chatReducer;