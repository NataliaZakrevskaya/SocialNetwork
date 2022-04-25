import {PhotosType, ProfileType} from "../Redux/Reducers/profile-reducer";
import {instance} from "./api";

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<GetProfileResponseType>(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<ProfileAPIResponseType<{}>>(`profile/status`, {status})
    },
    savePhoto(newPhoto: File) {
        const formData = new FormData()
        formData.append('image', newPhoto)
        return instance.put<ProfileAPIResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-Data'}
        })
    },
    saveProfile(ProfileData: ProfileType) {
        return instance.put<ProfileAPIResponseType<{}>>(`profile/`, ProfileData)},
}


//TYPES
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
type ProfileAPIResponseType <T> = {
    resultCode: number
    messages: string[],
    data: T
}
type SavePhotoResponseType = {
    photos: PhotosType
}

