import {authAPI} from "../api/Api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {AppActionType, AppThunk} from "./redux-store";


const SET_USER_DATA = 'AUTH/SET_USER_DATA';
type DataType = {
    id: string,
    email: string,
    login: string,
    isAuth: boolean
}
export type InitialStateType = {
    data: DataType
    isAuth: boolean
}
const initialState: InitialStateType = {
    data: {} as DataType,
    isAuth: false
}
export type AuthReducerActionType = setAuthUserDataType


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


        default:
            return state;
    }
}


export type setAuthUserDataType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (id: string, email: string, login: string, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    } as const
}

//Thunks
export const getAuthUserData = (): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));

            }

        })
}
export const login = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = response.data.messages.length > 0
                    ? response.data.messages[0]
                    : "Some error"
                //@ts-ignore
                dispatch(stopSubmit("login", {_error: message}));
            }
        })
}
export const logout = (): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData('', '', '', false));
            }

        })
}

export default authReducer;
