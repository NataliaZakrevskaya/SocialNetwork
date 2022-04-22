import {FormAction, stopSubmit} from "redux-form";
import {AppThunkType, InferActionsTypes} from "../redux-store";
import {authAPI} from "../../API/auth-api";
import {securityAPI} from "../../API/security-api";
import {ResultCodesEnum} from "../../API/Api";

// CONSTANTS
export enum AuthReducerEnum {
    SET_USER_DATA = 'AUTH/SET_USER_DATA',
    GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET_CAPTCHA_URL_SUCCESS',
}


const initialState: InitialStateType = {
    data: {} as DataType,
    isAuth: false,
    captchaUrl: null // if null, then captcha isn't required
}

const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionType) => {
    switch (action.type) {
        case AuthReducerEnum.SET_USER_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    email: action.payload.email,
                    login: action.payload.login,
                    id: action.payload.id,
                },
                isAuth: action.payload.isAuth
            };
        case AuthReducerEnum.GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.payload.captchaUrl}
        default:
            return state;
    }
}


//ACTIONS
export const authReducerActions = {
    setAuthUserData: (id: string, email: string, login: string, isAuth: boolean) => {
        return {
            type: AuthReducerEnum.SET_USER_DATA,
            payload: {id, email, login, isAuth}
        } as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {
            type: AuthReducerEnum.GET_CAPTCHA_URL_SUCCESS,
            payload: {captchaUrl}
        } as const
    },
}

//THUNKS
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodesEnum.Success) {
        await dispatch(getAuthUserData())
    } else {
        if(response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        const message = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error"
        dispatch(stopSubmit("login", {_error: message}));
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(authReducerActions.setAuthUserData('', '', '', false));
    }
}
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data.data;
        dispatch(authReducerActions.setAuthUserData(id, email, login, true));

    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData  = await securityAPI.getCaptchaUrl()
    const captchaUrl = captchaData.url
    dispatch(authReducerActions.getCaptchaUrlSuccess(captchaUrl));
}

//TYPES
type DataType = {
    id: string,
    email: string,
    login: string,
}
type InitialStateType = {
    data: DataType
    isAuth: boolean
    captchaUrl: string | null
}
type AuthReducerActionType = InferActionsTypes<typeof authReducerActions>
type ThunkType = AppThunkType<AuthReducerActionType | FormAction>



export default authReducer;