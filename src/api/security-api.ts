import {instance} from "./Api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<captchaType>(`security/get-captcha-url`)
            .then(res => res.data)
    }
}

//TYPES
type captchaType = {
    url: string
}