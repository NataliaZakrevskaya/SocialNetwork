import React from 'react';
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfilePropsType} from "../../../Redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
}


const ProfileInfo = ({profile, status, updateStatus}: ProfileInfoPropsType) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profileInfoBlock}>
            <div className={s.imagesBlock}>
                <img className={s.backgroundImg}
                     src={"https://wallpaperaccess.com/full/144055.png"}
                     alt={"img"}/>
            </div>
            <div>
                <div className={s.avatarBlock}>
                    <img className={s.avatar}
                         src={profile && profile.photos.large !== null ? profile.photos.large : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU'}
                         alt={"avatar"}/>
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