import React, {ChangeEvent} from 'react';
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
}


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}: ProfileInfoPropsType) => {



    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.profileInfoBlock}>
            <div className={s.imagesBlock}>
                <img className={s.backgroundImg}
                     src={"https://wallpaperaccess.com/full/144055.png"}
                     alt={"img"}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>

            <div>
                <div className={s.avatarBlock}>
                    <img className={s.avatar}
                         src={profile && profile.photos.large !== null ? profile.photos.large : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU'}
                         alt={"avatar"}/>
                </div>
                <div>
                    <b>Full name: </b> {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job: </b> {profile.lookingForAJob ? "Yes" : "No"}
                </div>
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills: </b> {profile.lookingForAJobDescription}
                </div>
                }
                <div>
                    <b>About me: </b> {profile.aboutMe}
                </div>


                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />

            </div>
        </div>
    )
}

export default ProfileInfo;