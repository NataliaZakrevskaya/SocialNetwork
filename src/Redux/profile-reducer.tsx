
//export type ProfileActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof onPostChangeActionCreator>
import {ActionsTypes, PostPropsType} from "./store";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ],
    newPostText: "it-kamasutra.com"
}

const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostPropsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;

    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    } as const
}
export const onPostChangeActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}

export default profileReducer;