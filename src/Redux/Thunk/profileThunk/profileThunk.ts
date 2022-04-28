import {profileAPI} from "../../../API/profileAPI";
import {ProfileType} from "../../Reducers/profileReducer/types";
import {stopSubmit} from "redux-form";
import {profileReducerActions} from "../../Reducers/profileReducer/profileReducer";
import {ResultCodesEnum} from "../../../enums";
import {ProfileThunkType} from "./types";
import {Dispatch} from "redux";

export const getProfile = (userId: string): ProfileThunkType => async (dispatch: Dispatch) => {
  let response = await profileAPI.getProfile(userId)
  dispatch(profileReducerActions.setUserProfile(response.data));
}
export const getStatus = (userId: string): ProfileThunkType => async (dispatch: Dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(profileReducerActions.setStatus(response.data));
}
export const updateStatus = (status: string): ProfileThunkType => async (dispatch: Dispatch) => {
  let response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(profileReducerActions.setStatus(status));
  }
}
export const savePhoto = (newPhoto: File): ProfileThunkType => async (dispatch: Dispatch) => {
  let response = await profileAPI.savePhoto(newPhoto)
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(profileReducerActions.updatePhoto(response.data.data.photos));
  }
}
export const saveProfile = (profileData: ProfileType): ProfileThunkType => async (dispatch, getState: any) => {
  const userId = getState().auth.data.id
  const response = await profileAPI.saveProfile(profileData)
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(getProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
    return Promise.reject(response.data.messages[0])
  }
}