import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a21b9e11-d6d2-42a0-ae1a-624319f97484"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}


