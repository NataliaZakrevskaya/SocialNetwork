import React from 'react';
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../Common/Preloader/Preloader";


const ProfileInfo = (props: any) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            {/* <div>
                <img className={s.firstImg}
                     src={"https://wallpaperaccess.com/full/144055.png"}
                     alt={"img"}/>
            </div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <h2>{props.profile.fullName}</h2>
                <h3>Обо мне: {props.profile.aboutMe}</h3>
                <PofileStatus status="Hello, my friends"/>
                {/*<h4>Статус: {props.profile.lookingForAJob === true ? 'в поисках работы' : 'работаю'}</h4>*/}

            </div>

        </div>
    )
}

export default ProfileInfo;