import React, {useState} from "react";
import {Preloader} from "../../../Common/components/Preloader/Preloader";
import {ContactsType, ProfileType} from "../../../../Redux/Reducers/profile-reducer";
import {Contact} from "../ProfileFormData/Contact/Contact";
import commonStyle from "./../../Profile.module.scss"
import s from "../ProfileInfo.module.scss";

export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {

    const [showContacts, setShowContacts] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    let contacts = []

    return (
        <div className={s.profileInfoData}>

            <hr className={commonStyle.hr}/>
            {isOwner
                &&
                (<div className={s.editButtonContainer}>
                    <button className={s.editButton} onClick={goToEditMode}>
                        ✎
                    </button>
                </div>)
            }
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
                onClick={() => {
                    setShowContacts(!showContacts)
                }}>
                {showContacts ? 'Hide contacts' : 'Show contacts'}
            </button>

            {showContacts &&
                <div className={s.contacts}>
                    {contacts = Object.keys(profile.contacts)
                        .filter(key => profile.contacts[key as keyof ContactsType])
                        .map(key => {
                            return <Contact
                                key={key}
                                contactTitle={key}
                                contactValue={profile.contacts[key as keyof ContactsType]}/>
                        })}
                    {contacts.length < 1 && <span>This User didn't specify any info  😩</span>}
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