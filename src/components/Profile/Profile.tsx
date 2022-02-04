import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts.ts/Post/MyPostsContainer";
import {ProfilePropsType} from "../../Redux/profile-reducer";

type ProfileComponentPropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: ProfileComponentPropsType) => {
    return (
        <div>
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