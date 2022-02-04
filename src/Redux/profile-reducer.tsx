//import {ActionsTypes, PostPropsType} from "./store";

import {profileAPI} from "../api/Api";
import {Dispatch} from "redux";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

export type ProfilePropsType = {
    "aboutMe": string,
    "contacts": {
        "facebook": string,
        "website": string,
        "vk": string,
        "twitter": string,
        "instagram": string,
        "youtube": string,
        "github": string,
        "mainLink": string
    },
    "lookingForAJob": string,
    "lookingForAJobDescription": string,
    "fullName": string,
    "userId": number,
    "photos": {
        "small": string,
        "large": string
    }
} | null
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
const initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ] as Array<PostsType>,
    newPostText: "it-kamasutra.com" as string,
    profile: null as ProfilePropsType,
    status: 'hello'
}
export type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action: ActionType) => {
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
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        default:
            return state;

    }
}

export type ActionType = AddPostType
    | updateNewPostTextType
    | setUserProfileType
    | setStatusType

export type AddPostType = ReturnType<typeof addPost>
export const addPost = () => {
    return {
        type: ADD_POST
    } as const
}

export type updateNewPostTextType = ReturnType<typeof updateNewPostText>
export const updateNewPostText = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text
    } as const
}

export type setUserProfileType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: any) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export type setStatusType = ReturnType<typeof setStatus>
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}


export const getProfile = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}
export const getStatus = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
}
export const updateStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}

export default profileReducer;