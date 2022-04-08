import {AppThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";

// CONSTANTS
export enum ChatReducerEnum {
    MESSAGES_RECEIVED = 'MESSAGES-RECEIVED',
}

const initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state: InitialStateType = initialState, action: ChatReducerActionType) => {
    switch (action.type) {
        case ChatReducerEnum.MESSAGES_RECEIVED:
            return {...state, messages: [...state.messages, ...action.payload.messages]}
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

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


//TYPES
type InitialStateType = typeof initialState
type ChatReducerActionType = InferActionsTypes<typeof chatReducerActions>
type ThunkType = AppThunkType<ChatReducerActionType>


export default chatReducer;