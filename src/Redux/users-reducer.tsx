import {usersAPI} from "../api/Api";
import {Dispatch} from "redux";
import {AppActionType, AppThunk} from "./redux-store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE-FOLLOWING-PROGRESS';

//Types
export type UsersType = {
    id: string
    photos: { small: string, large: string }
    followed: boolean
    name: string
    status: string
};
export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<string>
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
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as string[]
}

const usersReducer = (state = initialState, action: UsersReducerActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)
            }
        case SET_USERS:
            return {
                ...state, users: [action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
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
export const followSuccess = (userID: string) => {
    return {
        type: FOLLOW,
        userID
    } as const
}
export type unfollowSuccessType = ReturnType<typeof unfollowSuccess>
export const unfollowSuccess = (userID: string) => {
    return {
        type: UNFOLLOW,
        userID
    } as const
}
export type setUsersType = ReturnType<typeof setUsers>
export const setUsers = (users: UsersType) => {
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
export const toggleFollowingProgress = (isFetching: boolean, userID: string) => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userID
    } as const
}

//Thunks
export const getUsers = (currentPage: number, pageSize: number): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
}
export const follow = (userId: string): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.follow(userId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
}
export const unfollow = (userId: string): AppThunk => (dispatch: Dispatch<AppActionType>) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.unfollow(userId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
}

export default usersReducer;