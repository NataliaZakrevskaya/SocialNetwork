import {profileReducerEnum} from "./enums";
import {PhotosType, PostsType, ProfileInitialStateType, ProfileReducerActionType, ProfileType} from "./types";

export const initialState = {
  posts: [
    {id: 1, message: "Hello, how are you?", likesCount: 0},
    {id: 2, message: "It's my first post", likesCount: 23}
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: ''
}

const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileReducerActionType): ProfileInitialStateType => {
  switch (action.type) {
    case profileReducerEnum.ADD_POST: {
      let newPost: PostsType = {
        id: new Date().getTime(),
        message: action.newPostText,
        likesCount: 0
      }
      return {
        ...state,
        posts: [newPost, ...state.posts],
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

export default profileReducer;
