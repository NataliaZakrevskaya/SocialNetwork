import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePropsType} from "../../Redux/profile-reducer";
import {MyPostsContainer} from "./MyPosts.ts/Post/MyPostsContainer";
import s from "./Profile.module.css"

type ProfileComponentPropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: ProfileComponentPropsType) => {
    return (
        <div className={s.profilePageBlock}>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;