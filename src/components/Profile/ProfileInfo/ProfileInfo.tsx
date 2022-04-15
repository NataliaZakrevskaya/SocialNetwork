import React, {ChangeEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ContactsType, ProfileType} from "../../../Redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import ProfileDataForm from './ProfileFormData/ProfileDataForm';
import {Contact} from "./ProfileFormData/Contact/Contact";
import style from "./../MyPosts.ts/MyPosts.module.css"
import profileImage from "./../../../Images/flat-face-icon-23.png"

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
    saveProfile: (profileData: ProfileType) => void
}


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData: ProfileType): Promise<any> => {
        await saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div className={s.profileInfoBlock}>
            <div className={s.imagesBlock}>
                <img className={s.backgroundImg}
                     src={"https://images.pexels.com/photos/989941/pexels-photo-989941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
                     alt={"img"}/>
                <div className={s.avatar}>
                    <img
                        src={profile && profile.photos.large !== null ? profile.photos.large : profileImage}
                        alt={"avatar"}/>
                    {isOwner && <div className={s.avatarEdit}>
                        <input type={"file"} onChange={onMainPhotoSelected} id="imageUpload"
                               accept=".png, .jpg, .jpeg"/>
                        <label htmlFor="imageUpload"></label>
                    </div>}
                </div>
            </div>
            <div className={s.profileInfo}>

                <ProfileStatusWithHooks
                    status={status}
                    isOwner={isOwner}
                    updateStatus={updateStatus}
                />
                {profile.lookingForAJob ? <span className={s.lookingJob}>Looking for a job!</span> : ''}
                {editMode
                    ? <ProfileDataForm
                        initialValues={profile}
                        onSubmit={onSubmit}
                        profile={profile}
                    />
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => {
                            setEditMode(true)
                        }}
                    />
                }
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {

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
                onClick={() => {setShowContacts(!showContacts)}}
            >{showContacts ? 'Hide contacts' : 'Show contacts'}
            </button>
            {showContacts &&
                <div className={s.contacts}>
                    <div className={s.contactLinks}>
                    {Object.keys(profile.contacts)
                    .map(key => {
                        if(profile.contacts[key as keyof ContactsType]){
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

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void

}


export default ProfileInfo;