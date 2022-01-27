import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a21b9e11-d6d2-42a0-ae1a-624319f97484"
    }
})
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    }
}