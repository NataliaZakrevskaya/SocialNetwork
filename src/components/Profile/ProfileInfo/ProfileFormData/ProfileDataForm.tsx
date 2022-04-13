import {Preloader} from "../../../Common/Preloader/Preloader";
import {ProfileType} from "../../../../Redux/profile-reducer";
import React from "react";
import {createField, Input, Textarea} from "../../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./../ProfileInfo.module.css";
import style from "./../../../Common/FormsControls/FormsControls.module.css"
import commonStyle from "./../../MyPosts.ts/MyPosts.module.css"

// TYPES
type ProfileDataFormPropsType = {
    profile: ProfileType
}


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({handleSubmit, profile, error}) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <form onSubmit={handleSubmit} className={s.editInfoModule}>

            {
                error &&
                <div className={style.formSummaryError}>{error}</div>
            }
            <div>
                <b>Full name </b> {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job </b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills </b>
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <h3>Contacts </h3> {Object.keys(profile.contacts)
                .map(key => {
                    return (
                        <div key={key} className={s.contact}>
                            <b>{key}</b>
                            {createField(key, "contacts." + key, [], Input)}
                        </div>

                    )

                })}
            </div>
            <div>
                <button>save</button>
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)


export default ProfileDataReduxForm;