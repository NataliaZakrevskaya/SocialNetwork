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

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
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
                        src={props.profile && props.profile.photos.large !== null ? props.profile.photos.large : "avatarDefault"}
                        alt={"avatar"}/>
                </div>
                {/*<h2>{props.profile.fullName}</h2>
                    <h3>Обо мне: {props.profile.aboutMe}</h3>*/}
                <ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
                {/*<h4>Статус: {props.profile.lookingForAJob === true ? 'в поисках работы' : 'работаю'}</h4>*/}


            </div>
        </div>
    )
}

export default ProfileInfo;