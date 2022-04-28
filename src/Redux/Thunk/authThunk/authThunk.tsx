import {authAPI} from "../../../API/authAPI";
import {ResultCodesEnum} from "../../../enums";
import {stopSubmit} from "redux-form";
import {securityAPI} from "../../../API/securityAPI";
import {authReducerActions} from "../../Reducers/authReducer/authReducer";
import {AuthThunkType} from "./types";

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): AuthThunkType => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === ResultCodesEnum.Success) {
    await dispatch(getAuthUserData())
  } else {
    if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      await dispatch(getCaptchaUrl())
    }
    const message = response.data.messages.length > 0
      ? response.data.messages[0]
      : "Some error"
    dispatch(stopSubmit("login", {_error: message}));
  }
}
export const logout = (): AuthThunkType => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(authReducerActions.setAuthUserData('', '', '', false));
  }
}
export const getAuthUserData = (): AuthThunkType => async (dispatch) => {
  const response = await authAPI.me()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    let {id, email, login} = response.data.data;
    dispatch(authReducerActions.setAuthUserData(id, email, login, true));

  }
}
export const getCaptchaUrl = (): AuthThunkType => async (dispatch) => {
  const captchaData = await securityAPI.getCaptchaUrl()
  const captchaUrl = captchaData.url
  dispatch(authReducerActions.getCaptchaUrlSuccess(captchaUrl));
}