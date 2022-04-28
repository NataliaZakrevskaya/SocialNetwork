import {AppThunkType} from "../../../reduxStore";
import {ChatReducerActionType} from "../../../Reducers/chatReducer/types";

export type ChatThunkType = AppThunkType<ChatReducerActionType>