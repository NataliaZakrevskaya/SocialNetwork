
import {ChatMessageApiType} from "../../../../API/chat-api";
import {chatReducerActions, initialState} from "../chatReducer";
import {InferActionsTypes} from "../../../types";

export type ChatInitialStateType = typeof initialState
export type ChatReducerActionType = InferActionsTypes<typeof chatReducerActions>
export type ChatMessageType = ChatMessageApiType & { id: string }