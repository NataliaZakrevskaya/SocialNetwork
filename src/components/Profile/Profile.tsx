import React, {ComponentType, useEffect} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {getProfile, getStatus, ProfileType, savePhoto, saveProfile, updateStatus} from "../../Redux/profile-reducer";
import {MyPostsContainer} from "./MyPosts.ts/Post/MyPostsContainer";
import s from "./Profile.module.css"
import {connect, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {withRouter2} from "../../HOC/withRouter";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";

type ProfilePagePropsType = {
    userId: string
}

const ProfilePage: React.FC<ProfilePagePropsType> = (props) => {

    const profile = useSelector<AppStateType, ProfileType>(state => state.profilePage.profile)
    const status = useSelector<AppStateType, string>(state => state.profilePage.status)
    const authorizedUserId = useSelector<AppStateType, string>(state => state.auth.data.id)
    const isOwner = !props.userId

    const dispatch = useDispatch()



    const updateProfile = () => {
        let userId: string = props.userId;
        if (!userId) {
            userId = authorizedUserId;
        }
        dispatch(getProfile(userId));
        dispatch(getStatus(userId));
    }
    const updateStatus = (status: string) => {
        dispatch(updateStatus(status));
    }
    const savePhoto = (newPhoto: File) => {
        dispatch(savePhoto(newPhoto));
    }
    const saveProfile = (profileData: ProfileType) => {
        dispatch(saveProfile(profileData));
    }

    useEffect(() => {
        dispatch(updateProfile())
    }, [props.userId])


    return (
        <div className={s.profilePageBlock}>
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                savePhoto={savePhoto}
                saveProfile={saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}

let mapStateToProps = () => {}

export default compose<ComponentType>
(connect
    (mapStateToProps, {}),
    withRouter2,
    WithAuthRedirect
)
(ProfilePage);