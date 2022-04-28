import {InferActionsTypes} from "../../../reduxStore";
import {AppReducersActions} from "../appReducer";

export type AppInitialStateType = { initialized: boolean }
export type AppReducerActionType = InferActionsTypes<typeof AppReducersActions>