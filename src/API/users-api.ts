import {instance} from "./Api";
import {UsersType} from "../Redux/Reducers/users-reducer";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<FollowingResponseType>(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<FollowingResponseType>
    }
}

// TYPES
type GetUsersResponseType = {
    items: Array<UsersType>
    error: null | string
    totalCount: number
}
export type FollowingResponseType = {
    resultCode: number
    messages: Array<string | null>
    data: {}
}