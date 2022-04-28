import {AppThunkType} from "../../../reduxStore";
import {ProfileReducerActionType} from "../../../Reducers/profileReducer/types";
import {FormAction} from "redux-form";

export type ProfileThunkType = AppThunkType<ProfileReducerActionType | FormAction>