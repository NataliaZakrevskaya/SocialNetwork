import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {rootReducer} from "../reduxStore";

export type AppStateType = ReturnType<typeof rootReducer>
export type AppThunkType<A extends Action, RT = Promise<void>> = ThunkAction<RT, AppStateType, unknown, A>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never