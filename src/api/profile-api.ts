import {ProfileType} from "../Redux/profile-reducer";
import {instance} from "./Api";

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<GetProfileResponseType>(`profile/` + userId)
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
        return instance.put(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-Data'}
        })
    },
    saveProfile(ProfileData: ProfileType) {
        return instance.put(`profile/`, ProfileData)},
}

type GetProfileResponseType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}
