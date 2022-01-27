import {authAPI} from "../api/Api";

const SET_USER_DATA = 'SET_USER_DATA';

export type InitialStateType = {
    id: null
    email: null
    login: null
    isAuth: boolean
}
const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };


        default:
            return state;
    }
}

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: id, email, login
    } as const
}

export const getAuth = () => {
    return (dispatch: any) => {
        authAPI.getAuth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserData(id, email, login));
                }

            })
    }
}

export default authReducer;
