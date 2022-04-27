import {ProfileType} from "../../../Redux/Reducers/profile-reducer";

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