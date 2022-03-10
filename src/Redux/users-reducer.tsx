import {usersAPI} from "../api/Api";
import {Dispatch} from "redux";
import {AppActionType, AppThunk} from "./redux-store";
import {updateObjectInArray} from "../Utils/object-helpers";

const FOLLOW = 'USERS/FOLLOW';
const UNFOLLOW = 'USERS/UNFOLLOW';
const SET_USERS = 'USERS/SET-USERS';
const SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'USERS/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'USERS/TOGGLE-FOLLOWING-PROGRESS';

//Types
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
};
export type UsersReducerActionType = followSuccessType
    | unfollowSuccessType
    | setUsersType
    | setCurrentPageType
    | setTotalUsersCountType
    | toggleIsFetchingType
    | toggleFollowingProgressType

let initialState: InitialStateType = {
    users: [] as UsersType[],
    pageSize: 10,
    totalUsersCount: 0,
    page: 1,
    isFetching: false,
    followingInProgress: [] as number[]
}

export const usersReducer = (state = initialState, action: UsersReducerActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case UNFOLLOW:
            debugger
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state, users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, page: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
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

//ActionCreators
export type followSuccessType = ReturnType<typeof followSuccess>
export const followSuccess = (userID: number) => {
    return {
        type: FOLLOW,
        userID
    } as const
}
export type unfollowSuccessType = ReturnType<typeof unfollowSuccess>
export const unfollowSuccess = (userID: number) => {
    return {
        type: UNFOLLOW,
        userID
    } as const
}
export type setUsersType = ReturnType<typeof setUsers>
export const setUsers = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export type setCurrentPageType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}
export type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count: totalUsersCount
    } as const
}
export type toggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const
}
export type toggleFollowingProgressType = ReturnType<typeof toggleFollowingProgress>
export const toggleFollowingProgress = (isFetching: boolean, userID: number) => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userID
    } as const
}


//Thunks
export const requestUsers = (page: number, pageSize: number): AppThunk => async (dispatch: Dispatch<AppActionType>) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: Dispatch<AppActionType>, apiMethod: any, userId: number, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): AppThunk => async (dispatch: Dispatch<AppActionType>) => {

    followUnfollowFlow(dispatch, usersAPI.follow.bind(usersAPI), userId, followSuccess)
}
export const unfollow = (userId: number): AppThunk => async (dispatch: Dispatch<AppActionType>) => {

    followUnfollowFlow(dispatch, usersAPI.unfollow.bind(usersAPI), userId, unfollowSuccess)
}