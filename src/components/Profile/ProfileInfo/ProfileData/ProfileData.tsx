import React, {useState} from "react";
import {Preloader} from "../../../Common/Preloader/Preloader";
import s from "../ProfileInfo.module.css";
import style from "../../MyPosts.ts/MyPosts.module.css";
import {ContactsType, ProfileType} from "../../../../Redux/profile-reducer";
import {Contact} from "../ProfileFormData/Contact/Contact";

export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {

    const [showContacts, setShowContacts] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profileInfo}>

            <hr className={style.hr}/>
            {isOwner
                && <div>
                    <button className={s.editButton} onClick={goToEditMode}>✎</button>
                </div>}
            <div className={s.majorInfo}>
                <div className={s.fullName}>
                    {profile.fullName}
                </div>
                {profile.lookingForAJob &&
                    <div className={s.skills}>
                        ({profile.lookingForAJobDescription})
                    </div>
                }
            </div>
            <button
                className={s.showContactsButton}
                onClick={() => {
                    setShowContacts(!showContacts)
                }}
            >{showContacts ? 'Hide contacts' : 'Show contacts'}
            </button>

            {showContacts &&
                <div className={s.contacts}>
                    <div className={s.contactLinks}>
                        {Object.keys(profile.contacts)
                            .map(key => {
                                if (profile.contacts[key as keyof ContactsType]) {
                                    return <Contact
                                        key={key}
                                        contactTitle={key}
                                        contactValue={profile.contacts[key as keyof ContactsType]}/>
                                }
                            })}
                    </div>
                </div>}
        </div>
    )
}

// TYPES
type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}