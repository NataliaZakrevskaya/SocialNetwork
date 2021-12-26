import React from 'react';
import s from "./ProfileInfo.module.css"


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={s.firstImg}
                    src={"https://wallpaperaccess.com/full/144055.png"}
                    alt={"img"}/>
            </div>
            <div className={s.descriptionBlock}>
                ava + discription
            </div>

        </div>
    )
}

export default ProfileInfo;