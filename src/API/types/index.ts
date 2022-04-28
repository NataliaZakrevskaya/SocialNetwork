import {PhotosType} from "../../Redux/Reducers/profileReducer/types";
import {UsersType} from "../../Redux/Reducers/usersReducer/types";

export type AuthApiResponseType<T> = {
  data: T
  resultCode: number
  messages: string[]
}
export type captchaType = {
  url: string
}
export type GetProfileResponseType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  photos: {
    small: string
    large: string
  }
}
export type ProfileAPIResponseType<T> = {
  resultCode: number
  messages: string[],
  data: T
}
export type SavePhotoResponseType = {
  photos: PhotosType
}
export type GetUsersResponseType = {
  items: Array<UsersType>
  error: null | string
  totalCount: number
}
export type FollowingResponseType = {
  resultCode: number
  messages: Array<string | null>
  data: {}
}