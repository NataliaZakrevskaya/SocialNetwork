import React, {ChangeEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ContactsType, ProfileType} from "../../../Redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import ProfileDataForm from './ProfileFormData/ProfileDataForm';
import {Contact} from "./ProfileFormData/Contact/Contact";

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

    const onSubmit = (formData: any) => {
        saveProfile(formData)
        setEditMode(false)
    }

    // @ts-ignore
    return (
        <div className={s.profileInfoBlock}>
            <div className={s.imagesBlock}>
                <img className={s.backgroundImg}
                     src={"https://wallpaperaccess.com/full/144055.png"}
                     alt={"img"}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>

            <div>
                <div className={s.avatarBlock}>
                    <img className={s.avatar}
                         src={profile && profile.photos.large !== null ? profile.photos.large : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU'}
                         alt={"avatar"}/>
                </div>


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

                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />

            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            {isOwner
                && <div>
                    <button onClick={goToEditMode}>edit</button>
                </div>}

            <div>
                <b>Full name: </b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b> {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills: </b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me: </b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts)
                .map(key => {
                    return <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>

        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void

}


export default ProfileInfo;