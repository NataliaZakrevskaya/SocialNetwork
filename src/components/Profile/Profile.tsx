import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts.ts/Post/MyPostsContainer";

type ProfilePropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: any) => {
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