//import {ActionsTypes, PostPropsType} from "./store";

import {profileAPI} from "../api/Api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type InitialStateType = {
    posts: Array<PostsType>
    newPostText: string
    profile: null
}

let initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ],
    newPostText: "it-kamasutra.com",
    profile: null
}

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.text}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        default:
            return state;

    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    } as const
}
export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text
    } as const
}
export const setUserProfile = (profile: any) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const getProfile = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}

export default profileReducer;