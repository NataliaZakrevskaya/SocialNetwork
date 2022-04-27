import React, {useState} from "react";
import {Preloader} from "../../../../Common/Components/Preloader/Preloader";
import {ContactsType, ProfileType} from "../../../../../Redux/Reducers/profile-reducer";
import {Contact} from "../ProfileFormData/Contact/Contact";
import commonStyle from "../../Profile.module.scss"
import style from "../ProfileInfo.module.scss";
import {ProfileDataPropsType} from "../../../types";

export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {

    const [showContacts, setShowContacts] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    let contacts = []

    return (
        <div className={style.profileInfoData}>
            <hr className={commonStyle.hr}/>
            {isOwner
                &&
                (<div className={style.editButtonContainer}>
                    <button className={style.editButton} onClick={goToEditMode}>
                        ✎
                    </button>
                </div>)
            }
            <div className={style.majorInfo}>
                <div className={style.fullName}>
                    {profile.fullName}
                </div>
                {profile.lookingForAJob &&
                    <div className={style.skills}>
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
                <div className={style.contacts}>
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
