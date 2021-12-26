import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts.ts/Post/MyPostsContainer";

const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;