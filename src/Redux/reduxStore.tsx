import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import profileReducer from "./Reducers/profileReducer/profileReducer";
import dialogsReducer from "./Reducers/dialogsReducer/dialogsReducer";
import usersReducer from "./Reducers/usersReducer/usersReducer";
import authReducer from "./Reducers/authReducer/authReducer";
import appReducer from "./Reducers/appReducer/appReducer";
import chatReducer from "./Reducers/chatReducer/chatReducer";

export const rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store;

//@ts-ignore
window.store = store;
