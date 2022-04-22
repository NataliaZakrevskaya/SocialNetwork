import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Preloader} from "../../../Common/components/Preloader/Preloader";
import {ProfileType} from "../../../../Redux/Reducers/profile-reducer";
import {createField, Input, Textarea} from "../../../Common/components/FormsControls/FormsControls";
import commonStyle from "../../../Common/components/FormsControls/FormsControls.module.css"
import s from "./ProfileDataForm.module.scss";


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({handleSubmit, profile, error}) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <form onSubmit={handleSubmit} className={s.editInfo}>

            {
                error &&
                <div className={commonStyle.formSummaryError}>{error}</div>
            }

            <b>Full name </b> {createField("Full name", "fullName", [], Input)}
            <b>My professional skills </b>
            {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            <b>Looking for a job </b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            <>
                <h3>Contacts </h3> {Object.keys(profile.contacts)
                .map(key => {
                    return (
                        <div key={key}>
                            <b>{key}</b>
                            {createField(key, "contacts." + key, [], Input)}
                        </div>

                    )

                })}
            </>
                <button>save</button>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)


export default ProfileDataReduxForm;


// TYPES
type ProfileDataFormPropsType = {
    profile: ProfileType
}