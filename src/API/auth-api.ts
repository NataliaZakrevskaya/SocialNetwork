import {instance} from "./Api";

export const authAPI = {
    me() {
        return instance.get<AuthApiResponseType<{id: string, email: string, login: string}>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<AuthApiResponseType<{userId: number}>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<AuthApiResponseType<{}>>(`auth/login`,)
    }
}


//TYPES
type AuthApiResponseType <T> = {
    data: T
    resultCode: number
    messages: string[]
}

