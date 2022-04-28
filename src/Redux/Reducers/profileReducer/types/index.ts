import {InferActionsTypes} from "../../../reduxStore";
import {initialState, profileReducerActions} from "../profileReducer";

export type PhotosType = {
  small: string
  large: string
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
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
export type ProfileInitialStateType = typeof initialState;
export type ProfileReducerActionType = InferActionsTypes<typeof profileReducerActions>