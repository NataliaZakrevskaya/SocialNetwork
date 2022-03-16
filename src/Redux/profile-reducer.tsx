import {profileAPI} from "../api/Api";
import {Dispatch} from "redux";
import {AppActionType, AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

const ADD_POST = 'PROFILE/ADD-POST';
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE';
const SET_STATUS = 'PROFILE/SET-STATUS';
const UPDATE_PHOTO = 'PROFILE/UPDATE-PHOTO';

//types


export type ProfileType = {
    "aboutMe": string
    "contacts": ContactsType
    "lookingForAJob": string
    "lookingForAJobDescription": string
    "fullName": string
    "userId": number
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
export type ContactsType = {
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string
}
type PhotosType = {
    small: string
    large: string
}
export type InitialStateType = typeof initialState;
export type ProfileReducerActionType = AddPostType
    | setUserProfileType
    | setStatusType
    | updatePhotoType

const initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerActionType): InitialStateType => {
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
        case UPDATE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.payload.photos} as ProfileType}
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
export const setUserProfile = (profile: ProfileType) => {
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
export type updatePhotoType = ReturnType<typeof updatePhoto>
export const updatePhoto = (photos: PhotosType) => {
    return {
        type: UPDATE_PHOTO,
        payload: {photos}
    } as const
}

//Thunks

export const getProfile = (userId: string): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: string): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}
export const updateStatus = (status: string): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (newPhoto: File): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    let response = await profileAPI.savePhoto(newPhoto)
    if (response.data.resultCode === 0) {
        dispatch(updatePhoto(response.data.data.photos));
    }
}
export const saveProfile = (profileData: ProfileType): AppThunk => async (dispatch: any, getState) => {
    const userId = getState().auth.data.id
    const response = await profileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId));
    }else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;