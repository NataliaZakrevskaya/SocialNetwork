import {AppThunkType} from "../../../reduxStore";
import {UsersReducerActionType} from "../../../Reducers/usersReducer/types";

export type UsersThunkType = AppThunkType<UsersReducerActionType>