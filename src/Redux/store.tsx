import profileReducer, {addPostActionCreator, onPostChangeActionCreator} from "./profile-reducer";
import dialogsReducer, {sendMessageCreator, updateNewMessageBodyCreator} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type PostPropsType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePagePropsType = {
    posts: Array<PostPropsType>
    newPostText: string
}
export type StatePropsType = {
    profilePage: ProfilePagePropsType
    messagesPage: DialogsPropsType
    sidebar: {}
}
export type ActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof onPostChangeActionCreator>
    | ReturnType<typeof sendMessageCreator> | ReturnType<typeof updateNewMessageBodyCreator>
export type StoreType = {
    _state: StatePropsType
    _callSubscriber: () => void
    getState: () => StatePropsType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hello, how are you?", likesCount: 0},
                {id: 2, message: "It's my first post", likesCount: 23}
            ],
            newPostText: "it-kamasutra.com"
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Andrey"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Viktor"},
                {id: 6, name: "Valera"}
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your it-kamasutra?"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"}
            ],
            newMessageBody: ""
        },
        sidebar: {},
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber();
    }
}

export default store;
