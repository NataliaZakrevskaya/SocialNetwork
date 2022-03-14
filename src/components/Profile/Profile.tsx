import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../Redux/profile-reducer";
import {MyPostsContainer} from "./MyPosts.ts/Post/MyPostsContainer";
import s from "./Profile.module.css"

type ProfileComponentPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
}

const Profile = (props: ProfileComponentPropsType) => {
    return (
        <div className={s.profilePageBlock}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;