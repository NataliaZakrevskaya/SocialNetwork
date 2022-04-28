import {AppReducersActions} from "../appReducer";
import {InferActionsTypes} from "../../../types";

export type AppInitialStateType = { initialized: boolean }
export type AppReducerActionType = InferActionsTypes<typeof AppReducersActions>