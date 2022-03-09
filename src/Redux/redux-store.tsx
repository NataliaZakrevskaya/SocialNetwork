import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {ProfileReducerActionType} from "./profile-reducer";
import dialogsReducer, {DialogsReducerActionType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {usersReducer, UsersReducerActionType} from "./users-reducer";
import authReducer, {AuthReducerActionType} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer, {AppReducerActionType} from "./app-reducer";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionType =
    ProfileReducerActionType
    | DialogsReducerActionType
    | UsersReducerActionType
    | AuthReducerActionType
    | AppReducerActionType

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


//<то, что возвращает санка (обычно void)>, <типизация стэйта всего приложения>,
//<unknown>, <типизация экшенов всего приложения>
export type AppThunk<ReturnType = void> = ThunkAction<void, AppStateType, unknown, AppActionType>

export default store;

//@ts-ignore
window.store = store;