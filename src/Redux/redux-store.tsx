import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./Reducers/profile-reducer";
import dialogsReducer from "./Reducers/dialogs-reducer";
import usersReducer from "./Reducers/users-reducer";
import authReducer from "./Reducers/auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./Reducers/app-reducer";
import chatReducer from "./Reducers/chat-reducer";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>;


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


export type AppThunkType<A extends Action, RT = Promise<void>> = ThunkAction<RT, AppStateType, unknown, A>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U: never

export default store;

//@ts-ignore
window.store = store;