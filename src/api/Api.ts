import axios from "axios";
import {UsersType} from "../Redux/users-reducer";
import {ProfileType} from "../Redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a21b9e11-d6d2-42a0-ae1a-624319f97484"
    }
})

type GetUsersResponseType = {
    items: Array<UsersType>
    error: null | string
    totalCount: number
}
type FollowingResponseType = {
    resultCode: number
    messages: Array<string | null>
    data: {}
}


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<FollowingResponseType>(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<FollowingResponseType>(`follow/${userId}`).then(response => response.data)
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`,)
    }
}
export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(newPhoto: File) {
        const formData = new FormData()
        formData.append('image', newPhoto)

        return instance.put(`profile/photo`, formData ,{
            headers: {
                'Content-Type': 'multipart/form-Data'
            }
        })
    },
    saveProfile(ProfileData: ProfileType) {
        return instance.put(`profile/`, ProfileData)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<captchaType>(`security/get-captcha-url`)
            .then(res => res.data)
    }
}
type captchaType = {
    url: string
}