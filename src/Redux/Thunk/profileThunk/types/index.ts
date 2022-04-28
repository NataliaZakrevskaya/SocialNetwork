import {ProfileReducerActionType} from "../../../Reducers/profileReducer/types";
import {FormAction} from "redux-form";
import {AppThunkType} from "../../../types";

export type ProfileThunkType = AppThunkType<ProfileReducerActionType | FormAction>