import { updateObjectInArray } from '../../../Utils/object-helpers';
import { UserReducerEnum } from './enums';
import { FilterType, InitialStateType, UsersReducerActionType, UsersType } from './types';

export const initialState = {
  users: [] as UsersType[],
  pageSize: 10,
  totalUsersCount: 0,
  page: 1,
  isFetching: false,
  followingInProgress: [] as number[],
  filter: {
    term: '',
    friend: null as null | boolean,
  },
};

const usersReducer = ( state = initialState, action: UsersReducerActionType ): InitialStateType => {
  switch ( action.type ) {
    case UserReducerEnum.FOLLOW:
      return {
        ...state, users: updateObjectInArray( state.users, action.userID, 'id', { followed: true } ),
      };
    case UserReducerEnum.UNFOLLOW:
      return {
        ...state, users: updateObjectInArray( state.users, action.userID, 'id', { followed: false } ),
      };
    case UserReducerEnum.SET_USERS:
      return { ...state, users: [ ...action.users ] };
    case UserReducerEnum.SET_FILTER:
      return { ...state, filter: action.payload.filter };
    case UserReducerEnum.SET_CURRENT_PAGE:
      return { ...state, page: action.currentPage };
    case UserReducerEnum.SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };
    case UserReducerEnum.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case UserReducerEnum.TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [ ...state.followingInProgress, action.userID ]
          : state.followingInProgress.filter( id => id !== action.userID ),
      };
    default:
      return state;

  }
};

export const usersReducerActions = {
  followSuccess: ( userID: number ) => {
    return { type: UserReducerEnum.FOLLOW, userID } as const;
  },
  unfollowSuccess: ( userID: number ) => {
    return { type: UserReducerEnum.UNFOLLOW, userID } as const;
  },
  setUsers: ( users: Array<UsersType> ) => {
    return {
      type: UserReducerEnum.SET_USERS, users,
    } as const;
  },
  setFilter: ( filter: FilterType ) => {
    return {
      type: UserReducerEnum.SET_FILTER, payload: { filter },
    } as const;
  },
  setCurrentPage: ( currentPage: number ) => {
    return { type: UserReducerEnum.SET_CURRENT_PAGE, currentPage } as const;
  },
  setTotalUsersCount: ( totalUsersCount: number ) => {
    return { type: UserReducerEnum.SET_TOTAL_USERS_COUNT, count: totalUsersCount } as const;
  },
  toggleIsFetching: ( isFetching: boolean ) => {
    return { type: UserReducerEnum.TOGGLE_IS_FETCHING, isFetching } as const;
  },
  toggleFollowingProgress: ( isFetching: boolean, userID: number ) => {
    return { type: UserReducerEnum.TOGGLE_FOLLOWING_PROGRESS, isFetching, userID } as const;
  },
};

export default usersReducer;
