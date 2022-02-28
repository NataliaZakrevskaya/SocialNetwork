import {AppThunk} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED-SUCCESS';

export type InitialStateType = {
    initialized: boolean
}
const initialState: InitialStateType = {
    initialized: false
}

export type AppReducerActionType = initializedSuccessType


const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}

        default:
            return state;
    }
}


export type initializedSuccessType = ReturnType<typeof initializedSuccess>
export const initializedSuccess = () => {
    return {type: INITIALIZED_SUCCESS} as const
}

//Thunks
export const initializeApp = (): AppThunk => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer;
