import {InferActionsTypes} from "../redux-store";
import {getAuthUserData} from "./auth-reducer";

//CONSTANTS
export enum AppReducerEnum {
    INITIALIZED_SUCCESS = 'APP/INITIALIZED-SUCCESS'
}


const initialState: InitialStateType = {
    initialized: false
}


const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType) => {
    switch (action.type) {
        case AppReducerEnum.INITIALIZED_SUCCESS:
            return {...state, initialized: true}

        default:
            return state;
    }
}


//ACTIONS
export const AppReducersActions = {
    initializedSuccess: () => {
        return {type: AppReducerEnum.INITIALIZED_SUCCESS} as const
    }
}


//THUNKS
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(AppReducersActions.initializedSuccess())
        })
}

//TYPES
export type InitialStateType = { initialized: boolean }
type AppReducerActionType = InferActionsTypes<typeof AppReducersActions>

export default appReducer;
