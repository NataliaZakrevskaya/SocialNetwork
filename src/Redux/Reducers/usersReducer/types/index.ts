import {initialState, usersReducerActions} from "../usersReducer";
import {InferActionsTypes} from "../../../types";

export type UsersType = {
  id: number
  photos: { small: string | null, large: string | null }
  followed: boolean
  name: string
  status: string | null
  uniqueUrlName: null
}
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type UsersReducerActionType = InferActionsTypes<typeof usersReducerActions>