import {authAPI} from "../api/Api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'SET_USER_DATA';
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
type ActionAuthReducerType = setAuthUserDataType


const authReducer = (state: InitialStateType = initialState, action: ActionAuthReducerType) => {
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


export const getAuthUserData = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }

            })
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {

        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    //@ts-ignore
                    dispatch(getAuthUserData())
                } else {
                    let message = response.data.messages.length > 0
                        ? response.data.messages[0]
                        : "Some error"
                    dispatch(stopSubmit("login", {_error: message}));
                }
            })
    }
}
export const logout = () => {
    return (dispatch: Dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData('', '', '', false));
                }

            })
    }
}

export default authReducer;
