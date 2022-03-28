import {updateObjectInArray} from "../Utils/object-helpers";
import {AppThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";
import {ResultCodesEnum} from "../api/Api";

//CONSTANTS
export enum UserReducerEnum {
    FOLLOW = 'USERS/FOLLOW',
    UNFOLLOW = 'USERS/UNFOLLOW',
    SET_USERS = 'USERS/SET-USERS',
    SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE',
    SET_TOTAL_USERS_COUNT = 'USERS/SET-TOTAL-USERS-COUNT',
    TOGGLE_IS_FETCHING = 'USERS/TOGGLE-IS-FETCHING',
    TOGGLE_FOLLOWING_PROGRESS = 'USERS/TOGGLE-FOLLOWING-PROGRESS',
}


let initialState: InitialStateType = {
    users: [] as UsersType[],
    pageSize: 10,
    totalUsersCount: 0,
    page: 1,
    isFetching: false,
    followingInProgress: [] as number[]
}

const usersReducer = (state = initialState, action: UsersReducerActionType): InitialStateType => {
    switch (action.type) {
        case UserReducerEnum.FOLLOW:
            return {
                ...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case UserReducerEnum.UNFOLLOW:
            debugger
            return {
                ...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }
        case UserReducerEnum.SET_USERS:
            return {...state, users: [...action.users]}
        case UserReducerEnum.SET_CURRENT_PAGE:
            return {...state, page: action.currentPage}
        case UserReducerEnum.SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case UserReducerEnum.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case UserReducerEnum.TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state;

    }
}

//ACTIONS
export const usersReducerActions = {
    followSuccess: (userID: number) => {
        return {type: UserReducerEnum.FOLLOW, userID} as const
    },
    unfollowSuccess: (userID: number) => {
        return {type: UserReducerEnum.UNFOLLOW, userID} as const
    },
    setUsers: (users: Array<UsersType>) => {
        return {type: UserReducerEnum.SET_USERS, users
        } as const
    },
    setCurrentPage: (currentPage: number) => {
        return {type: UserReducerEnum.SET_CURRENT_PAGE, currentPage} as const
    },
    setTotalUsersCount: (totalUsersCount: number) => {
        return {type: UserReducerEnum.SET_TOTAL_USERS_COUNT, count: totalUsersCount} as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {type: UserReducerEnum.TOGGLE_IS_FETCHING, isFetching} as const
    },
    toggleFollowingProgress: (isFetching: boolean, userID: number) => {
        return {type: UserReducerEnum.TOGGLE_FOLLOWING_PROGRESS, isFetching, userID} as const
    },
}


//THUNKS
export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(usersReducerActions.toggleIsFetching(true));
    dispatch(usersReducerActions.setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(usersReducerActions.toggleIsFetching(false));
    dispatch(usersReducerActions.setUsers(data.items));
    dispatch(usersReducerActions.setTotalUsersCount(data.totalCount));
}
const followUnfollowFlow = async (dispatch: any, apiMethod: any, userId: number, actionCreator: any) => {
    dispatch(usersReducerActions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersReducerActions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, usersAPI.follow.bind(usersAPI), userId, usersReducerActions.followSuccess)
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, usersAPI.unfollow.bind(usersAPI), userId, usersReducerActions.unfollowSuccess)
}


//TYPES
export type UsersType = {
    id: number
    photos: { small: string | null, large: string | null }
    followed: boolean
    name: string
    status: string | null
    uniqueUrlName: null
};
export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    page: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type UsersReducerActionType = InferActionsTypes<typeof usersReducerActions>
type ThunkType = AppThunkType<UsersReducerActionType>

export default usersReducer;