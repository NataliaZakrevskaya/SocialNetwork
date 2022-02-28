import {profileAPI} from "../api/Api";
import {Dispatch} from "redux";
import {AppActionType, AppThunk} from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

//types
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
export type InitialStateType = typeof initialState;
export type ProfileReducerActionType = AddPostType
    | setUserProfileType
    | setStatusType

const initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ] as Array<PostsType>,
    profile: null as ProfilePropsType,
    status: 'hello'
}

const profileReducer = (state = initialState, action: ProfileReducerActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
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

//ActionCreators
export type AddPostType = ReturnType<typeof addPost>
export const addPost = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText
    } as const
}
export type setUserProfileType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: ProfilePropsType) => {
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

//Thunks
export const getProfile = (userId: string): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        })
}
export const getStatus = (userId: string): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data));
        })
}
export const updateStatus = (status: string): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
}

export default profileReducer;