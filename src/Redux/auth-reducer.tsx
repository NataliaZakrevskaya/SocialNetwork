import {authAPI, securityAPI} from "../api/Api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {AppActionType, AppThunk, InferActionsTypes} from "./redux-store";

// CONSTANTS
const SET_USER_DATA = 'AUTH/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET_CAPTCHA_URL_SUCCESS';




const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionType) => {
    switch (action.type) {
        case SET_USER_DATA:
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
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.payload.captchaUrl}
        default:
            return state;
    }
}


export const authReducerActions = {
    setAuthUserData: (id: string, email: string, login: string, isAuth: boolean) => {
        return {
            type: SET_USER_DATA,
            payload: {id, email, login, isAuth}
        } as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {
            type: GET_CAPTCHA_URL_SUCCESS,
            payload: {captchaUrl}
        } as const
    }
}


//Thunks
export const getAuthUserData = (): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(authReducerActions.setAuthUserData(id, email, login, true));

    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunk => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        const message = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error"
        dispatch(stopSubmit("login", {_error: message}));
    }
}
export const getCaptchaUrl = (): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    const captchaData  = await securityAPI.getCaptchaUrl()
    const captchaUrl = captchaData.url
    dispatch(authReducerActions.getCaptchaUrlSuccess(captchaUrl));
}
export const logout = (): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(authReducerActions.setAuthUserData('', '', '', false));
    }

}


//TYPES
type DataType = {
    id: string,
    email: string,
    login: string,
}
export type InitialStateType = {
    data: DataType
    isAuth: boolean
    captchaUrl: string | null
}
const initialState: InitialStateType = {
    data: {} as DataType,
    isAuth: false,
    captchaUrl: null // if null, then captcha isn't required
}
type AuthReducerActionType = InferActionsTypes<typeof authReducerActions>
export default authReducer;
