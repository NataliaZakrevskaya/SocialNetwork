import {AppThunkType} from "../../../reduxStore";
import {FormAction} from "redux-form";
import {AuthReducerActionType} from "../../../Reducers/authReducer/types";

export type AuthThunkType = AppThunkType<AuthReducerActionType | FormAction>