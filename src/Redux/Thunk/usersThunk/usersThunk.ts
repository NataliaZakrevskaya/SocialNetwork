import {usersAPI} from "../../../API/usersAPI";
import {Dispatch} from "redux";
import {FollowingResponseType} from "../../../API/types";
import {usersReducerActions} from "../../Reducers/usersReducer/usersReducer";
import {ResultCodesEnum} from "../../../enums";
import {FilterType, UsersReducerActionType} from "../../Reducers/usersReducer/types";
import {UsersThunkType} from "./types";

export const requestUsers = (page: number, pageSize: number, filter: FilterType): UsersThunkType => async (dispatch) => {
  dispatch(usersReducerActions.toggleIsFetching(true));
  dispatch(usersReducerActions.setCurrentPage(page));
  dispatch(usersReducerActions.setFilter(filter));
  let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
  dispatch(usersReducerActions.toggleIsFetching(false));
  dispatch(usersReducerActions.setUsers(data.items));
  dispatch(usersReducerActions.setTotalUsersCount(data.totalCount));
}
const followUnfollowFlow = async (dispatch: Dispatch<UsersReducerActionType>, apiMethod: (userId: number) => Promise<FollowingResponseType>, userId: number, actionCreator: (userId: number) => UsersReducerActionType) => {
  dispatch(usersReducerActions.toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId);
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(usersReducerActions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): UsersThunkType => async (dispatch) => {
  await followUnfollowFlow(dispatch, usersAPI.follow.bind(usersAPI), userId, usersReducerActions.followSuccess)
}
export const unfollow = (userId: number): UsersThunkType => async (dispatch) => {
  await followUnfollowFlow(dispatch, usersAPI.unfollow.bind(usersAPI), userId, usersReducerActions.unfollowSuccess)
}