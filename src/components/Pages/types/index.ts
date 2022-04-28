import {ProfileType} from "../../../Redux/Reducers/profileReducer/profileReducer";
import {InjectedProps} from "../../Common/Components/HOC/withRouter/types";
import {FilterType, UsersType} from "../../../Redux/Reducers/usersReducer/usersReducer";

export type AddMessageFormPropsType = {
  userID: number | null
  addNewMessage: (userID: number | null, newMessage: string) => void
}
export type DialogFormDataType = {
  newMessageBody: string
}
export type DialogsType = {
  name: string
  id: number
  avatar: string
  activeUserID: number | null
  showMessages: (userID: number) => void
}
export type MessageType = {
  id: string
  message: string
  isAuth: boolean
}
export type LoginFormPropsType = {
  captchaUrl: string | null
}
export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
export type AddPostFormType = {
  addNewPost: (newPostText: string) => void
}
export type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}
export type ContactPropsType = {
  contactTitle: string
  contactValue: string
}
export type ProfileDataFormPropsType = {
  profile: ProfileType
}
export type ProfileStatusType = {
  status: string
  isOwner : boolean
  updateStatus: (status: string) => void
}
export type ProfileInfoPropsType = {
  isOwner: boolean
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  savePhoto: (newPhoto: File) => void
  saveProfile: (profileData: ProfileType) => void
}
export type ProfileComponentPropsType = {
  isOwner: boolean
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  savePhoto: (newPhoto: File) => void
  saveProfile: (profileData: ProfileType) => Promise<any>
}
export type ProfileAPIContainerMapStateToPropsType = {
  profile: ProfileType
  isAuth: boolean
  status: string
  authorizedUserId: string
}
export type ProfileAPIContainerMapDispatchToPropsType = {
  setUserProfile: (profile: ProfileAPIContainerMapStateToPropsType) => void
  getProfile: (userId: string) => void
  getStatus: (userId: string) => void
  updateStatus: (status: string) => void
  savePhoto: (newPhoto: File) => void
  saveProfile: (profileData: ProfileType) => Promise<any>
}

export type ProfileAPIContainerOwnPropsType = ProfileAPIContainerMapStateToPropsType & ProfileAPIContainerMapDispatchToPropsType & InjectedProps;

export type UsersPropsType = {
  user: UsersType
  unfollow: (userID: number) => void
  follow: (userID: number) => void
  followingInProgress: Array<number>
}
export type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void
}
export type FriendFormType = 'true' | 'false' | 'null'
export type UsersSearchFormType = {
  term: string,
  friend: FriendFormType
}
export type queryParamsType = {
  term: string
  page: string
  friend: string
}