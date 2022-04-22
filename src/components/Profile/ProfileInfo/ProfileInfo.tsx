import React, {ChangeEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../Redux/Reducers/profile-reducer";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import ProfileDataForm from './ProfileFormData/ProfileDataForm';
import profileImage from "./../../../Images/flat-face-icon-23.png"
import {ProfileData} from "./ProfileData/ProfileData";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
    saveProfile: (profileData: ProfileType) => void
}


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)



    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData: ProfileType): Promise<any> => {
        await saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div className={s.profileInfoBlock}>
            <div className={s.imagesBlock}>
                <img className={s.backgroundImg}
                     src={"https://images.pexels.com/photos/989941/pexels-photo-989941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
                     alt={"img"}/>
                <div className={s.avatar}>
                    <img
                        src={profile && profile.photos.large !== null ? profile.photos.large : profileImage}
                        alt={"avatar"}/>
                    {isOwner && <div className={s.avatarEdit}>
                        <input type={"file"} onChange={onMainPhotoSelected} id="imageUpload"
                               accept=".png, .jpg, .jpeg"/>
                        <label htmlFor="imageUpload"></label>
                    </div>}
                </div>
            </div>
            <div className={s.profileInfo}>

                <ProfileStatus
                    status={status}
                    isOwner={isOwner}
                    updateStatus={updateStatus}
                />
                {profile?.lookingForAJob ? <span className={s.lookingJob}>Looking for a job!</span> : ''}
                {editMode
                    ? <ProfileDataForm
                        initialValues={profile}
                        onSubmit={onSubmit}
                        profile={profile}
                    />
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => {
                            setEditMode(true)
                        }}
                    />
                }
            </div>
        </div>
    )
}


export default ProfileInfo;