import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../Redux/Reducers/profile-reducer";
import s from "./Profile.module.scss"
import MyPosts from "./MyPosts.ts/MyPosts";

type ProfileComponentPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
    saveProfile: (profileData: ProfileType) => Promise<any>
}

const Profile = (props: ProfileComponentPropsType) => {



    return (
        <div className={s.profilePage}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            {props.isOwner && <MyPosts/>}
        </div>
    )
}

export default Profile;