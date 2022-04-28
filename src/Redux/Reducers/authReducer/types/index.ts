import {InferActionsTypes} from "../../../reduxStore";
import {authReducerActions} from "../authReducer";

export type AuthDataType = {
  id: string,
  email: string,
  login: string,
}
export type AuthInitialStateType = {
  data: AuthDataType
  isAuth: boolean
  captchaUrl: string | null
}
export type AuthReducerActionType = InferActionsTypes<typeof authReducerActions>