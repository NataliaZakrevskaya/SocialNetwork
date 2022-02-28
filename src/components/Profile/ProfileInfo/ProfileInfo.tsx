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
        <div>
            <div>
                <img className={s.firstImg}
                     src={"https://wallpaperaccess.com/full/144055.png"}
                     alt={"img"}/>
            </div>
            <div>
                <div className={s.descriptionBlock}>
                    <img
                        src={profile && profile.photos.large !== null ? profile.photos.large : "avatarDefault"}
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