import {profileAPI} from "../api/Api";
import {stopSubmit} from "redux-form";
import {AppThunkType, InferActionsTypes} from "./redux-store";

//CONSTANTS
export enum profileReducerEnum {
    ADD_POST = 'PROFILE/ADD-POST',
    SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE',
    SET_STATUS = 'PROFILE/SET-STATUS',
    UPDATE_PHOTO = 'PROFILE/UPDATE-PHOTO',
}



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
        case profileReducerEnum.ADD_POST: {
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
        case profileReducerEnum.SET_STATUS: {
            return {...state, status: action.status}
        }
        case profileReducerEnum.SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case profileReducerEnum.UPDATE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.payload.photos} as ProfileType}
        }
        default:
            return state;
    }
}

//ACTIONS
export const profileReducerActions = {
    addPost: (newPostText: string) => {
        return {
            type: profileReducerEnum.ADD_POST,
            newPostText
        } as const
    },
    setUserProfile: (profile: ProfileType) => {
        return {
            type: profileReducerEnum.SET_USER_PROFILE,
            profile
        } as const
    },
    setStatus: (status: string) => {
        return {
            type: profileReducerEnum.SET_STATUS,
            status
        } as const
    },
    updatePhoto: (photos: PhotosType) => {
        return {
            type: profileReducerEnum.UPDATE_PHOTO,
            payload: {photos}
        } as const
    },
}



//THUNKS
export const getProfile = (userId: string): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(profileReducerActions.setUserProfile(response.data));
}
export const getStatus = (userId: string): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(profileReducerActions.setStatus(response.data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(profileReducerActions.setStatus(status));
    }
}
export const savePhoto = (newPhoto: File): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(newPhoto)
    if (response.data.resultCode === 0) {
        dispatch(profileReducerActions.updatePhoto(response.data.data.photos));
    }
}
export const saveProfile = (profileData: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    const userId = getState().auth.data.id
    const response = await profileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
}

//TYPES
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
type ProfileReducerActionType = InferActionsTypes<typeof profileReducerActions>
type ThunkType = AppThunkType<ProfileReducerActionType>

export default profileReducer;