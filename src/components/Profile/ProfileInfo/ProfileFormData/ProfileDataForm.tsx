import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Preloader} from "../../../Common/Preloader/Preloader";
import {ProfileType} from "../../../../Redux/profile-reducer";
import {createField, Input, Textarea} from "../../../Common/FormsControls/FormsControls";
import s from "./ProfileDataForm.module.css";
import style from "./../../../Common/FormsControls/FormsControls.module.css"


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({
                                                                                                                            handleSubmit,
                                                                                                                            profile,
                                                                                                                            error
                                                                                                                        }) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <form onSubmit={handleSubmit} className={s.editInfo}>

            {
                error &&
                <div className={style.formSummaryError}>{error}</div>
            }

            <b>Full name </b> {createField("Full name", "fullName", [], Input)}
            <b>My professional skills </b>
            {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            <b>Looking for a job </b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}

            <div>
                <h3>Contacts </h3> {Object.keys(profile.contacts)
                .map(key => {
                    return (
                        <div key={key}>
                            <b className={s.contactName}>{key}</b>
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


// TYPES
type ProfileDataFormPropsType = {
    profile: ProfileType
}