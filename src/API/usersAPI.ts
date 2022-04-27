import {instance} from "./apiConfig";
import {FollowingResponseType, GetUsersResponseType} from "./types";
import {Nullable} from "../types";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: Nullable<boolean> = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<FollowingResponseType>(`follow/${userId}`)
          .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
          .then(response => response.data) as Promise<FollowingResponseType>
    }
}
